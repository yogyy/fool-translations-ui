<script lang="ts">
  import { toast, type ExternalToast } from 'svelte-sonner';

  export let genres: string;

  const toastSetting: ExternalToast = { position: 'top-left' };
  function genrehandler() {
    let msg = genres.replace(/([a-z])([A-Z])/g, '$1, $2');
    if (genres.length === 0) {
      toast.info('genre is empty', toastSetting);
    } else if (genres.includes(',')) {
      toast.error('genre already separated', toastSetting);
    } else {
      genres = msg;
    }
  }
</script>

<button class="text-sm italic text-sky-400 dark:text-sky-800" type="button" on:click={genrehandler}>
  helper
</button>
