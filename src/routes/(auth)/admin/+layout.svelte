<script>
  import Navbar from '$lib/components/navbar.svelte';

  export let data;
</script>

<svelte:head>
  <title>Admin Page - Fool Translations</title>
</svelte:head>

<Navbar user={data.user} />
<slot></slot>
