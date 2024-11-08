<script lang="ts">
  import { cn } from '$lib/utils';

  export let synopsis: string;

  let showMore = false;
</script>

<div
  class="relative mx-2 whitespace-pre-line rounded-xl bg-complimentary p-4 md:mx-0 md:rounded-lg">
  <h4 class="sr-only">Synopsis</h4>
  <p
    class={cn(
      'prose-sm prose-invert -mt-0.5 text-sm font-normal text-muted-foreground',
      showMore ? 'line-clamp-none' : 'line-clamp-3'
    )}>
    {synopsis}
  </p>
  {#if !showMore}
    <div
      class="pointer-events-none absolute bottom-4 left-0 h-36 w-full bg-gradient-to-t from-complimentary to-transparent">
    </div>
  {/if}
  <div class="relative mt-4">
    <button
      on:click={() => (showMore = !showMore)}
      class="group flex w-full items-center justify-center py-2 focus:outline-none">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-muted-foreground/30"></div>
      </div>
      <div class="relative bg-complimentary px-3">
        <span class="flex items-center text-sm font-medium text-cyan-500 dark:text-cyan-300">
          {showMore ? 'Show Less' : 'Show More'}
          {#if showMore}
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
