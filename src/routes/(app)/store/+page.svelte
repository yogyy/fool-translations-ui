<script>
  import { redirect } from '@sveltejs/kit';

  export let data;
  console.log('dari store page', data);
</script>

<div class="min-h-dvh overflow-hidden sm:mt-14">
  <p>hello</p>
  <a href="/login?from=store">login</a>
</div>
