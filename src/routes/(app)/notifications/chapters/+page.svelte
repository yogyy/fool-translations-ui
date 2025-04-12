<script lang="ts">
  import Notification from '$lib/components/notification.svelte';
  import { buttonVariants } from '$lib/components/ui/button/index.js';

  export let data;
</script>

<svelte:head>
  <title>Notifications | Fool Translations</title>
</svelte:head>

<div class="container md:my-6">
  <div class="flex flex-col items-center justify-center md:mx-24 lg:mx-36 xl:mx-48">
    {#if !data.user}
      <div class="mt-48 flex flex-col p-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          class="mx-auto mb-4 h-8 w-8 text-cyan-400">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 6v14M5.98 3.285c3.342.637 5.333 1.967 6.02 2.731c.687-.764 2.678-2.094 6.02-2.73c1.692-.323 2.538-.484 3.26.134c.72.617.72 1.62.72 3.626v7.209c0 1.834 0 2.751-.463 3.324c-.462.572-1.48.766-3.518 1.154c-1.815.346-3.232.896-4.258 1.45c-1.01.545-1.514.817-1.761.817s-.752-.272-1.76-.817c-1.027-.553-2.444-1.104-4.26-1.45c-2.036-.388-3.055-.582-3.517-1.154C2 17.006 2 16.089 2 14.255V7.046c0-2.006 0-3.009.72-3.626c.722-.618 1.568-.457 3.26-.135"
            color="currentColor" /></svg>
        <p class="font-medium">Get notified when your favorite novel is updated</p>
        <span class="text-foreground/50">Sign in to see update chapters</span>
      </div>
      <a
        href="/login"
        class={buttonVariants({
          variant: 'default',
          class: 'w-40 bg-cyan-400 hover:bg-cyan-400/70'
        })}>
        Login
      </a>
    {:else if data?.chapters && data.chapters.length > 0}
      <div
        class="mt-20 flex h-full w-full flex-col gap-3 overflow-hidden sm:p-2 md:rounded-xl md:border md:px-4 md:py-2">
        {#each data.chapters as chapter}
          <Notification {chapter} />
        {/each}
      </div>
    {:else}
      <div class="w-full max-w-xl">
        <h1 class="mt-14 text-left text-xl font-semibold">Nothing to show here</h1>
      </div>
    {/if}
  </div>
</div>
