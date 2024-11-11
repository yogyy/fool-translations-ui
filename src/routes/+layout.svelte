<script lang="ts">
  import '../app.css';
  import { Toaster } from 'svelte-sonner';
  import { ModeWatcher } from 'mode-watcher';
  import { userPrefersMode } from 'mode-watcher';
  import Navbar from '$lib/components/navbar.svelte';
  import Footer from '$lib/components/footer.svelte';

  export let data;
</script>

<svelte:head>
  <title>Fool Translations</title>
</svelte:head>
<ModeWatcher />
<Navbar user={data.user} />

<slot></slot>

<Footer />
<Toaster
  richColors
  theme={$userPrefersMode}
  toastOptions={{
    classes: {
      toast: 'bg-complimentary/80 rounded-full py-2 w-full flex items-center justify-center'
    }
  }} />
