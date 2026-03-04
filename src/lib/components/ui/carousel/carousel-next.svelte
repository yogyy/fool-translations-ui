<script lang="ts">
  import type { WithoutChildren } from 'bits-ui';
  import { getEmblaContext } from './context.js';
  import { cn } from '$lib/utils.js';
  import { Button, type Props } from '$lib/components/ui/button/index.js';
  import ArrowRight01 from '$lib/components/icons/arrow-right-01.svelte';

  let {
    ref = $bindable(null),
    class: className,
    variant = 'outline',
    size = 'icon',
    ...restProps
  }: WithoutChildren<Props> = $props();

  const emblaCtx = getEmblaContext('<Carousel.Next/>');
</script>

<Button
  {variant}
  {size}
  class={cn(
    'absolute size-8 touch-manipulation rounded-full',
    emblaCtx.orientation === 'horizontal'
      ? 'top-1/2 -right-12 -translate-y-1/2'
      : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
    className
  )}
  disabled={!emblaCtx.canScrollNext}
  onclick={emblaCtx.scrollNext}
  onkeydown={emblaCtx.handleKeyDown}
  bind:ref
  {...restProps}>
  <ArrowRight01 />
  <span class="sr-only">Next slide</span>
</Button>
