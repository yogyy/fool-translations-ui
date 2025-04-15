<script>
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';

  export let data;
</script>

<svelte:head>
  <title>Admin Page - Fool Translations</title>
</svelte:head>

<Navbar user={data.user} />
<main class="min-h-dvh overflow-hidden">
  <slot></slot>
</main>
<Footer />
