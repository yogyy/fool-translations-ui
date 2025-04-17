<script lang="ts">
  import { page } from '$app/stores';
</script>

<main class="-mt-14 flex min-h-svh items-center justify-center">
  <div class="flex min-h-svh flex-col items-center justify-center gap-3">
    <h1 class="text-3xl font-medium capitalize text-foreground">
      {$page.error?.message}
    </h1>
    <button
      on:click={() => history.back()}
      class="rounded-sm border px-2 py-1.5 hover:text-cyan-300">RETURN</button>
  </div>
</main>
