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
  import { cn } from '$lib/utils.js';
  import Seo from '$lib/components/SEO.svelte';

  let { data } = $props();
  const { novel, favorite, rating, subscribe, chapters } = data;
</script>

<Seo title={`${novel.title} | Fool Translations`} />

<div class="container min-w-[300px] px-0">
  <div class="grid grid-cols-1 md:mx-12 md:my-2 md:flex md:flex-row md:gap-x-2 md:gap-y-0 lg:mx-24">
    <div
      class="bg-complimentary mx-0 grid grid-cols-1 md:flex md:min-w-[30%] md:flex-col md:items-center md:rounded-xl md:pb-8">
      <div class="relative w-full">
        <div class="border-border/20 min-h-max overflow-hidden border md:rounded-t-xl">
          <div class="relative w-full">
            <img
              src={novel.cover}
              alt={`${novel.title} Blurred Cover`}
              draggable="false"
              class="aspect-square w-full object-top opacity-80 blur-md md:aspect-[2/3] md:rounded-t-xl xl:max-w-[300px]"
              style="object-fit: cover;" />
            <div
              class="to-complimentary absolute inset-0 rounded-t-xl bg-gradient-to-b from-transparent via-transparent to-100%">
            </div>
          </div>
          <div class="absolute inset-0 mt-5 flex items-center justify-center md:-mt-10">
            <img
              src={novel.cover}
              alt={`${novel.title} Cover`}
              draggable="false"
              class="scale-50 rounded-3xl border border-zinc-700/40 shadow-xs md:scale-[77%] md:rounded-xl"
              style="object-fit: cover; max-width: 400px; max-height: 600px; aspect-ratio: 0.666667 / 1; width: 100%;" />
          </div>
        </div>
      </div>
      <div class="mb-5 flex w-full flex-col md:mt-4 md:mb-0 md:gap-y-2">
        <Summary {novel} class="flex items-center md:hidden" />
        <nav
          class={cn(
            'bg-background/80 fixed top-0 z-10 flex h-14 w-full transform-gpu items-center justify-between px-4',
            'mdtransform-none md:relative md:-mt-16 md:flex md:h-auto md:justify-center md:bg-transparent md:backdrop-blur-none md:transition-none'
          )}>
          <a href="/" aria-label="return" class="hover:bg-secondary flex md:hidden">
            <span class="sr-only">back</span>
            <ArrowLeft_01 class="size-7" />
          </a>
          <SubscribeAndFavorite {favorite} {subscribe} />
        </nav>
        <!-- <SubscribeAndFavorite {favorite} {subscribe} class="-mt-16 hidden md:flex" /> -->
        <ReleasedDay />
        <div class="flex w-full grow flex-col justify-center gap-2 md:px-6 lg:px-12 xl:px-14">
          <a
            class="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mx-auto inline-flex h-10 w-1/2 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap shadow-sm transition-colors select-none focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 md:w-full dark:bg-cyan-300/90 dark:hover:bg-cyan-300/60"
            href="#viewer/somenumber">Start Reading</a>
          {#if data.user?.type === 'admin'}
            <div class="mx-auto flex h-10 w-1/2 gap-2 md:w-full">
              <div class="relative w-1/2 flex-1 md:w-full">
                <a
                  title="Add New Chapter"
                  href={`/admin/chapter?novelId=${novel.id}`}
                  class="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mx-auto inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-medium whitespace-nowrap shadow-sm transition-colors select-none focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-300/90 dark:hover:bg-cyan-300/60">
                  <FileAdd class="size-5 first:stroke-2" />
                </a>
              </div>
              <div class="relative w-1/2 flex-1 md:w-full">
                <a
                  title="Edit Novel"
                  href={`/admin/novel/update?novelId=${novel.id}`}
                  class="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mx-auto inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-medium whitespace-nowrap shadow-sm transition-colors select-none focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-300/90 dark:hover:bg-cyan-300/60">
                  <BookEdit class="size-5" /></a>
              </div>
            </div>
          {/if}
        </div>
        <Rate class="hidden md:block" data={rating} />
      </div>
    </div>
    <div
      class="col-span-1 flex grow flex-col gap-y-2 pb-10 md:max-w-[691.25px] md:gap-y-2 md:pt-0 md:pb-0">
      <div class="bg-complimentary relative md:rounded-xl" id="banner">
        <img
          class="w-full object-cover md:rounded-xl"
          draggable="false"
          src="/default-banner.webp"
          alt={`${novel.title} Banner`}
          style="max-width: 900px; max-height: 350px; aspect-ratio: 2.57143 / 1;" />
        <div
          class="dark:bg-background/50 absolute inset-0 flex flex-col items-center justify-center gap-y-4">
          <Rate class="mt-0 block md:hidden" data={rating} />
        </div>
      </div>
      <Summary {novel} class="hidden md:flex" />
      <Synopsis synopsis={novel.synopsis} />
      <Chapterlist {chapters} />
    </div>
  </div>
</div>
