<script lang="ts">
  import { toast } from 'svelte-sonner';
  import SearchGlass from './icons/search-01.svelte';

  let inputElement: HTMLInputElement;
</script>

<div class="group relative flex items-center overflow-hidden">
  <form
    on:submit={() =>
      toast.info('This feature is under development', {
        position: 'top-right',
        id: 'input-search'
      })}>
    <input
      class="h-8 w-36 flex-grow truncate rounded-md border bg-background py-3 pl-2 pr-6 text-sm outline-none transition-all duration-300 ease-in-out focus:border-accent group-focus-within:w-52"
      placeholder="Search"
      bind:this={inputElement} />
  </form>
  <button
    on:click={() => inputElement.focus()}
    class="absolute end-0 top-1/2 inline-flex size-4 h-8 w-8 flex-grow -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-md p-[1px] px-0 py-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:text-current focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
    <div
      class="m-0.5 inline-flex h-full w-full items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
      <SearchGlass class="h-4 w-4" />
    </div>
  </button>
</div>

<a
  href="/novels"
  class="inline-flex h-auto w-8 items-center justify-center whitespace-nowrap rounded-md px-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:hidden">
  <SearchGlass size="20" />
</a>
