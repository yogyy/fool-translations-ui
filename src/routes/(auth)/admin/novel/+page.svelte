<script lang="ts">
  import NovelForm from './novel-form.svelte';

  export let data;
</script>

<div class="container max-w-pgsize pt-28">
  <NovelForm data={data.form} />
</div>
