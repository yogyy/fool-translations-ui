import { discord } from '$lib/oauth';

import { error, type RequestEvent } from '@sveltejs/kit';
import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import { BE_URL } from '$env/static/private';
import { parseString } from 'set-cookie-parser';
import { setSessionTokenCookie } from '$lib/session';

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

    const res = await fetch(`${BE_URL}/oauth/discord`, {
      headers: { Cookie: `access_token=${tokens.accessToken()}` }
    });
    const data: { success: boolean } = await res.json();
    if (!data.success) throw error(500, 'Authentication failed');

    const cookie = parseString(res.headers.get('set-cookie')!);
    setSessionTokenCookie(event, cookie.value, cookie.expires as Date);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  } catch (e) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      throw error(500, e.message);
    }
    if (e instanceof ArcticFetchError) {
      const cause = e.cause;
      throw error(500, cause as string);
    }

    throw error(500, 'Authentication failed');
  }
}
