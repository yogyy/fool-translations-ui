// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: import('$lib/server/auth').SessionValidationResult['user'];
      session: import('$lib/server/auth').SessionValidationResult['session'];
    }
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }
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
