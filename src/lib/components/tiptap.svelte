<script lang="ts">
  import { Editor, type Content, type EditorEvents } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import { cn, focusEditor } from '$lib/utils';
  import { onDestroy, onMount, type Snippet } from 'svelte';

  interface Props {
    content?: Content;
    editor?: Editor;
    placeholder?: string;
    class?: string;
    onUpdate?: (props: EditorEvents['update']) => void;
    children: Snippet;
  }

  let {
    editor = $bindable(),
    placeholder = 'Write something...',
    class: className,
    content,
    onUpdate,
    children
  }: Props = $props();

  let element = $state<HTMLElement>();

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder
        })
      ],
      content,
      onUpdate,
      onTransaction(props) {
        editor = undefined;
        editor = props.editor;
      },
      parseOptions: {
        preserveWhitespace: 'full'
      }
    });
  });

  onDestroy(() => {
    if (editor) editor.destroy();
  });
</script>

<div class={cn('rounded-sm border', className)}>
  {@render children()}
  <div
    role="button"
    tabindex="0"
    bind:this={element}
    onclick={(e) => focusEditor(editor, e)}
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        focusEditor(editor, e);
      }
    }}
    class="hide-scrollbar prose text-foreground/80 dark:prose-invert prose-p:m-0 prose-p:mb-2 h-full max-w-2xl min-w-full cursor-auto p-2">
  </div>
</div>
