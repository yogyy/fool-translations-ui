<script lang="ts">
  import ReaderLayout from '$lib/components/layout/reader-layout.svelte';
  import ReaderSidebar from '$lib/components/layout/reader-sidebar.svelte';
  import { buttonVariants } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils.js';
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { inview } from 'svelte-inview';
  import type { ObserverEventDetails, Options } from 'svelte-inview';
  import { goto } from '$app/navigation';
  import ArrowLeft_02 from '$lib/components/icons/arrow-left-02.svelte';

  let { data } = $props();

  const paragraphs = data.content.split(/\n\s*\n/).map((p) => p.trim());

  let lastScrollY = $state(0);
  let showNav = $state(true);

  let isInView = $state(true);
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

<main class="mt-14 min-h-svh overflow-hidden">
  <div
    class="relative z-0 cursor-default select-none focus:outline-none"
    onclick={() => (showNav = !showNav)}
    role="button"
    tabindex="0"
    onkeypress={undefined}>
    <div class="relative container flex flex-col items-center justify-center md:max-w-screen-lg">
      <ReaderLayout {data} {showNav} {isInView}>
        {#snippet navbar()}
          <div class="flex w-full scale-90 gap-3 min-[400px]:scale-100 md:justify-between">
            <button
              onclick={(e) => {
                e.stopPropagation();
                goto(`/novels/${data.novel.id.slice(4)}`);
              }}
              class={cn(
                buttonVariants({ size: 'icon' }),
                'bg-accent text-foreground hover:bg-foreground/10 shrink-0 rounded-full'
              )}>
              <span class="sr-only">go back to novel page</span>
              <ArrowLeft_02 class="size-5" />
            </button>
            <div class="flex min-w-0 grow justify-center">
              <div class="flex w-full flex-col items-center gap-1">
                <button
                  onclick={(e) => e.stopPropagation()}
                  class={cn(
                    buttonVariants({ variant: 'secondary' }),
                    'overflow-hidden rounded-full shadow-md shadow-cyan-400 hover:bg-[#191C1D]'
                  )}>
                  <p class="overflow-hidden text-xs leading-none font-medium text-wrap sm:text-sm">
                    <span class="opacity-80">Chapter {data.chapter.chapterNum}:</span>
                    <span>{data.chapter.title}</span>
                  </p>
                </button>
              </div>
            </div>
            <ReaderSidebar
              chapters={data.chapters}
              novel={data.novel}
              currentChapter={data.chapter.chapterNum} />
          </div>
        {/snippet}

        <div class="content prose max-w-pgsize dark:prose-invert scroll-smooth">
          {#each paragraphs as par}
            <p class={cn('', par.startsWith('"') ? 'dialogue' : 'narration')}>{par}</p>
          {/each}
        </div>
        <div use:inview={options} oninview_change={handleChange}></div>
      </ReaderLayout>
    </div>
  </div>
</main>
