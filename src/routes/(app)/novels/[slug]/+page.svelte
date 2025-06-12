<script lang="ts">
  import ArrowLeft_01 from '$lib/components/icons/arrow-left-01.svelte';
  import FileAdd from '$lib/components/icons/file-add.svelte';
  import BookEdit from '$lib/components/icons/book-edit.svelte';
  import Chapterlist from '$lib/components/novels/chapter-list.svelte';
  import Rate from '$lib/components/novels/rate.svelte';
  import ReleasedDay from '$lib/components/novels/released-day.svelte';
  import SubscribeAndFavorite from '$lib/components/novels/subscribe-and-favorite.svelte';
  import Summary from '$lib/components/novels/summary.svelte';
  import Synopsis from '$lib/components/novels/synopsis.svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import { cn } from '$lib/utils.js';
  import * as Tooltip from '$lib/components/ui/tooltip';

  let { data } = $props();
  const { novel, favorite, rating, subscribe, chapters } = data;
</script>

<svelte:head>
  <title>{novel.title} | Fool Translations</title>
</svelte:head>

<nav
  class="fixed top-0 z-10 flex h-14 w-full transform-gpu items-center justify-between bg-transparent px-4 backdrop-blur-sm transition-transform md:hidden">
  <a
    class={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'hover:bg-opacity-30')}
    href="/"
    aria-label="return">
    <span class="sr-only">back</span>
    <ArrowLeft_01 class="h-8 w-7" />
  </a>
  <SubscribeAndFavorite {favorite} {subscribe} />
</nav>
<div class="container min-w-[300px] px-0">
  <div class="grid grid-cols-1 md:mx-12 md:my-2 md:flex md:flex-row md:gap-x-2 md:gap-y-0 lg:mx-24">
    <div
      class="mx-0 grid grid-cols-1 bg-complimentary md:flex md:w-[30%] md:flex-col md:items-center md:rounded-xl md:pb-8">
      <div class="relative w-full">
        <div class="min-h-max overflow-hidden border border-border/20 md:rounded-t-xl">
          <div class="relative w-full">
            <img
              src={novel.cover}
              alt={`${novel.title} Blurred Cover`}
              draggable="false"
              class="aspect-square w-full object-top opacity-80 blur-md md:aspect-[2/3] md:rounded-t-xl xl:max-w-[300px]"
              style="object-fit: cover;" />
            <div
              class="absolute inset-0 rounded-t-xl bg-gradient-to-b from-transparent via-transparent to-complimentary to-100%">
            </div>
          </div>
          <div class="absolute inset-0 mt-5 flex items-center justify-center md:-mt-10">
            <img
              src={novel.cover}
              alt={`${novel.title} Cover`}
              draggable="false"
              class="scale-50 rounded-3xl border border-zinc-700/40 shadow-sm md:scale-[77%] md:rounded-xl"
              style="object-fit: cover; max-width: 400px; max-height: 600px; aspect-ratio: 0.666667 / 1; width: 100%;" />
          </div>
        </div>
      </div>
      <div class="mb-5 flex w-full flex-col md:mb-0 md:mt-4 md:gap-y-2 md:px-14">
        <Summary {novel} class="flex items-center md:hidden" />
        <SubscribeAndFavorite {favorite} {subscribe} class="-mt-16 hidden md:flex" />
        <ReleasedDay />
        <div class="flex flex-grow flex-col justify-center gap-2">
          <a
            class="mx-auto inline-flex h-10 w-1/2 select-none items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-300/90 dark:hover:bg-cyan-300/60 md:w-full"
            href="#viewer/somenumber">Start Reading</a>
          {#if data.user?.type === 'admin'}
            <div class="mx-auto flex h-10 w-1/2 gap-2 md:w-full">
              <Tooltip.Root>
                <Tooltip.Trigger class="relative w-1/2 flex-1 md:w-full">
                  <a
                    href={`/admin/chapter?novelId=${novel.id}`}
                    class="mx-auto inline-flex h-10 w-full select-none items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-300/90 dark:hover:bg-cyan-300/60">
                    <span class="sr-only">Add New Chapter</span><FileAdd class="size-5" />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Content class="bg-badge px-2.5 py-2 text-foreground">
                  Add New Chapter
                </Tooltip.Content>
              </Tooltip.Root>
              <Tooltip.Root>
                <Tooltip.Trigger class="relative w-1/2 flex-1 md:w-full">
                  <a
                    href={`/admin/novel/update?novelId=${novel.id}`}
                    class="mx-auto inline-flex h-10 w-full select-none items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-300/90 dark:hover:bg-cyan-300/60">
                    <span class="sr-only">Edit Novel</span><BookEdit class="size-5" /></a>
                </Tooltip.Trigger>
                <Tooltip.Content class="bg-badge px-2.5 py-2 text-foreground">
                  Edit Novel
                </Tooltip.Content>
              </Tooltip.Root>
            </div>
          {/if}
        </div>
        <Rate class="hidden md:block" data={rating} />
      </div>
    </div>
    <div
      class="col-span-1 flex flex-grow flex-col gap-y-2 pb-10 md:max-w-[691.25px] md:gap-y-2 md:pb-0 md:pt-0">
      <div class="hidden bg-complimentary md:block md:rounded-xl" id="banner">
        <img
          class="w-full object-cover dark:brightness-75 md:rounded-xl"
          draggable="false"
          src="/default-banner.webp"
          alt={`${novel.title} Banner`}
          style="max-width: 900px; max-height: 350px; aspect-ratio: 2.57143 / 1;" />
      </div>
      <Summary {novel} class="hidden md:flex" />
      <div class="relative block md:hidden">
        <img
          class="w-full object-cover md:rounded-xl"
          draggable="false"
          src="/default-banner.webp"
          alt={`${novel.title} Banner`}
          style="max-width: 900px; max-height: 350px; aspect-ratio: 2.57143 / 1;" />
        <div
          class="absolute inset-0 flex flex-col items-center justify-center gap-y-4 bg-background/60">
          <Rate class="mt-0 block md:hidden" data={rating} />
        </div>
      </div>
      <Synopsis synopsis={novel.synopsis} />
      <Chapterlist {chapters} />
    </div>
  </div>
</div>
