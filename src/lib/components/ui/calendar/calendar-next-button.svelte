<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';
  import ArrowRight_01 from '$lib/components/icons/arrow-right-01.svelte';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: CalendarPrimitive.NextButtonProps = $props();
</script>

{#snippet Fallback()}
  <ArrowRight_01 />
{/snippet}

<CalendarPrimitive.NextButton
  bind:ref
  class={cn(
    buttonVariants({ variant: 'outline' }),
    'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
    className
  )}
  {...restProps}
  children={children || Fallback} />
