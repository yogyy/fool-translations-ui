<script lang="ts">
  import ChapterForm from './chapter-form.svelte';

  let { data } = $props();
</script>

<div class="container max-w-pgsize pt-28">
  <ChapterForm data={data.form} />
</div>
