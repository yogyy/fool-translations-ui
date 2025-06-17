<script lang="ts">
  import { Accordion as AccordionPrimitive, type WithoutChild } from 'bits-ui';
  import { cn } from '$lib/utils.js';
  import ArrowDown_01 from '$lib/components/icons/arrow-down-01.svelte';

  let {
    ref = $bindable(null),
    class: className,
    level = 3,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.TriggerProps> & {
    level?: AccordionPrimitive.HeaderProps['level'];
  } = $props();
</script>

<AccordionPrimitive.Header {level} class="flex">
  <AccordionPrimitive.Trigger
    bind:ref
    class={cn(
      'flex flex-1 cursor-pointer items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
      className
    )}
    {...restProps}>
    {@render children?.()}
    <ArrowDown_01 class="text-muted-foreground size-4 shrink-0 transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
