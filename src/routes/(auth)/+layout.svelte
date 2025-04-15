<script>
  import { page } from '$app/stores';
  import Footer from '$lib/components/footer.svelte';
  import Logo from '$lib/components/icons/logo.svelte';

  $: current_url = $page.url.pathname.split('/').filter(Boolean).pop() || '/';
</script>

<main class="min-h-dvh overflow-hidden">
  <div class="container flex max-w-lg flex-col justify-center gap-4">
    <div class="mt-48 space-y-3">
      <div class="flex gap-3">
        <Logo class="h-10 w-10" />
        <h1 class="text-3xl font-medium capitalize opacity-90">{current_url}</h1>
      </div>
      <p class="opacity-60">
        {#if current_url === 'register'}
          Enter your detail below to create your account
        {:else}
          Enter your email below to login to your account
        {/if}
      </p>
    </div>
    <slot></slot>
  </div>
</main>
<Footer />
