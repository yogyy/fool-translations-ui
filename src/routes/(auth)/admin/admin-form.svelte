<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { novelSchema, type FormSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import type { Infer, FormResult, SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { ActionData } from './$types';
  import { toast } from 'svelte-sonner';
  import ImagePreview from '$lib/components/image-preview.svelte';
  import GenresHelper from '$lib/components/genres-helper.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';

  export let data: SuperValidated<Infer<FormSchema>>;

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
      content: $formData.synopsis,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },

      onUpdate(props) {
        $formData.synopsis = props.editor.getText();
      },

      editorProps: {
        attributes: {
          class:
            'hide-scrollbar prose prose-sm max-h-52 min-h-32 max-w-2xl rounded-md border border-input p-2 text-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
        }
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
    validators: zodClient(novelSchema),
    onUpdate({ form, result }) {
      const action = result.data as FormResult<ActionData>;
      if (form.valid) {
        console.log(action.newNovel);
        if (action.newNovel.success === false) {
          toast.error(action.newNovel.error);
        } else {
          editor.commands.clearContent();
          toast.success(`Novel ${action.newNovel.data.title} added`);
        }
      }
    }
  });

  const { form: formData, enhance } = form;
</script>

<form
  method="POST"
  action="?/create"
  use:enhance
  class="max-w-2xl space-y-1 [&>div>label]:text-foreground/70">
  <Form.Field {form} name="title">
    <Form.Control let:attrs>
      <Form.Label>Title</Form.Label>
      <Input {...attrs} bind:value={$formData.title} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="synopsis">
    <Form.Control let:attrs>
      <div class="flex items-center">
        <Form.Label>Synopsis</Form.Label>
        <Form.FieldErrors />
      </div>
      <textarea class="hidden" {...attrs} bind:value={$formData.synopsis} />
      <div bind:this={element}></div>
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="author">
    <Form.Control let:attrs>
      <Form.Label>Author</Form.Label>
      <Input {...attrs} bind:value={$formData.author} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="genres" class="space-y-0">
    <Form.Control let:attrs>
      <Form.Label>Genres</Form.Label>
      <span class="text-sm italic text-foreground/60">separate genre with coma (,)</span>
      <GenresHelper bind:genres={$formData.genres} />
      <Input {...attrs} bind:value={$formData.genres} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="cover" class="space-y-0">
    <Form.Control let:attrs>
      <Form.Label>Cover</Form.Label>
      {#if $formData.cover}
        <ImagePreview src={$formData.cover} alt={`${$formData.title}'s cover'`} />
      {/if}
      <Input {...attrs} bind:value={$formData.cover} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="banner">
    <Form.Control let:attrs>
      <Form.Label>Banner</Form.Label>
      {#if $formData.banner}
        <ImagePreview src={$formData.banner} alt={`${$formData.title}'s banner'`} />
      {/if}
      <Input {...attrs} bind:value={$formData.banner} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Button variant="outline">Add</Form.Button>
</form>
