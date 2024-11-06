<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { superForm, type FormResult } from 'sveltekit-superforms';
  import Input from '$lib/components/ui/input/input.svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { registerSchema } from '../schema';
  import type { ActionData } from './$types.js';
  import { toast } from 'svelte-sonner';

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
          toast.success(`Account created successfully! Welcome to Fools Translations!`);
        }
      }
    }
  });

  const { form: formData, enhance, errors } = form;
</script>

<div class="container flex max-w-lg flex-col justify-center gap-4">
  <div class="mt-48 space-y-3">
    <h1 class="text-3xl font-medium opacity-90">Sign Up</h1>
    <p class="opacity-60">Enter your detail below to create your account</p>
  </div>
  <form method="POST" use:enhance class="w-full space-y-2">
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input type="email" {...attrs} bind:value={$formData.email} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="name">
      <Form.Control let:attrs>
        <Form.Label>Username</Form.Label>
        <Input {...attrs} bind:value={$formData.name} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input type="password" {...attrs} bind:value={$formData.password} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="confirmPassword">
      <Form.Control let:attrs>
        <Form.Label>Confirm Password</Form.Label>
        <Input type="password" {...attrs} bind:value={$formData.confirmPassword} />
        <Form.FieldErrors />
      </Form.Control>
    </Form.Field>
    <Form.Button class="w-full">Create Account</Form.Button>
  </form>

  <div class="flex flex-col gap-4 text-center text-sm">
    <p>
      <span class="opacity-80">By clicking continue, you agree to our</span>
      <a href="/support/terms-of-service" class="underline">Terms of Services</a>
      <span class="opacity-80">and</span>
      <a href="/support/privacy-policy" class="underline">Privacy Policy</a>
    </p>
    <p>
      <span class="opacity-80">Already have an account?</span>
      <a href="/auth/login" class="underline">Sign In</a>
    </p>
  </div>
</div>
