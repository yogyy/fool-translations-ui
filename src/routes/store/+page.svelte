<script>
  import { redirect } from '@sveltejs/kit';

  export let data;
  console.log('dari store page', data);
</script>

<p>hello</p>
<a href="/auth/login?from=store">login</a>
