import { discord } from '$lib/oauth';
import { error, type RequestEvent } from '@sveltejs/kit';
import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import type { DiscordOAuthResponse } from '$lib/types';
import { createUser, getUserFromProviderId } from '$lib/server/service/auth.service';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import { generateRandId } from '$lib/server/utils';

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const storedState = event.cookies.get('discord_oauth_state') ?? null;
  const codeVerifier = event.cookies.get('discord_code_verifier') ?? null;

  if (code === null || state === null || storedState === null || codeVerifier === null) {
    return new Response(null, { status: 400 });
  }
  if (state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    let tokens = await discord.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${tokens.accessToken()}` }
    });

    const user: DiscordOAuthResponse = await response.json();

    const userExist = await getUserFromProviderId(event.platform!.env, user.id);
    if (userExist) {
      const token = generateSessionToken();
      const session = await createSession(event.platform!.env.DB, token, userExist?.id);
      setSessionTokenCookie(event, token, session.expiresAt);

      return new Response(null, { status: 302, headers: { Location: '/' } });
    }

    const userId = generateRandId('usr');
    await createUser({
      env: event.platform!.env,
      email: user.email.toLowerCase(),
      id: userId,
      name: user.global_name || user.username,
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      provider: 'discord',
      providerId: user.id
    });

    const token = generateSessionToken();
    const session = await createSession(event.platform!.env.DB, token, userId);
    setSessionTokenCookie(event, token, session.expiresAt);

    return new Response(null, { status: 302, headers: { Location: '/' } });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return error(500, e.message);
    }
    if (e instanceof ArcticFetchError) {
      const cause = e.cause;
      return error(500, cause as string);
    }
    console.log(e);
    return error(500, 'Authentication failed');
  }
}
