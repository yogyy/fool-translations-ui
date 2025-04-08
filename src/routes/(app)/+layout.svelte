<script lang="ts">
  import Navbar from '$lib/components/navbar.svelte';

  export let data;
</script>

<Navbar user={data.user} />
<slot></slot>
