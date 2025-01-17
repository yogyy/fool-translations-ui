<script lang="ts">
  import { cn } from '$lib/utils.js';

  let className: string | undefined | null = undefined;
  export let href: string | undefined = undefined;
  export { className as class };
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  {href}
  class={cn(
    'text-badge-foreground hover:bg-badge/60 bg-badge/40 flex h-6 select-none flex-row items-center justify-center rounded-md border border-transparent px-2 py-0.5 text-xs font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    className
  )}
  {...$$restProps}>
  <slot />
</svelte:element>
