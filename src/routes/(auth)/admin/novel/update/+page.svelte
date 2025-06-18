<script>
  import UpdateNovelForm from './update-novel-form.svelte';

  let { data } = $props();
</script>

<div class="max-w-pgsize container pt-28">
  <UpdateNovelForm data={data.form} novel={data.novel} />
</div>
