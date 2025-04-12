<script lang="ts">
  import SettingsForm from './admin-form.svelte';

  export let data;
</script>

<div class="container min-h-svh max-w-pgsize pt-20">
  <SettingsForm data={data.form} />
</div>
