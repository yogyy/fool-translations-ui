<script lang="ts">
  import { toast } from 'svelte-sonner';

  export let genres: string;

  function genrehandler() {
    let msg = genres.replace(/([a-z])([A-Z])/g, '$1, $2').replaceAll(' ', '');
    if (genres.length === 0) {
      toast.info('genre is empty', { position: 'top-left' });
    } else if (genres.includes(',') && !genres.includes(' ')) {
      toast.error('genre already separated', { position: 'top-left' });
    } else {
      genres = msg;
    }
  }
</script>

<button class="text-sm italic text-sky-400 dark:text-sky-800" type="button" on:click={genrehandler}>
  helper
</button>
