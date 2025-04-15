<script lang="ts">
  import { page } from '$app/stores';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import DarkTheme from './dark-theme.svelte';
  import SearchBar from './search-bar.svelte';
  import { cn } from '$lib/utils';
  import type { User } from '$lib/types';
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import NotificationSquare from './icons/notification-square.svelte';
  import UserCircle from './icons/user-circle.svelte';
  import { fly, slide } from 'svelte/transition';
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Logo from './icons/logo.svelte';

  export let user: User | null;
  let userMenu = false;
  let lastScrollY = 0;
  let showNav = true;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    showNav = currentScrollY < lastScrollY;
    lastScrollY = currentScrollY;

    userMenu = false;
  }

  onMount(() => {
    if (browser) {
      lastScrollY = window.scrollY;
      window.addEventListener('scroll', handleScroll);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<div
  class={cn(
    'fixed top-0 z-50 w-dvw',
    $page.url.pathname.startsWith('/novels/') && 'hidden md:block'
  )}>
  {#if showNav}
    <div
      class="transform-gpu transition-transform duration-300 md:backdrop-blur-sm"
      in:fly={{ y: -50, duration: 300 }}
      out:fly={{ y: -50, duration: 300 }}>
      <header
        class={cn(
          'top-0 z-50 w-full bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-transparent transition duration-500 md:bg-background md:from-transparent',
          userMenu ? 'border-b border-opacity-20 ' : '',
          showNav && lastScrollY > 100 ? 'border-b border-opacity-20' : ''
        )}>
        <div class="container flex h-14 max-w-pgsize items-center justify-between px-6">
          <div class="mt-2 flex items-center justify-center gap-4">
            <a
              href="/"
              class="inline-flex items-center gap-1.5 text-lg font-semibold transition-colors duration-200 hover:text-cyan-300">
              <Logo style="width: 30px; height: 30px;" />
              <p class="hidden md:block">FOOL</p>
            </a>
            <nav class="hidden h-full items-center gap-6 md:flex">
              {#each ['novels', 'library', 'store'] as route}
                <a
                  href={`/${route}`}
                  class={cn(
                    'anim-text text-base font-medium capitalize transition-colors duration-200 hover:text-foreground/80',
                    $page.url.pathname.includes(route) ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                  {route}
                </a>
              {/each}
            </nav>
          </div>
          <div class="mt-2 flex flex-1 items-center justify-end">
            <div class="flex gap-1">
              <SearchBar />
              <a
                href="/notifications/chapters"
                class="inline-flex h-auto w-8 items-center justify-center whitespace-nowrap rounded-md px-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <NotificationSquare class="h-5 w-5" />
              </a>
              <DropdownMenu.Root bind:open={userMenu}>
                <DropdownMenu.Trigger
                  class="inline-flex h-8 w-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-0 py-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:text-current focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  {#if user === null}
                    <UserCircle class="h-6 w-6" />
                  {:else}
                    <img
                      src={user?.avatar ?? '/default-avatar.png'}
                      alt={`${user.name}'s avatar`}
                      class="h-6 w-6 rounded-full" />
                  {/if}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  transition={slide}
                  align="end"
                  side="bottom"
                  sideOffset={7.5}
                  class="w-full max-w-xs rounded-tl-none rounded-tr-none border-t-0 bg-background transition-opacity duration-300">
                  <DropdownMenu.Item class="p-0">
                    <DarkTheme />
                  </DropdownMenu.Item>
                  {#if user?.type === 'admin'}
                    <DropdownMenu.Item class="p-0">
                      <a href="/admin" class="w-full px-2 py-1.5">Admin</a>
                    </DropdownMenu.Item>
                  {/if}
                  <DropdownMenu.Item class="p-0">
                    {#if user !== null}
                      <form
                        action="/logout"
                        method="POST"
                        class="w-full px-2 py-1.5"
                        use:enhance={() => {
                          return async ({ result }) => {
                            user = null;
                            if (result) {
                              toast.info('Logout successfully. See you soon!');
                            }
                            goto('/login');
                          };
                        }}>
                        <button class="inline-flex w-full">Logout</button>
                      </form>
                    {:else}
                      <a href="/login" class="w-full px-2 py-1.5">Login</a>
                    {/if}
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      </header>
    </div>
  {/if}
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
