<script lang="ts">
  import ReaderLayout from '$lib/components/layout/reader-layout.svelte';
  import ReaderSidebar from '$lib/components/layout/reader-sidebar.svelte';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';
  import ArrowLeft from 'svelte-radix/ArrowLeft.svelte';
  import { fly } from 'svelte/transition';
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { inview } from 'svelte-inview';
  import type { ObserverEventDetails, Options } from 'svelte-inview';
  import { goto } from '$app/navigation';

  export let data;

  let paragraphs = data.content.split(/\n\s*\n/).map((p) => p.trim());

  let lastScrollY = 0;
  let showNav = true;

  let isInView: boolean;
  const options: Options = { rootMargin: '150px' };

  const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
    isInView = detail.inView;
  };

  function handleScroll() {
    const currentScrollY = window.scrollY;
    showNav = currentScrollY < lastScrollY;
    lastScrollY = currentScrollY;
  }

  onMount(() => {
    if (browser) {
      lastScrollY = window.scrollY;
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<svelte:head>
  <title>{data.novel.title} Chapter {data.chapter.chapterNum}</title>
</svelte:head>

<main class="mt-14 min-h-dvh overflow-hidden px-4 md:px-0">
  <div
    class="relative z-0 min-h-[90dvh] cursor-default select-none focus:outline-none"
    on:click={() => (showNav = !showNav)}
    role="button"
    tabindex="0"
    on:keypress>
    <div
      class="container prose relative flex flex-col items-center justify-center px-4 dark:prose-invert md:max-w-screen-lg">
      <ReaderLayout {data} {showNav} {isInView}>
        <div
          in:fly={{ y: -100, duration: 300 }}
          out:fly={{ y: -100, duration: 300 }}
          slot="navbar"
          class="flex w-full scale-90 gap-3 min-[400px]:scale-100 md:justify-between">
          <button
            on:click|stopPropagation={() => goto(`/novels/${data.novel.id.slice(4)}`)}
            class={cn(
              buttonVariants({ size: 'icon' }),
              'shrink-0 rounded-full bg-accent text-foreground hover:bg-foreground/10'
            )}>
            <ArrowLeft size="20" />
          </button>
          <div class="flex min-w-0 grow justify-center">
            <div class="flex w-full flex-col items-center gap-1">
              <button
                on:click|stopPropagation
                class={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'overflow-hidden rounded-full shadow-accent hover:bg-[#191C1D]'
                )}>
                <p class="overflow-hidden text-wrap text-xs font-medium leading-none sm:text-sm">
                  <span class="opacity-80">Chapter {data.chapter.chapterNum}:</span>
                  <span>{data.chapter.title} Lorem, ipsum dolor.</span>
                </p>
              </button>
            </div>
          </div>
          <ReaderSidebar novel={data.novel} currentChapter={data.chapter.chapterNum} />
        </div>
        <div class="content max-w-pgsize">
          {#each paragraphs as par}
            <p class={cn('', par.startsWith('"') ? 'dialogue' : 'narration')}>{par}</p>
          {/each}
        </div>
        <div use:inview={options} on:inview_change={handleChange}></div>
      </ReaderLayout>
    </div>
  </div>
</main>
