<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';
  import ArrowLeft_01 from '$lib/components/icons/arrow-left-01.svelte';

  type $$Props = CalendarPrimitive.PrevButtonProps;
  type $$Events = CalendarPrimitive.PrevButtonEvents;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<CalendarPrimitive.PrevButton
  on:click
  class={cn(
    buttonVariants({ variant: 'outline' }),
    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
    className
  )}
  {...$$restProps}
  let:builder>
  <slot {builder}>
    <ArrowLeft_01 class="h-4 w-4" />
  </slot>
</CalendarPrimitive.PrevButton>
