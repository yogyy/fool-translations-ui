<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { cn } from '$lib/utils';
  import type { HTMLImgAttributes } from 'svelte/elements';

  let { src, alt, class: className, ...rest }: HTMLImgAttributes = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger class="inline-flex text-sm text-sky-400 italic dark:text-sky-800" type="button"
    >Preview</Dialog.Trigger>
  <Dialog.Content class="border-none p-0 outline-none">
    <Dialog.Header>
      <Dialog.Description class="flex items-center justify-center">
        <img {src} {alt} class={cn('h-auto w-full', className)} loading="lazy" {...rest} />
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
