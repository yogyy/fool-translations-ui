<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { superForm, type FormResult } from 'sveltekit-superforms';
  import Input from '$lib/components/ui/input/input.svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { registerSchema } from '../schema';
  import type { ActionData } from './$types.js';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import Loading from '$lib/components/icons/loading.svelte';

  export let data;

  const form = superForm(data.form, {
    dataType: 'json',
    validators: zodClient(registerSchema),
    onUpdate({ form, result }) {
      const { signup } = result.data as FormResult<ActionData>;

      if (form.valid) {
        if (signup?.success === false) {
          toast.error(signup?.error);
        } else {
          toast.success(`Account created successfully! Welcome to Fool Translations!`);
          goto('/');
        }
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<svelte:head><title>Register | Fool Translations</title></svelte:head>

<form method="POST" use:enhance class="w-full space-y-2">
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input
        placeholder="sherlock@moriarty.tarot"
        type="email"
        {...attrs}
        bind:value={$formData.email} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="name">
    <Form.Control let:attrs>
      <Form.Label>Username</Form.Label>
      <Input placeholder="Sherlock Moriarty" {...attrs} bind:value={$formData.name} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <Input placeholder="****" type="password" {...attrs} bind:value={$formData.password} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="confirmPassword">
    <Form.Control let:attrs>
      <Form.Label>Confirm Password</Form.Label>
      <Input placeholder="****" type="password" {...attrs} bind:value={$formData.confirmPassword} />
      <Form.FieldErrors />
    </Form.Control>
  </Form.Field>
  <Form.Button disabled={$submitting} class="w-full">
    {#if $submitting}
      <Loading class="h-5 w-5 animate-[spin_1.2s_linear_infinite]" />
    {:else}
      Create Account
    {/if}
  </Form.Button>
</form>

<div class="flex flex-col gap-4 text-pretty text-center text-sm">
  <p>
    <span class="opacity-80">By clicking continue, you agree to our</span>
    <a href="/support/terms-of-service" class="underline">Terms of Services</a>
    <span class="opacity-80">and</span>
    <a href="/support/privacy-policy" class="underline">Privacy Policy</a>
  </p>
  <p>
    <span class="opacity-80">Already have an account?</span>
    <a href="/login" class="underline">Sign In</a>
  </p>
</div>
