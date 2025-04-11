<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import { onDestroy, onMount } from 'svelte';
  import BookmarkAdd from '../icons/bookmark-add.svelte';
  import ArrowUp_04 from '../icons/arrow-up-04.svelte';
  import Settings_02 from '../icons/settings-02.svelte';
  import ArrowLeft_01 from '../icons/arrow-left-01.svelte';
  import ArrowRight_01 from '../icons/arrow-right-01.svelte';
  import { fly } from 'svelte/transition';

  interface Props {
    prev: string | null;
    next: string | null;
  }
  export let data: Props;
  export let showNav;
  export let isInView;
</script>

<div
  class={cn(
    'container fixed top-0 z-50 flex h-14 w-dvw max-w-screen-xl items-center px-4 pt-1 transition duration-300',
    showNav ? 'bg-background/80 backdrop-blur-sm' : 'bg-transparent'
  )}>
  {#if showNav || !!isInView}
    <slot name="navbar"></slot>
  {/if}
</div>
<slot></slot>
<div
  class={cn(
    'bottom-0 z-50 h-14 w-dvw max-w-screen-xl bg-transparent px-4',
    isInView ? 'sticky' : 'fixed'
  )}>
  {#if showNav || !!isInView}
    <div
      in:fly={{ y: 100, duration: 300 }}
      out:fly={{ y: 100, duration: 300 }}
      class="mx-auto flex h-full max-w-pgsize justify-end">
      <div class="mx-[1.25rem] flex min-w-72 gap-x-2">
        <Button
          size="icon"
          on:click={(e) => e.stopPropagation()}
          class="rounded-full bg-accent text-foreground hover:bg-background"
          variant="secondary">
          <BookmarkAdd class="h-5 w-5 [&>path]:fill-red-600 [&>path]:stroke-red-600" />
        </Button>
        <Button
          size="icon"
          on:click={(e) => e.stopPropagation()}
          class="rounded-full bg-accent text-foreground hover:bg-background"
          variant="secondary">
          <ArrowUp_04 class="h-6 w-6 [&>path]:fill-current" />
        </Button>
        <Button
          size="icon"
          on:click={(e) => e.stopPropagation()}
          class="rounded-full bg-accent text-foreground hover:bg-background"
          variant="secondary">
          <Settings_02 class="h-6 w-6 [&>g:first-child>path:first-child]:fill-current" />
        </Button>
        <div class="flex capitalize">
          <a
            href={data.prev ? `/viewer/${data.prev.slice(3)}` : null}
            class={cn(
              buttonVariants({ variant: 'secondary' }),
              'items-center rounded-full rounded-br-none rounded-tr-none no-underline shadow-none hover:bg-background'
            )}>
            <ArrowLeft_01 class="h-5 w-5" />
            <span>prev</span>
          </a>
          <a
            href={data.next ? `/viewer/${data.next.slice(3)}` : null}
            class={cn(
              buttonVariants({ variant: 'secondary' }),
              'items-center rounded-full rounded-bl-none rounded-tl-none no-underline shadow-none hover:bg-background'
            )}>
            <span>next</span>
            <ArrowRight_01 class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>
