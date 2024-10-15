<script lang="ts">
  import { addComa } from '$lib/utils';
  import { toast } from 'svelte-sonner';

  export let genres: string;
</script>

<button
  class="text-sm italic text-accent"
  type="button"
  on:click={() => {
    let msg = addComa(genres);
    if (genres.length === 0) {
      toast.info('genre is empty');
    } else if (genres.includes(',')) {
      toast.error('genre already separated');
    } else {
      genres = msg;
    }
  }}>
  helper
</button>
