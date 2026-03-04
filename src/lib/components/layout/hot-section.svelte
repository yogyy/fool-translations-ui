<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel';
  import type { HotNovel } from '$lib/types';
  import type { CarouselAPI } from '$lib/components/ui/carousel/context';
  import Autoplay from 'embla-carousel-autoplay';
  import { cn } from '$lib/utils';
  import DotFilled from '../icons/dot-filled.svelte';
  import PlayCircle from '../icons/play-circle.svelte';
  import StopCircle from '../icons/stop-circle.svelte';
  import Progress from '../ui/progress/progress.svelte';
  import { Tween } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  interface Props {
    data: HotNovel[];
  }
  let { data }: Props = $props();

  let api = $state<CarouselAPI>();
  let current = $state(0);
  let startAutoPlay = $state(false);
  let delay = 2500;

  const plugin = Autoplay({
    playOnInit: false,
    delay,
    stopOnInteraction: true,
    active: true
  });

  const tween = new Tween(0, { duration: 2200, easing: cubicInOut });
  let timer: ReturnType<typeof setTimeout> | null = null;

  function startProgress() {
    if (!api) return;

    const autoplay = api.plugins().autoplay;
    delay = autoplay?.options.delay ?? 2500;
    startAutoPlay = true;
    tween.set(0, { duration: 0 });

    // kasih sedikit delay supaya DOM update dulu
    requestAnimationFrame(() => {
      tween.set(100, { duration: delay, easing: (t) => t });
    });
  }

  function stopProgress() {
    tween.set(0, { duration: 0 });
  }

  $effect(() => {
    console.log(startAutoPlay);
    if (api) {
      current = api.selectedScrollSnap();
      startAutoPlay = api?.plugins().autoplay.isPlaying() || false;

      api.on('select', () => {
        current = api!.selectedScrollSnap();
        // Always reset tween and timer, regardless of startAutoPlay,
        // to ensure progress resets when changing slide selection.
        stopProgress();
        if (startAutoPlay) {
          startProgress();
        }
      });

      api.on('autoplay:play', () => {
        startProgress();
      });

      api.on('autoplay:stop', () => {
        stopProgress();
      });
    }

    return () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
  });

  function navigateOrScroll(e: MouseEvent, i: number) {
    if (i !== current) {
      e.preventDefault();
      api?.scrollTo(i);
    }
  }
</script>

<section class="bg-complimentary order-3 mb-10 md:order-first md:bg-transparent">
  <div class="relative mx-auto flex">
    <div class="mx-auto flex px-5">
      <h2 class="sr-only">Featured Banner</h2>
      <Carousel.Root
        setApi={(emblaApi) => (api = emblaApi)}
        opts={{ loop: true, align: 'center' }}
        plugins={[plugin]}
        class="">
        <Carousel.Content class="mx-auto flex max-w-4xl">
          {#each data as hot, i}
            <Carousel.Item
              class={cn(
                'aspect-square max-w-[22rem] overflow-hidden rounded-md pl-0.5 transition-[opacity] sm:basis-1/3',
                current === i ? 'opacity-100' : 'opacity-40'
              )}>
              <a
                class={cn(
                  'relative flex w-full',
                  current === i ? 'cursor-pointer' : 'cursor-default'
                )}
                onclick={(e) => navigateOrScroll(e, i)}
                href={`/novels/${hot.novelId.slice(4)}`}>
                <img src={hot.image} alt="" class="w-full object-cover object-top" />
              </a>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <Carousel.Previous
          class="bg-sky-300/5 text-sky-300"
          onclick={() => {
            api?.scrollPrev();

            if (startAutoPlay) {
              api?.plugins().autoplay.reset();
            }
          }} />
        <Carousel.Next
          class="bg-sky-300/5 text-sky-300"
          onclick={() => {
            api?.scrollNext();

            if (startAutoPlay) {
              api?.plugins().autoplay.reset();
            }
          }} />
      </Carousel.Root>
    </div>
  </div>
  <div
    class="text-muted-foreground mx-auto hidden items-center justify-center py-2 text-center text-sm lg:flex">
    {#each data as _, i}
      {#if current === i}
        <Progress class="h-1 w-10" value={tween.current} />
      {:else}
        <button
          onclick={() => {
            api?.scrollTo(i);
            if (startAutoPlay) {
              api?.plugins().autoplay.reset();
            }
          }}>
          <span class="sr-only">scroll to {i}</span>
          <DotFilled class="size-4" />
        </button>
      {/if}
    {/each}
    <!-- auto play button -->
    {#if startAutoPlay}
      <button
        class="ml-1 flex items-center justify-center rounded-full"
        onclick={() => {
          startAutoPlay = false;
          api?.plugins().autoplay.stop();
        }}>
        <span class="sr-only">stop autoplay</span>
        <StopCircle class="text-destructive" />
      </button>
    {:else}
      <button
        class="ml-1 flex items-center justify-center rounded-full"
        onclick={() => {
          api?.plugins().autoplay.play();
          startAutoPlay = true;
        }}>
        <span class="sr-only">start autoplay</span>
        <PlayCircle class="text-sky-300" />
      </button>
    {/if}
  </div>
</section>
