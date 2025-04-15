<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { superForm, type FormResult } from 'sveltekit-superforms';
  import Input from '$lib/components/ui/input/input.svelte';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { loginSchema } from '../schema';
  import type { ActionData } from './$types.js';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import { cn } from '$lib/utils';
  import { buttonVariants } from '$lib/components/ui/button';
  import Loading from '$lib/components/icons/loading.svelte';

  export let data;

  const form = superForm(data.form, {
    dataType: 'json',
    validators: zodClient(loginSchema),
    onUpdate({ result }) {
      const { signin } = result.data as FormResult<ActionData>;

      if (signin?.success === false) {
        toast.error(signin?.error);
      } else {
        toast.info('Login successful! Welcome back.');
        goto('/');
      }
    }
  });
  const { form: formData, enhance, submitting } = form;

  let oauthLoading = false;
  let selectedProvider: 'discord' | 'google' | null = null;
</script>

<svelte:head><title>Login | Fool Translations</title></svelte:head>

<form method="POST" use:enhance class="w-full space-y-2">
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input type="email" {...attrs} bind:value={$formData.email} />
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
  <Form.Button disabled={$submitting} class="w-full">
    {#if $submitting}
      <Loading class="h-5 w-5 animate-[spin_1.2s_linear_infinite]" />
    {:else}
      Sign in
    {/if}
  </Form.Button>
</form>
<div class="flex w-full items-center">
  <span class="grow border-b"></span>
  <p class="mx-2 grow-0 text-[0.75rem] font-light uppercase opacity-80">or continue with</p>
  <span class="grow border-b"></span>
</div>

<div class="flex flex-col gap-4 font-medium">
  <a
    href="/login/discord"
    on:click={() => {
      selectedProvider = 'discord';
      oauthLoading = true;
    }}
    class:is-disabled={oauthLoading || $submitting}
    class={cn(
      buttonVariants({ variant: 'default' }),
      'flex w-full items-center gap-2 bg-[#5865F2] text-foreground hover:bg-[#5865F2]/80'
    )}>
    {#if selectedProvider === 'discord'}
      <Loading class="h-5 w-5 animate-[spin_1.2s_linear_infinite]" />
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0a13 13 0 0 0-.617-1.25a.08.08 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.1.1 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.08.08 0 0 0 .084-.028a14 14 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13 13 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10 10 0 0 0 .372-.292a.07.07 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .078.01q.181.149.373.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028a19.8 19.8 0 0 0 6.002-3.03a.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03M8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418" /></svg>
    {/if}
    <span>Discord</span>
  </a>
  <a
    href="/login/google"
    on:click={() => {
      selectedProvider = 'google';
      oauthLoading = true;
    }}
    class:is-disabled={oauthLoading || $submitting}
    class={cn(
      buttonVariants({ variant: 'default' }),
      'flex w-full items-center gap-2 bg-[#D0463B] text-foreground hover:bg-[#D0463B]/80'
    )}>
    {#if selectedProvider === 'google'}
      <Loading class="h-5 w-5 animate-[spin_1.2s_linear_infinite]" />
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M11.956 10.356v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.28 5.28 0 0 1 0-10.559a5.166 5.166 0 0 1 3.29 1.178l2.6-2.6a8.93 8.93 0 1 0-5.89 15.635c4.467 0 8.529-3.249 8.529-8.934a7.468 7.468 0 0 0-.2-1.625l-8.329.001Z" /></svg>
    {/if}
    <span>Google</span>
  </a>
</div>

<div class="flex flex-col gap-4 text-center text-sm">
  <p class="opacity-80">
    Don't have an account?
    <a href="/register" class="underline opacity-90">Sign Up</a>
  </p>

  <a href="/auth/forgot-password" class="underline opacity-90">Forgot Password?</a>
</div>

<style>
  .is-disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
