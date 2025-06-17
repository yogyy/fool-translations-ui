<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import { cn, type WithoutChild } from '$lib/utils.js';
  import ArrowRight_01 from '$lib/components/icons/arrow-right-01.svelte';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: WithoutChild<DropdownMenuPrimitive.SubTriggerProps> & {
    inset?: boolean;
  } = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
  bind:ref
  class={cn(
    'data-[highlighted]:bg-accent data-[state=open]:bg-accent flex cursor-default items-center gap-2 rounded-xs px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    inset && 'pl-8',
    className
  )}
  {...restProps}>
  {@render children?.()}
  <ArrowRight_01 class="ml-auto" />
</DropdownMenuPrimitive.SubTrigger>
