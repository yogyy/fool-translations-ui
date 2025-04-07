<script lang="ts">
  import '../app.css';
  import { Toaster } from 'svelte-sonner';
  import { ModeWatcher } from 'mode-watcher';
  import { userPrefersMode } from 'mode-watcher';
</script>

<ModeWatcher />

<slot></slot>

<Toaster
  richColors
  theme={$userPrefersMode}
  toastOptions={{
    classes: {
      toast: 'bg-complimentary/80 rounded-full py-2 w-full flex items-center justify-center'
    }
  }} />
