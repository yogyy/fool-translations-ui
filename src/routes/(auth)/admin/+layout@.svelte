<script>
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';
  import { cn } from '$lib/utils';
  import { onDestroy, onMount } from 'svelte';

  let { data, children } = $props();

  let lastScrollY = $state(0);
  let showNav = $state(true);

  function handleScroll() {
    const currentScrollY = window.scrollY;
    showNav = currentScrollY < lastScrollY;
    lastScrollY = currentScrollY;
  }

  onMount(() => {
    if (browser) window.addEventListener('scroll', handleScroll);
  });

  onDestroy(() => {
    if (browser) window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <title>Admin Page - Fool Translations</title>
</svelte:head>

<Navbar user={data.user} />
<main class="min-h-svh overflow-hidden">
  <div
    class={cn(
      'bg-background fixed right-0 left-0 z-40 flex h-24 w-dvw transform-gpu items-end border-b transition-transform duration-300 ease-in-out',
      showNav ? '-translate-y-21' : '-translate-y-14 '
    )}>
    <div class="relative w-dvw">
      <nav
        class="mx-auto flex justify-start space-x-2 overflow-x-auto whitespace-nowrap md:container">
        <div
          class="no-scrollbar relative h-10 w-auto grow-0 scale-90 snap-x snap-mandatory items-center justify-center overflow-x-hidden scroll-smooth rounded-none bg-transparent px-1 pb-0 whitespace-nowrap md:scale-100">
          {#each ['novel', 'chapter'] as menu}
            <a
              href={`/admin/${menu}`}
              data-sveltekit-noscroll
              data-sveltekit-replacestate
              class={cn(
                ' hover:bg-muted hover:text-primary relative inline-flex h-full flex-1 snap-center items-center justify-center border-b border-transparent px-3 capitalize',
                page.url.pathname.includes(menu) ? 'text-primary' : 'text-muted-foreground'
              )}>
              <div class=" relative text-sm font-medium tracking-wide">{menu}</div>
            </a>
          {/each}
        </div>
      </nav>
    </div>
  </div>
  {@render children()}
</main>
<Footer />
