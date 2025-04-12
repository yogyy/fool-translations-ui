<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';
  import MoreHorizontalCircle_01 from '$lib/components/icons/more-horizontal-circle-01.svelte';

  type $$Props = HTMLAttributes<HTMLSpanElement>;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<span
  aria-hidden="true"
  class={cn('flex h-9 w-9 items-center justify-center', className)}
  {...$$restProps}>
  <MoreHorizontalCircle_01 class="h-4 w-4" />
  <span class="sr-only">More pages</span>
</span>
