<script>
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';

  let current = 'chapters';
</script>

<main class="mt-14 min-h-dvh overflow-hidden">
  <nav class="container flex justify-center space-x-2 overflow-x-auto whitespace-nowrap">
    <div
      class="no-scrollbar relative h-10 w-auto snap-x snap-mandatory items-center justify-center overflow-x-auto scroll-smooth whitespace-nowrap rounded-none bg-transparent px-1 pb-0">
      {#each ['chapters', 'announcements', 'replies'] as menu, i}
        <a
          href={`/notifications/${menu}`}
          on:click|preventDefault={() => (current = menu)}
          data-sveltekit-noscroll
          class={cn(
            ' relative inline-flex h-full flex-1 snap-center items-center justify-center border-b border-transparent px-3 capitalize hover:bg-muted hover:text-primary',
            current === menu ? 'text-primary' : 'text-muted-foreground'
          )}>
          <div
            class={cn(
              'absolute inset-0 border-b-2 border-primary/90 transition-opacity delay-100 duration-500',
              current === menu ? 'opacity-100' : 'opacity-0'
            )}>
          </div>
          <div class=" relative text-sm font-medium tracking-wide">{menu}</div>
        </a>
      {/each}
    </div>
  </nav>
  <slot></slot>
</main>

<!-- data-sveltekit-replacestate -->
