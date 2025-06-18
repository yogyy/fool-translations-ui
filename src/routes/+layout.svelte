<script>
  import '../app.css';
  import { Toaster } from 'svelte-sonner';
  import { ModeWatcher, mode } from 'mode-watcher';

  import { navigating, page } from '$app/state';
  import Loading from '$lib/components/icons/loading.svelte';

  let { children } = $props();
</script>

<ModeWatcher />

{#if navigating.to && !page.route.id?.includes('(auth)')}
  <div class="bg-background/40 fixed z-50 -mt-14 flex h-svh w-dvw items-center justify-center">
    <Loading class="h-7 w-7 animate-[spin_1.2s_linear_infinite] text-cyan-800 dark:text-cyan-400" />
  </div>
{/if}

{@render children()}

<Toaster
  richColors
  theme={mode.current}
  toastOptions={{
    unstyled: true,
    classes: {
      toast: 'bg-complimentary/80 rounded-full py-2 w-full flex items-center justify-center text-sm'
    }
  }} />
