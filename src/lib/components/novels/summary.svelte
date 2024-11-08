<script lang="ts">
  import type { Novel } from '$lib/types';
  import { cn } from '$lib/utils';
  import Badge from '../badge.svelte';
  import Clock from '../icons/clock.svelte';
  import Pencil from '../icons/pencil.svelte';
  import Star from '../icons/star.svelte';
  import View from '../icons/view.svelte';
  export let novel: Novel;

  $: formatedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(new Date(novel.last_updated.replace(' ', 'T')));
  $: formatedViews = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(novel.totalViews);

  const summary = [
    { icon: Pencil, content: novel.author },
    { icon: View, content: 'view' },
    { icon: Star, content: novel.average_rating.toFixed(1) },
    { icon: Clock, content: 'date' }
  ];

  let className: string = $$props.class;

  export { className as class };
</script>

<div
  class={cn(
    'flex-col justify-start gap-y-2 bg-complimentary p-4 md:mt-0 md:rounded-xl md:p-4',
    className
  )}>
  <h2 class="text-2xl font-medium leading-none text-foreground/90 md:-mt-2 md:text-3xl">
    {novel.title}
  </h2>
  <div class="flex flex-row items-center justify-start gap-x-2">
    {#each summary as { content, icon }}
      <button>
        <div class="flex flex-row items-center gap-x-1">
          <svelte:component this={icon} size="16" />
          <p class="text-center text-xs font-medium opacity-90">
            {#if content === 'view'}
              {formatedViews}
            {:else if content === 'date'}
              {formatedDate}
            {:else}
              {content}
            {/if}
          </p>
        </div>
      </button>
    {/each}
  </div>
  <div class="flex flex-row flex-wrap justify-center gap-2 md:justify-start">
    <h3 class="sr-only">genre</h3>
    {#each novel.genres as genre}
      <button>
        <Badge class="text-center text-xs font-medium opacity-80">
          {genre}
        </Badge>
      </button>
    {/each}
  </div>
</div>
