<script>
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';

  export let data;
</script>

<Navbar user={data.user} />
<main class="min-h-svh overflow-hidden md:mt-14">
  <slot></slot>
</main>
<Footer />
