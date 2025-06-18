<script lang="ts">
  import { cn } from '$lib/utils.js';
  import type { WithElementRef } from 'bits-ui';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  let {
    ref = $bindable(),
    href,
    class: className,
    children,
    ...rest
  }: WithElementRef<HTMLAnchorAttributes> = $props();
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  bind:this={ref}
  {href}
  class={cn(
    'text-badge-foreground bg-badge/40 hover:bg-badge/60 focus:ring-ring flex h-6 flex-row items-center justify-center rounded-md border border-transparent px-2 py-0.5 text-xs font-semibold shadow-sm transition-colors select-none focus:ring-2 focus:ring-offset-2 focus:outline-none',
    className
  )}
  {...rest}>
  {@render children?.()}
</svelte:element>
