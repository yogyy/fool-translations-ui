<script lang="ts">
  import { page } from '$app/state';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import DarkTheme from './dark-theme.svelte';
  import SearchBar from './search-bar.svelte';
  import { cn } from '$lib/utils';
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import NotificationSquare from './icons/notification-square.svelte';
  import UserCircle from './icons/user-circle.svelte';
  import { fly, slide } from 'svelte/transition';
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Logo from './icons/logo.svelte';
  import { type User } from '$lib/server/db/schema/user.schema';

  interface Props {
    user: Omit<User, 'provider' | 'password'> | null;
  }
  let { user }: Props = $props();

  let userMenu = $state(false);
  let lastScrollY = $state(0);
  let showNav = $state(true);

  function handleScroll() {
    const currentScrollY = window.scrollY;
    showNav = currentScrollY < lastScrollY;
    lastScrollY = currentScrollY;
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
    'fixed top-0 z-50 w-svw',
    page.url.pathname.startsWith('/novels/') && 'hidden md:block'
  )}>
  {#if showNav}
    <div
      class="transform-gpu backdrop-blur-xs transition-transform duration-300"
      in:fly={{ y: -50, duration: 300 }}
      out:fly={{ y: -50, duration: 300 }}>
      <header
        class={cn(
          'md:bg-background from-background/80 via-background/50 top-0 z-50 w-full bg-gradient-to-b to-transparent transition duration-300 md:from-transparent',
          userMenu ? 'border-b' : '',
          showNav && lastScrollY > 100 ? 'md:border-b' : ''
        )}>
        <div class="max-w-pgsize container flex h-14 items-center justify-between px-6">
          <div class="mt-2 flex items-center justify-center gap-4">
            <a
              href="/"
              aria-label="fool-transitions logo"
              class="inline-flex items-center gap-1.5 text-lg font-semibold transition-colors duration-200 hover:text-cyan-300">
              <Logo style="width: 30px; height: 30px;" />
              <p class="hidden md:block">FOOL</p>
            </a>
            <nav class="hidden h-full items-center gap-6 md:flex">
              {#each ['novels', 'library', 'store'] as route}
                <a
                  href={`/${route}`}
                  class={cn(
                    'anim-text hover:text-foreground/80 text-base font-medium capitalize transition-colors duration-200',
                    page.url.pathname.includes(route) ? 'text-foreground' : 'text-muted-foreground'
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
                class="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-auto w-8 items-center justify-center rounded-md px-0 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none">
                <span class="sr-only">notifications</span>
                <NotificationSquare class="size-5" />
              </a>
              <DropdownMenu.Root bind:open={userMenu}>
                <DropdownMenu.Trigger
                  aria-label="user-menu"
                  class="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md px-0 py-0 text-xs font-medium whitespace-nowrap transition-colors focus-visible:bg-transparent focus-visible:text-current focus-visible:ring-1 focus-visible:outline-none">
                  {#if user === null}
                    <UserCircle class="size-6" />
                  {:else}
                    <img
                      src={user?.avatar ?? '/default-avatar.png'}
                      alt={`${user.name}'s avatar`}
                      class="size-6 rounded-full" />
                  {/if}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  align="end"
                  side="bottom"
                  sideOffset={7.5}
                  forceMount
                  class="bg-background overflow-hidden rounded-tl-none rounded-tr-none border-t-0">
                  {#snippet child({ wrapperProps, props, open })}
                    {#if open}
                      <div
                        {...wrapperProps}
                        class="w-full max-w-xs"
                        transition:slide={{ duration: 300 }}>
                        <div {...props}>
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
                                class="w-full"
                                use:enhance={() => {
                                  return async ({ result }) => {
                                    user = null;
                                    if (result.type === 'success') {
                                      toast.info('Logout successfully. See you soon!');
                                      goto('/login');
                                    }
                                  };
                                }}>
                                <button class="inline-flex w-full cursor-pointer px-2 py-1.5"
                                  >Logout</button>
                              </form>
                            {:else}
                              <a href="/login" class="w-full px-2 py-1.5">Login</a>
                            {/if}
                          </DropdownMenu.Item>
                        </div>
                      </div>
                    {/if}
                  {/snippet}
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
