<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { chapterSchema } from '../admin.validation';
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { zod4Client } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { Editor } from '@tiptap/core';
  import Loading from '$lib/components/icons/loading.svelte';
  import { page } from '$app/state';
  import Tiptap from '$lib/components/tiptap.svelte';
  import type { Transaction } from '@tiptap/pm/state';
  import type { CloudinaryResponse } from '$lib/types';
  import { PUBLIC_CLOUDINARY_CLOUD_NAME, PUBLIC_CLOUDINARY_CLOUD_PRESET } from '$env/static/public';

  interface Props {
    data: SuperValidated<Infer<typeof chapterSchema>>;
  }

  let { data }: Props = $props();
  let editor = $state<Editor>();
  let content = $state('');

  const form = superForm(data, {
    dataType: 'json',
    validators: zod4Client(chapterSchema),
    resetForm: false,
    onChange({}) {},
    async onSubmit({ cancel }) {
      await new Promise(async (resolve) => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const fileName = `${$formData.novelId.slice(4)}-chapter-${$formData.chapterNum}.md`;
        const _formData = new FormData();
        _formData.append('file', blob, fileName);
        _formData.append('upload_preset', PUBLIC_CLOUDINARY_CLOUD_PRESET);
        _formData.append('resource_type', 'raw');
        const upload = await fetch(
          `https://api.cloudinary.com/v1_1/${PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
          { method: 'POST', body: _formData }
        );
        if (!upload.ok) {
          cancel();
          toast.error('Cloudinary upload failed');
          return resolve;
        }
        const data: CloudinaryResponse = await upload.json();
        if (data.existing) {
          cancel();
          toast.error('Chapter Already Exist');
          return resolve;
        }
        $formData.content = data.secure_url;
        resolve(data);
      });
    },
    onUpdate({ form, result }) {
      if (!form.valid) return;
      if (result.type === 'failure') {
        toast.error(form.message);
      }

      if (result.type === 'success') {
        toast.success(`Chapter ${form.data.chapterNum}. ${form.data.title} added`);
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
  $formData.novelId = page.url.searchParams.get('novelId') || '';

  function onUpdate(props: { editor: Editor; transaction: Transaction }) {
    content = props.editor.getText();
  }
</script>

<SuperDebug data={$formData} />
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
        <Input {...attrs} value={$formData.novelId} class="rounded-sm border-border" disabled />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="chapterNum" class="w-full">
      <Form.Control let:attrs>
        <div class="flex flex-wrap items-center gap-1 md:justify-between">
          <Form.Label>Chapter Number</Form.Label>
          <Form.FieldErrors />
        </div>
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
      class="w-full rounded-sm border-border bg-cyan-400 text-background hover:bg-cyan-700">
      {#if $submitting}
        <Loading class="size-5 animate-[spin_1.2s_linear_infinite]" />
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
      <Tiptap class="h-[40rem]" bind:editor {onUpdate}>
        <textarea class="hidden" {...attrs} bind:value={content}></textarea>
      </Tiptap>
    </Form.Control>
  </Form.Field>
</form>
