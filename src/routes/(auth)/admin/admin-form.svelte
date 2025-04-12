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
  import { focusEditor } from '$lib/utils';

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
        if (action.newNovel.success === false || action.newNovel.error) {
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
  class="relative mb-10 grid grid-cols-1 gap-3 space-y-2 lg:grid-cols-2 [&>div>label]:text-foreground/70">
  <Form.Field {form} name="title" class="mt-2">
    <Form.Control let:attrs>
      <div class="flex flex-wrap items-center gap-1 md:justify-between">
        <Form.Label>Title</Form.Label>
        <Form.FieldErrors />
      </div>
      <Input {...attrs} bind:value={$formData.title} class="rounded-sm border-border" />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="synopsis" class="row-span-4">
    <Form.Control let:attrs>
      <div class="flex flex-wrap items-center gap-1 md:justify-between">
        <Form.Label>Synopsis</Form.Label>
        <Form.FieldErrors />
      </div>
      <div class="h-[20rem] rounded-sm border">
        <textarea class="hidden" {...attrs} bind:value={$formData.synopsis} />
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
          class="hide-scrollbar h-full min-w-full max-w-2xl cursor-auto p-2 text-foreground/80 dark:prose-invert">
        </div>
      </div>
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="author">
    <Form.Control let:attrs>
      <div class="flex flex-wrap items-center gap-1 md:justify-between">
        <Form.Label>Author</Form.Label>
        <Form.FieldErrors />
      </div>
      <Input {...attrs} bind:value={$formData.author} class="rounded-sm border-border" />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="genres">
    <Form.Control let:attrs>
      <div class="flex flex-wrap items-center gap-1 md:justify-between">
        <Form.Label>Genres</Form.Label>
        <Form.FieldErrors />
      </div>
      <span class="text-sm italic text-foreground/60">separate genre with coma (,)</span>
      <GenresHelper bind:genres={$formData.genres} />
      <Input {...attrs} bind:value={$formData.genres} class="rounded-sm border-border" />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="cover">
    <Form.Control let:attrs>
      <div class="flex items-center gap-3">
        <Form.Label>Cover</Form.Label>
        {#if $formData.cover}
          <ImagePreview src={$formData.cover} alt={`${$formData.title}'s cover'`} />
        {/if}
        <Form.FieldErrors />
      </div>
      <Input
        {...attrs}
        bind:value={$formData.cover}
        class="rounded-sm border-border"
        placeholder="https://" />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="banner">
    <Form.Control let:attrs>
      <div class="flex items-center gap-3">
        <Form.Label>Banner</Form.Label>
        {#if $formData.banner}
          <ImagePreview src={$formData.banner} alt={`${$formData.title}'s banner'`} />
        {/if}
        <Form.FieldErrors />
      </div>
      <Input
        {...attrs}
        bind:value={$formData.banner}
        class="rounded-sm border-border"
        placeholder="https://" />
    </Form.Control>
  </Form.Field>
  <Form.Button variant="outline" class="absolute bottom-0 right-0 w-1/2 rounded-sm border-border"
    >Add</Form.Button>
</form>

<style>
  :global(.ProseMirror) {
    min-height: 100%;
    position: relative;
    word-wrap: break-word;
    white-space: pre-wrap;
    cursor: auto;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
    &:focus {
      outline: none;
    }
  }
</style>
