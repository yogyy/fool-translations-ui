// See https://kit.svelte.dev/docs/types#app

import type { Session, User } from '$lib/types';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
      session: Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          theme?: 'light' | 'dark';
          size?: 'normal' | 'flexible' | 'compact';
        }
      ) => void;
    };
  }
}

export {};
