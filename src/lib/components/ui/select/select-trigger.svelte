<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  type $$Props = SelectPrimitive.TriggerProps;
  type $$Events = SelectPrimitive.TriggerEvents;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<SelectPrimitive.Trigger
  class={cn(
    'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-destructive [&>span]:line-clamp-1 data-[placeholder]:[&>span]:text-muted-foreground',
    className
  )}
  {...$$restProps}>
  <slot />
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      class="h-4 w-4 opacity-50">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0M8 7s2.946-4 4-4s4 4 4 4m0 10s-2.946 4-4 4s-4-4-4-4"
        color="currentColor" /></svg>
  </div>
</SelectPrimitive.Trigger>
