<script>
  import { buttonVariants } from './ui/button';
  import Button from './ui/button/button.svelte';
  import * as Dialog from './ui/dialog';
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Login</Dialog.Title>
      <Dialog.Description>Enter your email below to login to your account</Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">hello</div>
    <Dialog.Footer>
      Don't have an account? <a href="/register">Sign Up</a>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
