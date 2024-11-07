<script lang="ts">
  import { page } from '$app/stores';
  import BarMenu from './icons/menu.svelte';
  import Calendar from './icons/calendar.svelte';
  import Comment from './icons/comment.svelte';
  import * as Menubar from '$lib/components/ui/menubar';
  import DarkTheme from './dark-theme.svelte';
  import SearchBar from './search-bar.svelte';
  import { cn } from '$lib/utils';
  import type { User } from '$lib/types';
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';

  export let user: User | null;
</script>

<div class="fixed top-0 z-50 w-dvw">
  <div class="transform-gpu backdrop-blur-sm transition-transform duration-300">
    <header class="sticky top-0 z-50 w-full bg-background/80">
      <div class="container flex h-14 items-center px-2 pr-4">
        <div class="hidden md:flex">
          <nav class="mt-2 flex h-full items-center gap-6">
            <a
              href="/"
              class="inline-flex items-center gap-1.5 text-lg font-semibold transition-colors duration-200 hover:text-cyan-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                <g fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5zm4 3a1 1 0 0 0-2 0v1H4a1 1 0 0 0 0 2h6.432a8.323 8.323 0 0 1-1.117 3.127L7.753 8.34a1 1 0 1 0-1.506 1.32l1.837 2.098C6.7 13.231 5.1 14 4 14a1 1 0 1 0 0 2c1.806 0 3.83-1.111 5.406-2.732l.341.39a1 1 0 0 0 1.506-1.316l-.567-.648c.908-1.341 1.573-2.941 1.76-4.694H14a1 1 0 1 0 0-2H9V4zm7.894 5.553a1 1 0 0 0-1.788 0l-3 6a.998.998 0 0 0-.055.13l-1 3a1 1 0 0 0 1.898.633L13.72 17h4.558l.772 2.316a1 1 0 0 0 1.898-.632l-1-3a.998.998 0 0 0-.055-.131l-3-6zM16 12.236L17.382 15h-2.764L16 12.236z"
                    fill="currentColor" />
                </g>
              </svg>
              FOOLS
            </a>
            {#each [{ name: 'novels' }, { name: 'library' }, { name: 'store' }] as route}
              <a
                href={`/${route.name}`}
                class={cn(
                  'anim-text text-base font-medium capitalize transition-colors duration-200 hover:text-foreground/80',
                  $page.url.pathname.includes(route.name)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}>
                {route.name}
              </a>
            {/each}
          </nav>
        </div>
        <div class="mt-2 flex flex-1 items-center justify-end">
          <div class="search-input flex gap-1">
            <SearchBar />
            <a
              href="/notifications/chapters"
              class="inline-flex h-auto w-8 items-center justify-center whitespace-nowrap rounded-md px-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <Comment size="20" />
            </a>
            <a
              href="/updates"
              class="inline-flex h-auto w-8 items-center justify-center whitespace-nowrap rounded-md px-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <Calendar size="20" />
            </a>

            <Menubar.Root class="h-auto space-x-0 border-none bg-transparent p-0">
              <Menubar.Menu>
                <Menubar.Trigger
                  class="inline-flex h-8 w-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-0 py-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:text-current focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <BarMenu size="20" />
                </Menubar.Trigger>
                <Menubar.Content align="end" class="border-border/20">
                  <Menubar.Item asChild>
                    <div class="flex items-center gap-2 text-sm">
                      <DarkTheme />
                    </div>
                  </Menubar.Item>
                  <Menubar.Item class="cursor-pointer">
                    {#if user !== null}
                      <form
                        action="/auth/logout"
                        method="POST"
                        class="w-full"
                        use:enhance={() => {
                          return async ({ result }) => {
                            user = null;
                            if (result) {
                              toast.info('You have been logged out successfully. See you soon!');
                            }
                            goto('/auth/login');
                          };
                        }}>
                        <button class="inline-flex w-full">Logout</button>
                      </form>
                    {:else}
                      <a href="/auth/login" class="w-full">Login</a>
                    {/if}
                  </Menubar.Item>
                </Menubar.Content>
              </Menubar.Menu>
            </Menubar.Root>
          </div>
        </div>
      </div>
    </header>
  </div>
</div>

<style>
  @media (min-width: 768px) {
    .anim-text {
      display: block;
    }
  }

  .anim-text:hover:after {
    transform: scaleX(1);
  }

  .anim-text:after {
    display: block;
    content: '';
    width: 100%;
    opacity: 0.6;
    border-bottom: 3px solid;
    transform: scaleX(0);
    transition: transform 0.25s ease-in-out;
    transform-origin: left;
  }
</style>
