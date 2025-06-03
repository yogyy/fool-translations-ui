<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { updateNovelSchema } from '../../schema';
  import { superForm } from 'sveltekit-superforms';
  import type { Infer, FormResult, SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import ImagePreview from '$lib/components/image-preview.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import { focusEditor } from '$lib/utils';
  import Loading from '$lib/components/icons/loading.svelte';
  import type { Novel } from '$lib/types';
  import { page } from '$app/stores';
  import DatePicker from '$lib/components/date-picker.svelte';
  import type { ActionData } from './$types';
  import { toast } from 'svelte-sonner';

  export let data: SuperValidated<Infer<typeof updateNovelSchema>>;
  export let novel: Novel;
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
    validators: zodClient(updateNovelSchema),
    resetForm: false,
    clearOnSubmit: 'none',
    onUpdate({ form, result }) {
      const action = result.data as FormResult<ActionData>;

      if (!form.valid) return;
      if (action.updatedNovel.success === false || action.updatedNovel.error) {
        toast.error(action.updatedNovel.error);
        return;
      }

      toast.success(`Novel ${action.updatedNovel.data.title} updated`);
    }
  });

  const { form: formData, enhance, submitting } = form;

  $formData.id = $page.url.searchParams.get('novelId') || '';
  $formData.title = novel.title;
  $formData.author = novel.author;
  $formData.genres = novel.genres.join(', ');
  $formData.synopsis = novel.synopsis;
  $formData.cover = novel.cover || '';
  $formData.banner = novel.banner || '';
  $formData.publishedAt = new Date(novel.publishedAt).toISOString().split('T')[0];
</script>

<form
  method="POST"
  use:enhance
  class="relative mb-10 gap-3 space-y-2 [&>div>label]:text-foreground/70">
  <h1 class="text-xl font-semibold">Update Novel <i class="text-sky-500">{$formData.title}</i></h1>
  <div class="mt-2 flex w-full flex-col gap-3 md:flex-row">
    <Form.Field {form} name="title" class="w-full md:w-1/2">
      <Form.Control let:attrs>
        <Form.Label>Id</Form.Label>
        <Input {...attrs} value={$formData.id} class="rounded-sm border-border" disabled />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="title" class="mt-2.5 w-full md:w-1/2">
      <Form.Control let:attrs>
        <div class="flex flex-wrap items-center gap-1 md:justify-between">
          <Form.Label>Title</Form.Label>
          <Form.FieldErrors />
        </div>
        <Input {...attrs} bind:value={$formData.title} class="rounded-sm border-border" />
      </Form.Control>
    </Form.Field>
  </div>
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
          class="hide-scrollbar prose h-full min-w-full max-w-2xl cursor-auto p-2 text-foreground/80 dark:prose-invert prose-p:m-0 prose-p:mb-2">
        </div>
      </div>
    </Form.Control>
  </Form.Field>
  <div class="flex flex-col items-end gap-5 *:w-full md:flex-row">
    <Form.Field {form} name="author">
      <Form.Control let:attrs>
        <div class="flex flex-wrap items-center gap-1 md:justify-between">
          <Form.Label>Author</Form.Label>
          <Form.FieldErrors />
        </div>
        <Input {...attrs} bind:value={$formData.author} class="rounded-sm border-border" />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="publishedAt">
      <Form.Control let:attrs>
        <div class="flex flex-wrap items-center gap-1 md:justify-between">
          <Form.Label>Year of Publishing</Form.Label>
          <Form.FieldErrors />
        </div>
        <DatePicker {...attrs} bind:date={$formData.publishedAt} />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="genres" class="grow">
      <Form.Control let:attrs>
        <div class="flex flex-wrap items-center gap-1">
          <Form.Label title="separate genre with coma (,)">Genres</Form.Label>
          <Form.FieldErrors class="place-self-end" />
        </div>
        <Input {...attrs} bind:value={$formData.genres} class="rounded-sm border-border" />
      </Form.Control>
    </Form.Field>
  </div>

  <div class="flex flex-col justify-between gap-5 *:grow md:flex-row md:items-end">
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
    <Form.Button
      variant="outline"
      disabled={$submitting}
      class="flex-1 rounded-sm border-border bg-cyan-400 text-background hover:bg-cyan-700">
      {#if $submitting}
        <Loading class="h-5 w-5 animate-[spin_1.2s_linear_infinite]" />
      {:else}
        Update
      {/if}
    </Form.Button>
  </div>
</form>
