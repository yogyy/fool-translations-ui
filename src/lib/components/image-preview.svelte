<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { cn } from '$lib/utils';
  import type { HTMLImgAttributes } from 'svelte/elements';

  type $$Props = HTMLImgAttributes;

  let className: $$Props['class'] = undefined;
  let src: $$Props['src'] = undefined;
  let alt: $$Props['alt'] = undefined;

  export { className as class };
</script>

<Dialog.Root>
  <Dialog.Trigger class="inline-flex text-sm italic text-sky-400 dark:text-sky-800"
    >Preview</Dialog.Trigger>
  <Dialog.Content class="border-none p-0 outline-none">
    <Dialog.Header>
      <Dialog.Description class="flex items-center justify-center">
        <img {src} {alt} class={cn('h-auto w-full', className)} loading="lazy" {...$$restProps} />
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
