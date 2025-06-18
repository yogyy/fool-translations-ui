<script>
  import { cn } from '$lib/utils';

  /** @type {{ synopsis: string }} */
  let { synopsis } = $props();
  let show = $state(false);
</script>

<div
  class="bg-complimentary relative mx-2 rounded-xl p-4 whitespace-pre-line md:mx-0 md:rounded-lg">
  <h4 class="sr-only">Synopsis</h4>
  <p
    class={cn(
      'prose-sm prose-invert text-muted-foreground -mt-0.5 text-sm font-normal',
      show ? 'line-clamp-none' : 'line-clamp-3'
    )}>
    {synopsis}
  </p>
  {#if !show}
    <div
      class="from-complimentary pointer-events-none absolute bottom-4 left-0 h-36 w-full bg-gradient-to-t to-transparent">
    </div>
  {/if}
  <div class="relative mt-4">
    <button
      onclick={() => (show = !show)}
      class="group flex w-full cursor-pointer items-center justify-center py-2 focus:outline-none">
      <div class="absolute inset-0 flex items-center">
        <div class="border-muted-foreground/30 w-full border-t"></div>
      </div>
      <div class="bg-complimentary relative px-3">
        <span class="flex items-center text-sm font-medium text-cyan-500 dark:text-cyan-300">
          {show ? 'Show Less' : 'Show More'}
          {#if show}
            <svg viewBox="0 0 24 24" width="14" height="14" class="ml-1">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m18 15l-6-6l-6 6">
              </path>
            </svg>
          {:else}
            <svg viewBox="0 0 24 24" width="14" height="14" class="ml-1">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m6 9l6 6l6-6">
              </path>
            </svg>
          {/if}
        </span>
      </div>
    </button>
  </div>
</div>
