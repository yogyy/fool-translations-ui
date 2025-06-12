<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel';
  import type { HotNovel } from '$lib/types';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context';
  import Autoplay from 'embla-carousel-autoplay';

  export let data: HotNovel[];
  let api: CarouselAPI;
  let count = 0;
  let current = 0;

  const plugin = Autoplay({ delay: 9500, stopOnInteraction: true });

  $: if (api) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;
    api.on('select', () => {
      current = api.selectedScrollSnap() + 1;
    });
  }
</script>

<section class="order-3 border-b bg-complimentary md:order-first md:border-none md:bg-transparent">
  <div class="relative mx-auto flex md:max-w-[90rem]">
    <div
      class="absolute flex h-auto w-full justify-between self-center text-cyan-700 dark:text-cyan-400">
      <button
        type="button"
        class="z-20 rounded-md transition-colors hover:bg-foreground/10"
        on:click={() => api.scrollPrev()}>
        <span class="sr-only">Prev</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        class="z-20 rounded-md transition-colors hover:bg-foreground/10"
        on:click={() => api.scrollNext()}>
        <span class="sr-only">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
    <div class="my-5">
      <h2 class="sr-only">Featured Banner</h2>
      <Carousel.Root class="relative" bind:api opts={{ loop: true }} plugins={[plugin]}>
        <Carousel.Content>
          {#each data as hot, idx}
            <Carousel.Item class="min-w-0 shrink-0 grow-0 basis-full pl-4">
              <div
                class="rounded-xl border border-none bg-transparent text-card-foreground shadow-none">
                <a href={`/novels/${hot.novelId.slice(4)}`}>
                  <div class="relative flex flex-grow justify-center !border-0 p-0">
                    <img
                      src={hot.image}
                      alt={`top novels ${hot.novelId.slice(4)}`}
                      class="featured-image"
                      loading={idx > 1 ? 'lazy' : 'eager'} />
                  </div>
                </a>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
      </Carousel.Root>
    </div>
  </div>
</section>

<style scoped>
  .featured-image {
    object-fit: cover;
    max-width: 1400px;
    max-height: 535px;
    aspect-ratio: 2.616822429906542;
    width: 100%;
    border-radius: 0.75rem;
    object-position: top;
  }
</style>
