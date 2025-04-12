<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel';
  import type { Topnovel } from '$lib/types';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context';
  import Autoplay from 'embla-carousel-autoplay';
  import { cn } from '$lib/utils';
  import { setTweenFactor, tweenOpacity } from '../ui/carousel/tween-opacity';

  export let data: Topnovel[];

  let api: CarouselAPI;
  let count = 0;
  let selected = 0;

  const plugin = Autoplay({ delay: 9500, stopOnInteraction: true });

  $: if (api) {
    count = api.scrollSnapList().length;

    setTweenFactor(api);
    tweenOpacity(api);

    api.on('select', () => (selected = api.selectedScrollSnap()));
    api
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity);
  }

  function navigateOrScroll(e: MouseEvent, i: number) {
    if (i !== selected) {
      e.preventDefault();
      api.scrollTo(i);
    }
  }
</script>

<section
  aria-labelledby="top-novels"
  class="order-first bg-complimentary md:order-3 md:border-b"
  id="top-novels">
  <div class="md:p-3">
    <h2 class="sr-only">Top Novels</h2>
    <Carousel.Root
      class="relative"
      opts={{ align: 'center', loop: true }}
      bind:api
      plugins={[plugin]}
      on:mousenter={plugin.stop}
      on:mouseleave={() => plugin.play()}>
      <Carousel.Content>
        {#each data as top, i}
          <Carousel.Item
            class="h-auto min-w-0 shrink-0 grow-0 basis-[100%] py-0.5 pl-4 min-[450px]:basis-[75%] sm:basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-[25%] 2xl:basis-[20.1%]">
            <a
              on:click={(e) => navigateOrScroll(e, i)}
              data-sveltekit-preload-data="tap"
              href={`/novels/${top.id.slice(4)}`}
              class={cn('flex h-full flex-col -outline-offset-0 sm:rounded-xl')}>
              <div
                class="relative flex-grow !border-0 p-0 before:absolute before:inset-0 before:bg-gradient-to-t before:from-zinc-950/80 before:from-0% before:via-zinc-950/55 before:via-30% before:to-transparent before:to-60% before:sm:rounded-xl">
                <img
                  src={top.cover}
                  alt={top.title}
                  class="aspect-square object-cover object-top group-hover:border-2 group-hover:border-cyan-300 sm:rounded-xl"
                  style="max-width: 500px; max-height: 500px; aspect-ratio: 1; width: 100%;"
                  fetchpriority="high"
                  loading="eager" />
                <div
                  class={cn(
                    'absolute bottom-0 left-0 right-0 mb-4 flex flex-col justify-center px-2 py-1 md:px-4 md:py-2',
                    selected === i ? 'block' : 'hidden'
                  )}>
                  <div
                    class="mx-auto rounded-md px-4 py-2 sm:px-2 md:px-2 lg:px-4 xl:px-2 2xl:px-4">
                    <p
                      class="block text-center text-2xl font-bold text-white md:text-xl lg:text-lg">
                      {top.title}
                    </p>
                  </div>
                  <span
                    class="mx-auto line-clamp-3 block truncate px-6 text-left text-xs text-zinc-300 md:px-2 md:text-xs lg:text-xs">
                    {top.genres.join(', ')}
                  </span>
                </div>
                <p
                  class={cn(
                    'absolute bottom-2 right-4 px-2 py-0 text-xs leading-none',
                    selected === i ? 'block' : 'hidden'
                  )}>
                  <span class="text-white/90">{i + 1}</span>
                  <span class="text-white/90">/</span>
                  <span class="text-zinc-200/80">{count}</span>
                </p>
              </div>
            </a>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
  </div>
</section>
