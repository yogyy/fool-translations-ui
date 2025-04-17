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
      'fixed left-0 right-0 z-40 flex h-24 w-dvw transform-gpu items-end border-b bg-background transition-transform duration-300 ease-in-out',
      showNav ? '-translate-y-21' : '-translate-y-14 '
    )}>
    <div class="relative w-dvw">
      <nav
        class="mx-auto flex justify-start space-x-2 overflow-x-auto whitespace-nowrap md:container">
        <div
          class="no-scrollbar relative h-10 w-auto grow-0 scale-90 snap-x snap-mandatory items-center justify-center overflow-x-hidden scroll-smooth whitespace-nowrap rounded-none bg-transparent px-1 pb-0 md:scale-100">
          {#each ['novel', 'chapter'] as menu}
            <a
              href={`/admin/${menu}`}
              data-sveltekit-noscroll
              data-sveltekit-replacestate
              class={cn(
                ' relative inline-flex h-full flex-1 snap-center items-center justify-center border-b border-transparent px-3 capitalize hover:bg-muted hover:text-primary',
                $page.url.pathname.includes(menu) ? 'text-primary' : 'text-muted-foreground'
              )}>
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
