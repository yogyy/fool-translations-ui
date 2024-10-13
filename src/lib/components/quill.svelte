<script lang="ts">
  import { onMount } from 'svelte';
  import '$lib/assets/quill.css';

  let editor: HTMLElement;

  onMount(async () => {
    const { default: Quill } = await import('quill');

    new Quill(editor, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'], // Formatting options
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, false] }],
          ['link', 'image']
        ]
      },
      theme: 'snow',
      placeholder: 'Write your story...'
    });
  });
</script>

<div bind:this={editor} />
