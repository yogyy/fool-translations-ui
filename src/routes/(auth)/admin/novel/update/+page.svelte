<script>
  import UpdateNovelForm from './update-novel-form.svelte';

  export let data;
</script>

<div class="container max-w-pgsize pt-28">
  <UpdateNovelForm data={data.form} novel={data.novel} />
</div>
