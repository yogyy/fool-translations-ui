<script lang="ts">
  import { page } from '$app/state';
</script>

<main class="-mt-14 flex min-h-svh items-center justify-center">
  <div class="flex min-h-svh flex-col items-center justify-center gap-3">
    <h1 class="text-foreground text-3xl font-medium capitalize">
      {page.error?.message}
    </h1>
    <button onclick={() => history.back()} class="rounded-xs border px-2 py-1.5 hover:text-cyan-300"
      >RETURN</button>
  </div>
</main>
