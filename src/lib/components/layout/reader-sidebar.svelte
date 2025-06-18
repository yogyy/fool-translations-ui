<script lang="ts">
  import { cn } from '$lib/utils';
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

  interface Props {
    novel: {
      title: string;
      cover: string | null;
      banner: string | null;
    };
    chapters: Chapter[];
    currentChapter: number;
  }

  let { chapters, currentChapter, novel }: Props = $props();
  let order = $state<'desc' | 'asc'>('asc');

  function toggleOrder() {
    order = order === 'asc' ? 'desc' : 'asc';
  }

  let sidebarState = $state(false);
  let imageError = $state(false);
  let sortedChapters = $derived(
    [...chapters].sort((a, b) => {
      return order === 'asc' ? a.chapterNum - b.chapterNum : b.chapterNum - a.chapterNum;
    })
  );
</script>

<Dialog.Root bind:open={sidebarState}>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <button
        {...props}
        class={cn(
          buttonVariants({ size: 'icon' }),
          'bg-accent text-foreground hover:bg-foreground/10 shrink-0 rounded-full'
        )}
        onclick={(e) => {
          e.stopPropagation();
          sidebarState = !sidebarState;
        }}>
        <span class="sr-only">chapter sidebar menu</span>
        <LeftToRightListDash class="size-5" />
      </button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content
    overlayClass="bg-background/80"
    class={cn(
      'right-0 left-auto flex max-h-full min-h-svh max-w-sm translate-x-0 flex-col justify-between gap-0 p-0 sm:rounded-none',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-100 data-[state=open]:slide-in-from-right-1/2 data-[state=open]:slide-in-from-top-0!',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-100 data-[state=closed]:slide-out-to-right-1/2 data-[state=closed]:slide-out-to-top-0!'
    )}>
    <div class="max-h-[18svh] shrink-0 overflow-hidden">
      <img
        class="aspect-video w-full object-cover object-center"
        draggable="false"
        src="/default-banner.webp"
        alt={`${novel.title} Banner Example`} />
    </div>
    <div class="bg-background p-1">
      <div
        class="bg-accent text-foreground flex h-full grow items-center justify-center rounded-md px-3 py-2 text-[17px] font-semibold">
        {novel.title}
      </div>
    </div>
    <div>
      <div class="bg-accent flex items-center justify-between px-2 py-0.5">
        <p class="px-2 text-sm">{chapters.length} Chapters {order}</p>
        <Button size="icon" variant="ghost" onclick={toggleOrder} aria-label="sorting chapter">
          {#if order === 'asc'}
            <Sorting_19 class="size-4" />
          {:else}
            <Sorting_91 class="size-4" />
          {/if}
        </Button>
      </div>
      <ScrollArea class="h-[70svh] overflow-y-auto bg-slate-600">
        <ul class="bg-background h-full pt-0.5">
          {#each sortedChapters as ch}
            <li
              class={cn(
                'bg-background hover:bg-accent px-0.5',
                ch.chapterNum === currentChapter ? 'bg-accent' : ''
              )}>
              <a
                data-sveltekit-preload-data="off"
                onclick={() =>
                  toast.warning('just demo, currently not available', {
                    id: 'chapter-sidebar',
                    position: 'top-right'
                  })}
                href={`${page.url.pathname}#${ch.id}`}
                class="flex items-center gap-4 px-2.5 py-2 outline-offset-0">
                {#if novel.cover && !imageError}
                  <img
                    src={novel.cover}
                    alt={novel.title + ' cover'}
                    onerror={() => (imageError = true)}
                    class="h-16 w-16 flex-none rounded-lg object-cover object-top" />
                {:else}
                  <div class="h-16 w-16 flex-none rounded-lg bg-cyan-900"></div>
                {/if}
                <div class="flex flex-col items-start justify-center">
                  <p class="text-foreground/50 text-[13px]">Chapter {ch.chapterNum}</p>
                  <p class="text-foreground/80 text-sm leading-4 font-semibold text-pretty">
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
