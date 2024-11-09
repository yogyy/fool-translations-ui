<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel';
  import type { HotNovel } from '$lib/types';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context';
  import Autoplay from 'embla-carousel-autoplay';
  import { cn } from '$lib/utils';

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

<section
  aria-labelledby="featured-banners"
  class="order-3 border-b bg-complimentary md:order-first md:border-none md:bg-transparent">
  <div class="mx-auto md:max-w-[90rem]">
    <div class="my-5">
      <h2 id="featured-banners" class="sr-only">Featured Banner</h2>
      <Carousel.Root class="relative" bind:api opts={{ loop: true }} plugins={[plugin]}>
        <Carousel.Content>
          {#each data as hot}
            <Carousel.Item class="min-w-0 shrink-0 grow-0 basis-full pl-4">
              <div
                class="rounded-xl border border-none bg-transparent text-card-foreground shadow-none">
                <a href={`/novels/${hot.novelId.slice(4)}`}>
                  <div class="relative flex-grow !border-0 p-0">
                    <img
                      src={hot.image}
                      alt="top novels"
                      class="rounded-xl object-top group-hover:border-2 group-hover:border-cyan-300"
                      style="object-fit: cover; max-width: 1400px; max-height: 535px; aspect-ratio: 2.616822429906542; width: 100%;"
                      fetchpriority="high"
                      loading="eager" />
                  </div>
                </a>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
      </Carousel.Root>
      <div class="mx-auto -mb-2 mt-2 hidden h-6 w-6 justify-center md:flex">
        <div class="flex h-6 w-fit items-center gap-2">
          <button on:click={() => api.scrollPrev()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          {#each data as _, idx}
            <button
              type="button"
              on:click={() => api.scrollTo(idx)}
              class={cn(
                'h-1.5 w-1.5 rounded-full',
                current === idx + 1 ? 'bg-foreground' : 'bg-muted-foreground/40'
              )}
              aria-label={idx.toString()}></button>
          {/each}
          <button on:click={() => api.scrollNext()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="">
              <path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
