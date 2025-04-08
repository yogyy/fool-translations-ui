<script lang="ts">
  import { page } from '$app/stores';
</script>

<main class="-mt-14 flex min-h-dvh items-center justify-center">
  <h1 class="text-3xl font-medium text-foreground">{$page.error?.message}</h1>
</main>
