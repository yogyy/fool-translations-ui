<script lang="ts">
  import Chapters from '$lib/components/novels/chapters.svelte';
  import Rate from '$lib/components/novels/rate.svelte';
  import ReleasedDay from '$lib/components/novels/released-day.svelte';
  import SubscribeAndFavorite from '$lib/components/novels/subscribe-and-favorite.svelte';
  import Summary from '$lib/components/novels/summary.svelte';
  import Synopsis from '$lib/components/novels/synopsis.svelte';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';

  export let data;

  const { novel, favorite, rating, subscribe, chapters } = data;
</script>

<svelte:head>
  <title>{novel.title} | Fool Translations</title>
</svelte:head>

<header
  class="fixed top-0 z-10 flex h-14 w-full items-center justify-between bg-transparent px-4 md:hidden">
  <a
    class={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'hover:bg-opacity-30')}
    href="/"
    aria-label="return">
    <span class="sr-only">back</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M15 6s-6 4.419-6 6s6 6 6 6"
        color="currentColor" />
    </svg>
  </a>
  <SubscribeAndFavorite {favorite} {subscribe} />
</header>
<div class="container min-h-dvh px-0 xl:max-w-pgsize">
  <div class="grid grid-cols-1 md:mx-24 md:my-2 md:flex md:flex-row md:gap-x-2 md:gap-y-0">
    <div
      class="mx-0 grid grid-cols-1 bg-complimentary md:flex md:flex-col md:items-center md:rounded-xl md:pb-8">
      <div class="relative">
        <div class="min-h-max overflow-hidden border border-border/20 md:rounded-t-xl">
          <div class="relative w-full">
            <img
              src=""
              alt={`${novel.title} Blurred Cover`}
              class="aspect-square w-full object-top opacity-80 blur-md md:aspect-[2/3] md:rounded-t-xl xl:max-w-[300px]"
              style="object-fit: cover;" />
            <div
              class="absolute inset-0 rounded-t-xl bg-gradient-to-b from-transparent via-transparent to-complimentary to-100%">
            </div>
          </div>
          <div class="absolute inset-0 mt-5 flex items-center justify-center md:-mt-10">
            <img
              src=""
              alt={`${novel.title} Cover`}
              class="aspect-[2/3] scale-50 rounded-3xl border border-zinc-700/40 shadow-sm md:scale-[77%] md:rounded-xl"
              style="object-fit: cover; max-width: 400px; max-height: 600px; aspect-ratio: 0.666667 / 1; width: 100%;" />
          </div>
        </div>
      </div>
      <div class="mb-5 flex w-full flex-col md:mb-0 md:mt-4 md:gap-y-2 md:px-14">
        <Summary {novel} class="flex items-center md:hidden" />
        <SubscribeAndFavorite {favorite} {subscribe} class="-mt-16 hidden md:flex" />
        <ReleasedDay />
        <div class="flex flex-grow justify-center">
          <a
            class="mx-auto inline-flex h-10 w-1/2 select-none items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-cyan-300/90 dark:hover:bg-cyan-300/60 md:w-full"
            href="#viewer/somenumber">Start Reading</a>
        </div>
        <Rate class="hidden md:block" data={rating} />
      </div>
    </div>
    <div class="col-span-1 flex flex-grow flex-col gap-y-2 md:max-w-[691.25px] md:gap-y-2 md:pt-0">
      <div class="hidden bg-complimentary md:block md:rounded-xl" id="banner">
        <img
          class="dark:brightness-75 md:rounded-xl"
          draggable="false"
          src="/default-banner.webp"
          alt={`${novel.title} Banner`}
          style="object-fit: cover; max-width: 900px; max-height: 350px; aspect-ratio: 2.57143 / 1; width: 100%;" />
      </div>
      <Summary {novel} class="hidden md:flex" />
      <div class="relative block md:hidden">
        <img
          class="md:rounded-xl"
          draggable="false"
          src="/default-banner.webp"
          alt={`${novel.title} Banner`}
          style="object-fit: cover; max-width: 900px; max-height: 350px; aspect-ratio: 2.57143 / 1; width: 100%;" />
        <div
          class="absolute inset-0 flex flex-col items-center justify-center gap-y-4 bg-background/60">
          <Rate class="mt-0 block md:hidden" data={rating} />
        </div>
      </div>
      <Synopsis synopsis={novel.synopsis} />
      <Chapters {chapters} />
    </div>
  </div>
</div>
