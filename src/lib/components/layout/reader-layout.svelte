<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import BookmarkAdd from '../icons/bookmark-add.svelte';
  import ArrowUp_04 from '../icons/arrow-up-04.svelte';
  import Settings_02 from '../icons/settings-02.svelte';
  import ArrowLeft_01 from '../icons/arrow-left-01.svelte';
  import ArrowRight_01 from '../icons/arrow-right-01.svelte';
  import { fly } from 'svelte/transition';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import type { Snippet } from 'svelte';

  interface Props {
    showNav: boolean;
    isInView: boolean;
    data: { prev: string | null; next: string | null };
    children: Snippet;
    navbar: Snippet;
  }

  let { data, showNav, isInView, children, navbar }: Props = $props();

  function nextOrPrev(e: MouseEvent, url: string) {
    e.stopPropagation();
    goto(url);
  }
</script>

<div class={cn('fixed top-0 z-50 container w-dvw max-w-screen-xl')}>
  {#if showNav || !!isInView}
    <div
      in:fly={{ y: -50, duration: 400 }}
      out:fly={{ y: -50, duration: 400 }}
      class="flex h-14 items-center pt-1 md:px-4">
      {@render navbar()}
    </div>
  {/if}
</div>
{@render children()}
<div
  class={cn(
    'bottom-0 z-50 h-14 w-dvw max-w-screen-xl bg-transparent md:px-4',
    isInView ? 'sticky' : 'fixed'
  )}>
  {#if showNav || !!isInView}
    <div
      in:fly={{ y: 100, duration: 300 }}
      out:fly={{ y: 100, duration: 300 }}
      class="max-w-pgsize mx-auto flex h-full justify-end">
      <div class="mx-[1.25rem] flex min-w-72 scale-90 gap-x-2 min-[400px]:scale-100">
        <Button
          size="icon"
          onclick={(e) => {
            e.stopPropagation();
            toast.info('This feature is under development', {
              position: 'top-right',
              id: 'chapter-bookmark'
            });
          }}
          class="bg-accent text-foreground hover:bg-background rounded-full"
          variant="secondary">
          <span class="sr-only">add chapter to bookmark</span>
          <BookmarkAdd class="size-5 [&>path]:fill-red-600 [&>path]:stroke-red-600" />
        </Button>
        <Button
          size="icon"
          onclick={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          class="bg-accent text-foreground hover:bg-background rounded-full"
          variant="secondary">
          <span class="sr-only">scroll to top</span>
          <ArrowUp_04 class="size-6 [&>path]:fill-current" />
        </Button>
        <Button
          size="icon"
          onclick={(e) => {
            e.stopPropagation();
            toast.info('This feature is under development', {
              position: 'top-right',
              id: 'reader-setting'
            });
          }}
          class="bg-accent text-foreground hover:bg-background rounded-full"
          variant="secondary">
          <span class="sr-only">reader settings</span>
          <Settings_02 class="size-6 [&>g:first-child>path:first-child]:fill-current" />
        </Button>
        <div
          class="bg-background flex h-fit overflow-hidden rounded-full capitalize shadow-md shadow-cyan-400">
          <button
            type="button"
            disabled={data.prev === null}
            onclick={(e) => nextOrPrev(e, `/viewer/${data.prev?.slice(3)}`)}
            class={cn(
              buttonVariants({ variant: 'secondary' }),
              'hover:bg-background items-center gap-0 rounded-full rounded-tr-none rounded-br-none no-underline'
            )}>
            <ArrowLeft_01 class="size-5" />
            <span>prev</span>
          </button>
          <button
            type="button"
            disabled={data.next === null}
            onclick={(e) => nextOrPrev(e, `/viewer/${data.next?.slice(3)}`)}
            class={cn(
              buttonVariants({ variant: 'secondary' }),
              'hover:bg-background items-center gap-0 rounded-full rounded-tl-none rounded-bl-none no-underline'
            )}>
            <span>next</span>
            <ArrowRight_01 class="size-5" />
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
