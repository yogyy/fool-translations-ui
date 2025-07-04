<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { updateNovelSchema } from '../../admin.validation';
  import { superForm } from 'sveltekit-superforms';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { zod4Client } from 'sveltekit-superforms/adapters';
  import ImagePreview from '$lib/components/image-preview.svelte';
  import { Editor } from '@tiptap/core';
  import Loading from '$lib/components/icons/loading.svelte';
  import { page } from '$app/state';
  import DatePicker from '$lib/components/date-picker.svelte';
  import { toast } from 'svelte-sonner';
  import type { Novel } from '$lib/server/db/schema/novel.schema';
  import type { Transaction } from '@tiptap/pm/state';
  import Tiptap from '$lib/components/tiptap.svelte';

  interface Props {
    data: SuperValidated<Infer<typeof updateNovelSchema>>;
    novel: Novel;
  }

  let { data, novel }: Props = $props();
  let editor = $state<Editor>();

  const form = superForm(data, {
    dataType: 'json',
    validators: zod4Client(updateNovelSchema),
    resetForm: false,
    clearOnSubmit: 'none',
    onUpdate({ form, result }) {
      if (!form.valid) return;
      if (result.type === 'failure') {
        toast.error(form.message);
      }

      if (result.type === 'success') {
        toast.success(`Novel ${form.data.title} updated`);
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $formData.id = page.url.searchParams.get('novelId') || '';
  $formData.title = novel.title;
  $formData.author = novel.author;
  $formData.genres = novel.genres?.join(',') || '';
  $formData.synopsis = novel.synopsis;
  $formData.cover = novel.cover || '';
  $formData.banner = novel.banner || '';
  $formData.publishedAt = new Date(novel.publishedAt!).toISOString().split('T')[0];

  function onUpdate(props: { editor: Editor; transaction: Transaction }) {
    $formData.synopsis = props.editor.getText();
  }
</script>

<form
  method="POST"
  use:enhance
  class="[&>div>label]:text-foreground/70 relative mb-10 gap-3 space-y-2">
  <h1 class="text-xl font-semibold">Update Novel <i class="text-sky-500">{$formData.title}</i></h1>
  <div class="flex w-full flex-col items-end gap-3 md:flex-row">
    <Form.Field {form} name="id" class="w-full md:w-1/2">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Id</Form.Label>
          <Input {...props} value={$formData.id} class="border-border rounded-sm" disabled />
        {/snippet}
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="title" class="mt-2.5 w-full md:w-1/2">
      <Form.Control>
        {#snippet children({ props })}
          <div class="flex flex-wrap items-center gap-1 md:justify-between">
            <Form.Label>Title</Form.Label>
            <Form.FieldErrors />
          </div>
          <Input {...props} bind:value={$formData.title} class="border-border rounded-sm" />
        {/snippet}
      </Form.Control>
    </Form.Field>
  </div>
  <Form.Field {form} name="synopsis" class="row-span-4">
    <Form.Control>
      {#snippet children({ props })}
        <div class="flex flex-wrap items-center gap-1 md:justify-between">
          <Form.Label>Synopsis</Form.Label>
          <Form.FieldErrors />
        </div>
        <Tiptap class="h-[20rem]" content={novel.synopsis} bind:editor {onUpdate}>
          <textarea class="hidden" {...props} bind:value={$formData.synopsis}></textarea>
        </Tiptap>
      {/snippet}
    </Form.Control>
  </Form.Field>
  <div class="flex flex-col items-end gap-5 *:w-full md:flex-row">
    <Form.Field {form} name="author">
      <Form.Control>
        {#snippet children({ props })}
          <div class="flex flex-wrap items-center gap-1 md:justify-between">
            <Form.Label>Author</Form.Label>
            <Form.FieldErrors />
          </div>
          <Input {...props} bind:value={$formData.author} class="border-border rounded-sm" />
        {/snippet}
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="publishedAt">
      <Form.Control>
        {#snippet children({ props })}
          <div class="flex flex-wrap items-center gap-1 md:justify-between">
            <Form.Label>Year of Publishing</Form.Label>
            <Form.FieldErrors />
          </div>
          <DatePicker {...props} bind:date={$formData.publishedAt} />
        {/snippet}
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="genres" class="grow">
      <Form.Control>
        {#snippet children({ props })}
          <div class="flex flex-wrap items-center gap-1">
            <Form.Label title="separate genre with coma (,)">Genres</Form.Label>
            <Form.FieldErrors class="place-self-end" />
          </div>
          <Input {...props} bind:value={$formData.genres} class="border-border rounded-sm" />
        {/snippet}
      </Form.Control>
    </Form.Field>
  </div>

  <div class="flex flex-col justify-between gap-5 *:grow md:flex-row md:items-end">
    <Form.Field {form} name="cover">
      <Form.Control>
        {#snippet children({ props })}
          <div class="flex items-center gap-3">
            <Form.Label>Cover</Form.Label>
            {#if $formData.cover}
              <ImagePreview src={$formData.cover} alt={`${$formData.title}'s cover'`} />
            {/if}
            <Form.FieldErrors />
          </div>
          <Input
            {...props}
            bind:value={$formData.cover}
            class="border-border rounded-sm"
            placeholder="https://" />
        {/snippet}
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="banner">
      <Form.Control>
        {#snippet children({ props })}
          <div class="flex items-center gap-3">
            <Form.Label>Banner</Form.Label>
            {#if $formData.banner}
              <ImagePreview src={$formData.banner} alt={`${$formData.title}'s banner'`} />
            {/if}
            <Form.FieldErrors />
          </div>
          <Input
            {...props}
            bind:value={$formData.banner}
            class="border-border rounded-sm"
            placeholder="https://" />
        {/snippet}
      </Form.Control>
    </Form.Field>
    <Form.Button
      variant="outline"
      disabled={$submitting}
      class="border-border text-background flex-1 rounded-sm bg-cyan-400 hover:bg-cyan-700">
      {#if $submitting}
        <Loading class="size-5 animate-[spin_1.2s_linear_infinite]" />
      {:else}
        Update
      {/if}
    </Form.Button>
  </div>
</form>
