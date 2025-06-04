import { BE_URL } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import type { Session, User } from './types';
import { PUBLIC_APP_ENV } from '$env/static/public';

type ValidateResponse = {
  user: User | null;
  session: Session | null;
};

export async function validateSessionToken({
  fetch,
  cookies
}: RequestEvent): Promise<ValidateResponse> {
  const res = await fetch(`${BE_URL}/auth/validate`, {
    headers: { Cookie: `session=${cookies.get('session')}` }
  });

  const data = await res.json();

  return data;
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
  event.cookies.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(expiresAt),
    secure: PUBLIC_APP_ENV === 'production',
    path: '/'
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: PUBLIC_APP_ENV === 'production',
    maxAge: 0,
    path: '/'
  });
}
