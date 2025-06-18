<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel';
  import type { HotNovel } from '$lib/types';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context';
  import Autoplay from 'embla-carousel-autoplay';

  import { setupLazyLoadImage } from '../ui/carousel/lazy-load';

  interface Props {
    data: HotNovel[];
  }
  let { data }: Props = $props();

  let api = $state<CarouselAPI>();
  let current = $state(0);

  const plugin = Autoplay({ delay: 9500, stopOnInteraction: true });

  $effect(() => {
    if (api) {
      current = api.selectedScrollSnap() + 1;
      api.on('select', () => {
        current = api!.selectedScrollSnap() + 1;
      });

      const loadImagesInView = setupLazyLoadImage(api);

      api
        .on('init', loadImagesInView)
        .on('reInit', loadImagesInView)
        .on('slidesInView', loadImagesInView);
    }
  });
</script>

<section
  class="bg-complimentary order-3 mb-10 border-b md:order-first md:border-none md:bg-transparent">
  <div class="relative mx-auto flex aspect-[2.6] md:max-w-[90rem]">
    <div
      class="absolute flex h-auto w-full justify-between self-center text-cyan-700 dark:text-cyan-400">
      <button
        type="button"
        class="hover:bg-foreground/10 z-20 rounded-md transition-colors"
        onclick={() => api?.scrollPrev()}>
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
        class="hover:bg-foreground/10 z-20 rounded-md transition-colors"
        onclick={() => api?.scrollNext()}>
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
      <Carousel.Root
        class="embla__viewport relative overflow-hidden"
        setApi={(emblaApi) => (api = emblaApi)}
        opts={{ loop: true }}
        plugins={[plugin]}>
        <Carousel.Content>
          {#each data as hot}
            <Carousel.Item class="min-w-0 shrink-0 grow-0 basis-full pl-4">
              <div
                class="text-card-foreground rounded-xl border border-none bg-transparent shadow-none">
                <a data-sveltekit-preload-data="tap" href={`/novels/${hot.novelId.slice(4)}`}>
                  <div
                    class="relative flex h-full w-full grow items-center justify-center !border-0 p-0">
                    <span class="embla__lazy-load__spinner"></span>
                    <img
                      src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"
                      data-src={hot.image}
                      alt={`top novels ${hot.novelId.slice(4)}`}
                      class="featured-image embla__slide__img embla__lazy-load__img" />
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

<style>
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
