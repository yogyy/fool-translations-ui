<script lang="ts">
  import Notification from '$lib/components/notification.svelte';

  export let data;
</script>

<svelte:head>
  <title>Notifications | Fool Translations</title>
</svelte:head>

<div class="container md:my-6">
  <div class="flex flex-col items-center justify-center md:mx-24 lg:mx-36 xl:mx-48">
    <div
      class="mt-2 flex h-full w-full flex-col gap-3 overflow-hidden sm:p-2 md:rounded-xl md:border md:px-4 md:py-2">
      {#each data.chapters as chapter}
        <Notification {chapter} />
      {/each}
    </div>
  </div>
</div>
