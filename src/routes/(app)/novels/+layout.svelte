<script>
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';

  let { children, data } = $props();
</script>

<Navbar user={data.user} />
<main class="min-h-svh overflow-hidden md:mt-14">
  {@render children()}
</main>
<Footer />
