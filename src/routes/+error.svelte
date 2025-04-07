<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status} | {$page.error?.message}</title>
</svelte:head>
<div class="flex min-h-dvh flex-col items-center justify-center gap-3 bg-black">
  <h1 class="text-3xl font-medium uppercase text-foreground">
    <span class="font-semibold">{$page.status}</span> | {$page.error?.message}
  </h1>
  <a href="/" class="rounded-sm border px-2 py-1.5 hover:text-cyan-300">RETURN</a>
</div>
