<script lang="ts">
  import Seo from '$lib/components/SEO.svelte';
  import { buttonVariants } from '$lib/components/ui/button/index.js';

  let { data } = $props();
</script>

<Seo title="Replies | Fool Translations" />

<div class="container md:my-6">
  <div class="flex flex-col items-center justify-center md:mx-24 lg:mx-36 xl:mx-48">
    {#if !data.user}
      <div class="mt-48 flex flex-col p-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          class="mx-auto mb-4 h-8 w-8 text-cyan-400">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            color="currentColor"
            ><path
              d="M20 21v-2.077c0-2 0-3.001-.145-3.838c-.8-4.609-4.762-8.223-9.812-8.952C9.125 6 7.193 6 5 6" /><path
              d="M7 3c-.607.59-3 2.16-3 3s2.393 2.41 3 3" /></g
          ></svg>
        <p class="font-medium">Get notified when someone responds to your comments</p>
        <span class="text-foreground/50">Sign in to see comment replies</span>
      </div>
      <a
        href="/login"
        class={buttonVariants({
          variant: 'default',
          class: 'w-40 bg-cyan-400 hover:bg-cyan-400/70'
        })}>
        Login
      </a>
    {/if}
  </div>
</div>
