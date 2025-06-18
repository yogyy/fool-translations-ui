<script lang="ts">
  import { toast } from 'svelte-sonner';
  import SearchGlass from './icons/search-01.svelte';

  let inputElement = $state<HTMLInputElement>();
</script>

<div class="group relative hidden items-center overflow-hidden md:flex">
  <form
    onsubmit={() =>
      toast.info('This feature is under development', {
        position: 'top-right',
        id: 'input-search'
      })}>
    <input
      name="title"
      placeholder="Search"
      class="bg-background focus:border-accent h-8 w-36 grow truncate rounded-md border py-3 pr-6 pl-2 text-sm outline-hidden transition-all duration-300 ease-in-out group-focus-within:w-52"
      bind:this={inputElement} />
  </form>
  <button
    onclick={() => inputElement?.focus()}
    aria-label="search-bar"
    class="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring absolute end-0 top-1/2 inline-flex size-4 h-8 w-8 grow -translate-y-1/2 items-center justify-center rounded-md p-[1px] px-0 py-0 text-xs font-medium whitespace-nowrap transition-colors focus-visible:bg-transparent focus-visible:text-current focus-visible:ring-1 focus-visible:outline-none">
    <div
      class="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring m-0.5 inline-flex h-full w-full items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50">
      <SearchGlass class="size-4" />
    </div>
  </button>
</div>

<a
  href="/novels"
  class="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-auto w-8 items-center justify-center rounded-md px-0 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-hidden md:hidden">
  <span class="sr-only">go to search page</span>
  <SearchGlass class="size-4" />
</a>
