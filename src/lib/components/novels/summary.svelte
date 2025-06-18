<script lang="ts">
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { cn } from '$lib/utils';
  import Badge from '../badge.svelte';
  import Pencil from '../icons/pencil.svelte';
  import Star from '../icons/star.svelte';
  import View from '../icons/view.svelte';
  import CalendarUpload from '../icons/calendar-upload.svelte';
  import CalendarDateTime from '../icons/calendar-date-time.svelte';
  import type { Novel } from '$lib/server/db/schema/novel.schema';

  interface Props {
    novel: Novel & {
      averageRating: number;
    };
    class?: string;
  }

  let { novel, class: className }: Props = $props();

  let formatedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(new Date(novel.lastUpdated!.toString().replace(' ', 'T')));

  let formatedViews = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(novel.totalViews!);

  const summary = [
    { icon: Pencil, data: novel.author, content: 'Author' },
    { icon: View, data: formatedViews, content: 'Views' },
    { icon: Star, data: novel.averageRating.toFixed(1), content: 'Rating' },
    {
      icon: CalendarUpload,
      data: new Date(novel.publishedAt!).getFullYear(),
      content: 'Year of publishing'
    },
    { icon: CalendarDateTime, data: formatedDate, content: 'Last Updated' }
  ];
</script>

<div
  class={cn(
    'bg-complimentary flex-col justify-start gap-y-2 p-4 md:mt-0 md:rounded-xl md:p-4',
    className
  )}>
  <h2
    class="text-foreground/90 text-center text-2xl font-medium text-pretty md:-mt-2 md:text-left lg:text-3xl">
    {novel.title}
  </h2>
  <div class="flex flex-row flex-wrap justify-center gap-2 md:justify-start">
    {#each summary as sum}
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger class="cursor-pointer">
            <div class="flex flex-row flex-wrap items-center gap-1">
              <sum.icon class="size-4 shrink-0 fill-none" />
              <p class="text-center text-xs font-medium opacity-90">
                {sum.data}
              </p>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content class="bg-badge text-foreground " arrowClasses="bg-badge">
            <p>{sum.content}</p>
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    {/each}
  </div>
  <div class="flex flex-row flex-wrap justify-center gap-2 md:justify-start">
    <h3 class="sr-only">genre</h3>
    {#each novel.genres ?? [] as genre}
      <button type="button">
        <Badge class="text-center text-xs font-medium opacity-80">
          {genre}
        </Badge>
      </button>
    {/each}
  </div>
</div>
