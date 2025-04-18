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

  interface Props {
    prev: string | null;
    next: string | null;
  }
  export let data: Props;
  export let showNav;
  export let isInView;
</script>

<div class={cn('container fixed top-0 z-50 w-dvw max-w-screen-xl')}>
  {#if showNav || !!isInView}
    <div
      in:fly={{ y: -50, duration: 400 }}
      out:fly={{ y: -50, duration: 400 }}
      class="flex h-14 items-center pt-1 md:px-4">
      <slot name="navbar"></slot>
    </div>
  {/if}
</div>
<slot></slot>
<div
  class={cn(
    'bottom-0 z-50 h-14 w-dvw max-w-screen-xl bg-transparent md:px-4',
    isInView ? 'sticky' : 'fixed'
  )}>
  {#if showNav || !!isInView}
    <div
      in:fly={{ y: 100, duration: 300 }}
      out:fly={{ y: 100, duration: 300 }}
      class="mx-auto flex h-full max-w-pgsize justify-end">
      <div class="mx-[1.25rem] flex min-w-72 scale-90 gap-x-2 min-[400px]:scale-100">
        <Button
          size="icon"
          on:click={(e) => {
            e.stopPropagation();
            toast.info('This feature is under development', {
              position: 'top-right',
              id: 'chapter-bookmark'
            });
          }}
          class="rounded-full bg-accent text-foreground hover:bg-background"
          variant="secondary">
          <BookmarkAdd class="h-5 w-5 [&>path]:fill-red-600 [&>path]:stroke-red-600" />
        </Button>
        <Button
          size="icon"
          on:click={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          class="rounded-full bg-accent text-foreground hover:bg-background"
          variant="secondary">
          <ArrowUp_04 class="h-6 w-6 [&>path]:fill-current" />
        </Button>
        <Button
          size="icon"
          on:click={(e) => {
            e.stopPropagation();
            toast.info('This feature is under development', {
              position: 'top-right',
              id: 'reader-setting'
            });
          }}
          class="rounded-full bg-accent text-foreground hover:bg-background"
          variant="secondary">
          <Settings_02 class="h-6 w-6 [&>g:first-child>path:first-child]:fill-current" />
        </Button>
        <div
          class="flex h-fit overflow-hidden rounded-full bg-background capitalize shadow-md shadow-cyan-400">
          <button
            disabled={data.prev === null}
            on:click|stopPropagation={() => goto(`/viewer/${data.prev?.slice(3)}`)}
            class={cn(
              buttonVariants({ variant: 'secondary' }),
              'items-center rounded-full rounded-br-none rounded-tr-none no-underline hover:bg-background'
            )}>
            <ArrowLeft_01 class="h-5 w-5" />
            <span>prev</span>
          </button>
          <button
            disabled={data.next === null}
            on:click|stopPropagation={() => goto(`/viewer/${data.next?.slice(3)}`)}
            class={cn(
              buttonVariants({ variant: 'secondary' }),
              'items-center rounded-full rounded-bl-none rounded-tl-none no-underline hover:bg-background'
            )}>
            <span>next</span>
            <ArrowRight_01 class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
