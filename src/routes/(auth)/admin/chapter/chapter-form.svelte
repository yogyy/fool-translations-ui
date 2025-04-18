<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { chapterSchema } from '../schema';
  import { superForm } from 'sveltekit-superforms';
  import type { Infer, FormResult, SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { ActionData } from './$types';
  import { toast } from 'svelte-sonner';
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import { focusEditor } from '$lib/utils';
  import Loading from '$lib/components/icons/loading.svelte';
  import { page } from '$app/stores';

  export let data: SuperValidated<Infer<typeof chapterSchema>>;

  let element: Element;
  let editor: Editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: 'Write something …'
        })
      ],
      content: $formData.content,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },

      onUpdate(props) {
        $formData.content = props.editor.getText();
      }
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  const form = superForm(data, {
    dataType: 'json',
    validators: zodClient(chapterSchema),
    resetForm: false,
    onUpdate({ form, result }) {
      const action = result.data as FormResult<ActionData>;

      if (!form.valid) return;
      if (action.newChapter.success === false || action.newChapter.error) {
        toast.error(action.newChapter.error);
        return;
      }

      editor.commands.clearContent();
      toast.success(
        `Chapter ${action.newChapter.data.chapterNum}. ${action.newChapter.data.title} added`
      );
    }
  });

  const { form: formData, enhance, submitting } = form;

  $formData.novelId = $page.url.searchParams.get('novelId') || '';
</script>

<form
  method="POST"
  action="?/create"
  use:enhance
  class="relative mb-10 gap-3 space-y-2 [&>div>label]:text-foreground/70">
  <h1 class="text-xl font-semibold">Add Chapter</h1>
  <div class="mt-2 flex w-full flex-col items-end gap-3 md:flex-row">
    <Form.Field {form} name="title" class="w-full">
      <Form.Control let:attrs>
        <div class="flex flex-wrap items-center gap-1 md:justify-between">
          <Form.Label>Title</Form.Label>
          <Form.FieldErrors />
        </div>
        <Input {...attrs} bind:value={$formData.title} class="rounded-sm border-border" />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="novelId" class="w-full">
      <Form.Control let:attrs>
        <div class="flex flex-wrap items-center gap-1 md:justify-between">
          <Form.Label>Novel Id</Form.Label>
          <Form.FieldErrors />
        </div>
        <Input {...attrs} bind:value={$formData.novelId} class="rounded-sm border-border" />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="chapterNum" class="w-full">
      <Form.Control let:attrs>
        <Form.Label>Chapter Number</Form.Label>
        <Input
          {...attrs}
          type="number"
          bind:value={$formData.chapterNum}
          class="rounded-sm border-border" />
      </Form.Control>
    </Form.Field>

    <Form.Button
      variant="outline"
      disabled={$submitting}
      class="w-full rounded-sm border-border bg-cyan-400 text-background hover:bg-cyan-700 md:w-fit">
      {#if $submitting}
        <Loading class="h-5 w-5 animate-[spin_1.2s_linear_infinite]" />
      {:else}
        Add
      {/if}
    </Form.Button>
  </div>
  <Form.Field {form} name="content" class="row-span-4">
    <Form.Control let:attrs>
      <div class="flex flex-wrap items-center gap-1 md:justify-between">
        <Form.Label>Content</Form.Label>
        <Form.FieldErrors />
      </div>
      <div class="h-[40rem] rounded-sm border">
        <textarea class="hidden" {...attrs} bind:value={$formData.content} />
        <div
          role="button"
          tabindex="0"
          bind:this={element}
          on:click={(e) => focusEditor(editor, e)}
          on:keydown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              focusEditor(editor, event);
            }
          }}
          class="hide-scrollbar prose h-full min-w-full max-w-2xl cursor-auto p-2 text-foreground/80 dark:prose-invert prose-p:m-0 prose-p:mb-2">
        </div>
      </div>
    </Form.Control>
  </Form.Field>
</form>
