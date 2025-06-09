<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import { cn } from '$lib/utils';

  export let content: string;
  export let placeholder = 'Write something …';
  let className: string;
  export { className as class };

  let element: Element;
  let editor: Editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder
        })
      ],
      content,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
      onUpdate(props) {
        content = props.editor.getText();
      },

      editorProps: {
        attributes: {
          class: cn(
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            className
          )
        }
      }
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<button on:click={() => editor?.commands.clearContent()}>reset</button>
<div bind:this={element}>
  <textarea class="hidden" {...$$restProps} bind:value={content}></textarea>
</div>
