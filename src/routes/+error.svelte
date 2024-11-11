<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="-mt-14 flex min-h-dvh items-center justify-center">
  <h1 class="text-3xl font-medium text-foreground">Page {$page.error?.message}</h1>
</div>
