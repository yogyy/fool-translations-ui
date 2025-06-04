import { generateCodeVerifier, generateState } from 'arctic';
import { discord } from '$lib/oauth';

import type { TurnstileResponse } from '$lib/types';
import { json } from '@sveltejs/kit';
import { PUBLIC_APP_ENV } from '$env/static/public';
import { TURNSLITE_SECRET_KEY } from '$env/static/private';

export async function POST({ cookies, request }): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = discord.createAuthorizationURL(state, codeVerifier, ['email', 'identify']);

  const formData = await request.formData();
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret:
        PUBLIC_APP_ENV === 'production'
          ? TURNSLITE_SECRET_KEY
          : '1x0000000000000000000000000000000AA',
      response: formData.get('token') as string
    })
  });

  const turnstile: TurnstileResponse = await verify.json();
  if (!turnstile.success) {
    return json(turnstile, { status: 400 });
  }

  cookies.set('discord_oauth_state', state, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax'
  });
  cookies.set('discord_code_verifier', codeVerifier, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax'
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString()
    }
  });
}
