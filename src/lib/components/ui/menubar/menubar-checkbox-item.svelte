<script lang="ts">
  import { Menubar as MenubarPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
  import { cn } from '$lib/utils.js';
  import type { Snippet } from 'svelte';
  import Check from '$lib/components/icons/check.svelte';
  import Minus from '$lib/components/icons/minus.svelte';

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChildrenOrChild<MenubarPrimitive.CheckboxItemProps> & {
    children?: Snippet;
  } = $props();
</script>

<MenubarPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  class={cn(
    'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    className
  )}
  {...restProps}>
  {#snippet children({ checked, indeterminate })}
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      {#if indeterminate}
        <Minus class="size-4" />
      {:else}
        <Check class={cn('size-4', !checked && 'text-transparent')} />
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</MenubarPrimitive.CheckboxItem>
