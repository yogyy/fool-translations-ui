import { google } from '$lib/oauth';
import { error, type RequestEvent } from '@sveltejs/kit';
import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import type { GoogleOAuthResponse } from '$lib/types';
import { generateRandId } from '$lib/server/utils';
import { createUser, getUserFromProviderId } from '$lib/server/service/auth.service';

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const storedState = event.cookies.get('google_oauth_state') ?? null;
  const codeVerifier = event.cookies.get('google_code_verifier') ?? null;

  if (code === null || state === null || storedState === null || codeVerifier === null) {
    return new Response(null, { status: 400 });
  }
  if (state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    let tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${tokens.accessToken()}` }
    });

    const user: GoogleOAuthResponse = await response.json();

    const userExist = await getUserFromProviderId(event.platform!.env, user.sub);
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
      name: user.name,
      avatar: user.picture,
      provider: 'google',
      providerId: user.sub
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
