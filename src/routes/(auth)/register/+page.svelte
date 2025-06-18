<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { superForm } from 'sveltekit-superforms';
  import Input from '$lib/components/ui/input/input.svelte';
  import { zod4Client } from 'sveltekit-superforms/adapters';
  import { registerSchema } from '../auth.validation';
  import { toast } from 'svelte-sonner';
  import Loading from '$lib/components/icons/loading.svelte';
  import { onMount } from 'svelte';
  import { PUBLIC_APP_ENV, PUBLIC_TURNSLITE_SITE_KEY } from '$env/static/public';

  let { data } = $props();

  const form = superForm(data.form, {
    dataType: 'json',
    validators: zod4Client(registerSchema),
    resetForm: false,
    onUpdate({ form, result }) {
      if (result.type === 'failure') {
        toast.error(form.message, { id: $formData.email, position: 'top-right' });
      }
    },
    onResult({ result }) {
      if (result.type === 'success') {
        toast.info('Welcome to Fool Translations.', {
          position: 'top-right'
        });
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  let turnstileToken = $state('');

  onMount(() => {
    if (window.turnstile) {
      window.turnstile.render('#turnstile-widget', {
        sitekey:
          PUBLIC_APP_ENV === 'production' ? PUBLIC_TURNSLITE_SITE_KEY : '3x00000000000000000000FF',
        callback: (t) => {
          $formData.token = t;
          turnstileToken = t;
        }
      });
    }
  });
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer></script>
  <title>Register | Fool Translations</title>
</svelte:head>

<form method="POST" use:enhance class="w-full space-y-2">
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input
          placeholder="sherlock@moriarty.tarot"
          type="email"
          {...props}
          bind:value={$formData.email} />
        <Form.FieldErrors />
      {/snippet}
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Name</Form.Label>
        <Input placeholder="Sherlock Moriarty" {...props} bind:value={$formData.name} />
        <Form.FieldErrors />
      {/snippet}
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <Input placeholder="****" type="password" {...props} bind:value={$formData.password} />
        <Form.FieldErrors />
      {/snippet}
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="confirmPassword">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Confirm Password</Form.Label>
        <Input
          placeholder="****"
          type="password"
          {...props}
          bind:value={$formData.confirmPassword} />
        <Form.FieldErrors />
      {/snippet}
    </Form.Control>
  </Form.Field>
  <div id="turnstile-widget" data-size="flexible"></div>
  <Form.Button
    disabled={$submitting ||
      !$formData.email.includes('@') ||
      $formData.password.length < 8 ||
      $formData.confirmPassword.length < 8 ||
      $formData.password !== $formData.confirmPassword ||
      $formData.name.trim().length < 8 ||
      turnstileToken === ''}
    class="w-full">
    {#if $submitting}
      <Loading class="size-5 animate-[spin_1.2s_linear_infinite]" />
    {:else}
      Create Account
    {/if}
  </Form.Button>
</form>

<div class="flex flex-col gap-4 text-center text-sm text-pretty">
  <p>
    <span class="opacity-80">By clicking continue, you agree to our</span>
    <a
      data-sveltekit-preload-data="off"
      href="/support/terms-of-service"
      class="underline opacity-90">Terms of Services</a>
    <span class="opacity-80">and</span>
    <a data-sveltekit-preload-data="off" href="/support/privacy-policy" class="underline opacity-90"
      >Privacy Policy</a>
  </p>
  <p>
    <span class="opacity-80">Already have an account?</span>
    <a href="/login" class="underline opacity-90">Sign In</a>
  </p>
</div>
