<script lang="ts">
  import { cn, slideHorizontal } from '$lib/utils';
  import Sorting_19 from '../icons/sorting-19.svelte';
  import Sorting_91 from '../icons/sorting-91.svelte';
  import { buttonVariants } from '../ui/button';
  import Button from '../ui/button/button.svelte';
  import * as Dialog from '../ui/dialog';
  import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
  import LeftToRightListDash from '../icons/left-to-right-list-dash.svelte';
  import { toast } from 'svelte-sonner';
  import { page } from '$app/state';
  import type { Chapter } from '$lib/server/db/schema/novel.schema.js';

  type Order = 'desc' | 'asc';

  interface Novel {
    title: string;
    cover: string | null;
    banner: string | null;
  }

  export let novel: Novel;
  export let currentChapter: number;
  let order: Order = 'asc';

  function toggleOrder() {
    order = order === 'asc' ? 'desc' : 'asc';
  }

  export let chapters: Chapter[] = [];
  let sidebarState: boolean = false;

  $: sortedChapters = chapters.sort((a, b) => {
    return order === 'asc' ? a.chapterNum - b.chapterNum : b.chapterNum - a.chapterNum;
  });

  let imageError = false;
</script>

<Dialog.Root bind:open={sidebarState}>
  <Dialog.Trigger asChild>
    <button
      class={cn(
        buttonVariants({ size: 'icon' }),
        'shrink-0 rounded-full bg-accent text-foreground hover:bg-foreground/10'
      )}
      on:click|stopPropagation={() => (sidebarState = !sidebarState)}>
      <LeftToRightListDash class="h-5 w-5" />
    </button>
  </Dialog.Trigger>
  <Dialog.Content
    transition={slideHorizontal}
    overlayClass="backdrop-blur-none"
    class="left-auto right-0 flex max-h-full min-h-svh max-w-sm translate-x-0 flex-col gap-0 p-0 sm:rounded-none">
    <div class="min-h-36 shrink-0 bg-cyan-700"></div>
    <div class="bg-background p-1">
      <div
        class="flex items-center justify-center rounded-md bg-accent py-2 text-[17px] font-semibold text-foreground">
        {novel.title}
      </div>
    </div>
    <div class="">
      <div class="flex items-center justify-between bg-accent px-2 py-0.5">
        <p class="px-2 text-sm">{chapters.length} Chapters</p>
        <Button size="icon" variant="ghost" on:click={toggleOrder}>
          {#if order === 'asc'}
            <Sorting_19 class="h-4 w-4" />
          {:else}
            <Sorting_91 class="h-4 w-4" />
          {/if}
        </Button>
      </div>
      <ScrollArea class="h-[77svh] overflow-y-auto bg-slate-600">
        <ul class="bg-background pt-0.5">
          {#each sortedChapters as ch}
            <li
              class={cn(
                'bg-background px-0.5 hover:bg-accent',
                ch.chapterNum === currentChapter ? 'bg-accent' : ''
              )}>
              <a
                data-sveltekit-preload-data="off"
                on:click={() =>
                  toast.error('just demo, currently not available', {
                    id: 'chapter-sidebar',
                    position: 'top-right'
                  })}
                href={`${page.url.pathname}#${ch.id}`}
                class="flex items-center gap-4 px-2.5 py-2 outline-offset-0">
                {#if novel.cover && !imageError}
                  <img
                    src={novel.cover}
                    alt={novel.title + ' cover'}
                    on:error={() => (imageError = true)}
                    class="h-16 w-16 flex-none rounded-lg object-cover object-top" />
                {:else}
                  <div class="h-16 w-16 flex-none rounded-lg bg-cyan-900"></div>
                {/if}
                <div class="flex flex-col items-start justify-center">
                  <p class="text-[13px] text-foreground/30">Chapter {ch.chapterNum}</p>
                  <p class="text-pretty text-sm font-semibold leading-4 text-foreground/80">
                    {ch.title}
                  </p>
                </div>
              </a>
            </li>
          {/each}
        </ul>
      </ScrollArea>
    </div>
  </Dialog.Content>
</Dialog.Root>
