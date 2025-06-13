<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.status} | {page.error?.message}</title>
</svelte:head>
<div
  class="flex min-h-svh flex-col items-center justify-center gap-3 bg-black font-mono tracking-tighter">
  <h1 class="text-[26px] font-medium capitalize text-foreground">
    <span class="font-medium">{page.status}</span> | {page.error?.message}
  </h1>
  <a href="/" class="rounded-md border px-3 py-1.5 text-cyan-700 hover:text-cyan-300">RETURN</a>
</div>
