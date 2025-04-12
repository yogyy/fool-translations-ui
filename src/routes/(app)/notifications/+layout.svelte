<script>
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';
  import { cn } from '$lib/utils';
  import { onDestroy, onMount } from 'svelte';

  export let data;

  let lastScrollY = 0;
  let showNav = true;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    showNav = currentScrollY < lastScrollY;
    lastScrollY = currentScrollY;
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<Navbar user={data.user} />
<main class="mt-14 min-h-dvh overflow-hidden">
  <div
    class={cn(
      'fixed left-0 right-0 z-40 w-full transform-gpu border-b bg-background transition-transform duration-300 ease-in-out',
      showNav ? 'translate-y-0' : '-translate-y-14'
    )}>
    <div class="relative w-dvw">
      <nav
        class="container mx-auto flex justify-center space-x-2 overflow-x-auto whitespace-nowrap">
        <div
          class="no-scrollbar relative h-10 w-auto grow-0 snap-x snap-mandatory items-center justify-center overflow-x-hidden scroll-smooth whitespace-nowrap rounded-none bg-transparent px-1 pb-0">
          {#each ['chapters', 'announcements', 'replies'] as menu, i}
            <a
              href={`/notifications/${menu}`}
              data-sveltekit-noscroll
              data-sveltekit-replacestate
              class={cn(
                ' relative inline-flex h-full flex-1 snap-center items-center justify-center border-b border-transparent px-3 capitalize hover:bg-muted hover:text-primary',
                $page.url.pathname.includes(menu) ? 'text-primary' : 'text-muted-foreground'
              )}>
              <div
                class={cn(
                  'absolute inset-0 border-b-2 border-primary/90 transition delay-100 duration-500',
                  $page.url.pathname.includes(menu) ? 'opacity-100' : 'opacity-0'
                )}>
              </div>
              <div class=" relative text-sm font-medium tracking-wide">{menu}</div>
            </a>
          {/each}
        </div>
      </nav>
    </div>
  </div>
  <slot></slot>
</main>
<Footer />
