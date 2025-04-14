import { APP_ENV, BE_URL } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import type { Session, User } from './types';

type ValidateResponse = {
  user: User | null;
  session: Session | null;
};

export async function validateSessionToken(event: RequestEvent): Promise<ValidateResponse> {
  const res = await event.fetch(`${BE_URL}/auth/validate`);
  const data = await res.json();

  return data;
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
  event.cookies.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(expiresAt),
    secure: APP_ENV !== 'development',
    path: '/'
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: APP_ENV !== 'development',
    maxAge: 0,
    path: '/'
  });
}
