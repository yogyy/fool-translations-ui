<script lang="ts">
  import NovelForm from './novel-form.svelte';

  let { data } = $props();
</script>

<div class="max-w-pgsize container pt-28">
  <NovelForm data={data.form} />
</div>
