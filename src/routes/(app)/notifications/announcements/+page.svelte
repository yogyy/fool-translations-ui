<script lang="ts">
  import Seo from '$lib/components/SEO.svelte';
  import { buttonVariants } from '$lib/components/ui/button';

  let { data } = $props();
</script>

<Seo title="Announcement | Fool Translations" />

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
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M20.01 5.01C19.92 5 19.8 5 19.6 5h-.18m.67.01c.07.03.13.09.15.16v14.16c-.03.07-.08.13-.15.16H20c-.09.01-.21.01-.41.01h-.21s-.07-.02-.11-.05c0 .01 0 0-.03-.02c-.03-.03-.06-.06-.13-.12l-.17-.17s-.04-.05-.07-.07c-.64-.64-1.05-1.05-1.55-1.35h-.02v-.01c-.5-.3-1.06-.47-1.92-.73a.3.3 0 0 0-.09-.02l-7.55-2.27V9.81l7.55-2.27s.06-.01.09-.02c.86-.26 1.42-.43 1.92-.73h.02v-.01c.5-.3.91-.71 1.55-1.35l.07-.07l.17-.17c.06-.06.1-.09.13-.12M6.9 8.5l7.97-2.39c.98-.3 1.35-.41 1.68-.61h.02c.32-.2.6-.47 1.33-1.2l.17-.17s.02 0 .02-.02c.1-.09.2-.2.31-.28c.22-.16.47-.26.74-.31c.14-.02.29-.02.42-.02h.11c.3 0 .62 0 .89.09c.52.18.93.58 1.1 1.1c.09.28.09.59.09.89v13.34c0 .3 0 .61-.09.89c-.17.52-.58.92-1.1 1.1c-.28.09-.59.09-.89.09h-.11c-.14 0-.28 0-.42-.02a1.8 1.8 0 0 1-1.05-.59c0-.01-.02-.02-.02-.02l-.17-.17c-.73-.73-1-1-1.33-1.19h-.02c-.32-.21-.7-.32-1.68-.62l-1.44-.43l-1.22 1.84a2.701 2.701 0 0 1-4.95-1.5v-2.19L6.9 16h-.92c-.44 0-.82 0-1.12-.02c-.32-.02-.62-.07-.91-.19c-.67-.28-1.21-.81-1.49-1.49c-.12-.29-.17-.59-.19-.9s-.02-.68-.02-1.12v-.05c0-.45 0-.82.02-1.13s.07-.61.19-.9c.28-.68.81-1.21 1.49-1.49c.29-.12.59-.17.91-.19c.3-.02.68-.02 1.12-.02zm-.64 6V10h-.25c-.48 0-.8 0-1.04.02c-.24.01-.36.04-.44.08c-.31.12-.55.37-.68.67c-.03.08-.06.2-.08.44s-.02.56-.02 1.04s0 .8.02 1.04s.05.36.08.44c.13.3.37.55.68.68c.08.03.19.06.44.07c.25.02.57.02 1.04.02zm2.5 2.06v1.74c0 .66.54 1.2 1.2 1.2c.4 0 .78-.2 1-.54l.97-1.45zM19.28 5.05s.07-.04.11-.05z"
            color="currentColor" /></svg>
        <p class="font-medium">Get notified when there are new annoucements</p>
        <span class="text-foreground/50">Sign in to see announcements you missed</span>
      </div>
      <a
        href="/login"
        class={buttonVariants({
          variant: 'default',
          class: 'w-40 bg-cyan-400 hover:bg-cyan-400/70'
        })}>
        Login
      </a>
    {:else}
      <div class="w-full max-w-xl">
        <h1 class="mt-14 text-left text-xl font-semibold">Announcements</h1>
      </div>
    {/if}
  </div>
</div>
