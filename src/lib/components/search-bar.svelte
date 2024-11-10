<script lang="ts">
  import Check from 'svelte-radix/Check.svelte';
  import CaretSort from 'svelte-radix/CaretSort.svelte';
  import { Command as CommandPrimitive } from 'cmdk-sv';
  import { tick } from 'svelte';
  import * as Command from '$lib/components/ui/command/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { cn } from '$lib/utils';
  import SearchGlass from './icons/search-glass.svelte';

  const frameworks = [
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'next.js', label: 'Next.js' },
    { value: 'nuxt.js', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' }
  ];

  let open = false;
  let value = '';

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Command.Root class="group hidden w-fit border-none md:block">
  <div class="relative flex items-center">
    <CommandPrimitive.Input
      class="h-8 w-36 flex-grow truncate rounded-md border border-opacity-20 bg-background py-3 pl-2 pr-6 text-sm outline-none transition-all duration-300 ease-in-out focus:border-accent group-focus-within:w-52"
      placeholder="Search"
      bind:value />
    <button
      class="absolute end-0 top-1/2 inline-flex size-4 h-8 w-8 flex-grow -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-md p-[1px] px-0 py-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:text-current focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
      <div
        class="inline-flex h-full w-full items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <SearchGlass size="16" />
      </div>
    </button>
  </div>
  <Command.Group
    class="absolute -top-1 h-0 w-36 overflow-hidden rounded-md border opacity-0 transition-all duration-300 ease-in-out group-focus-within:top-[50px] group-focus-within:h-max group-focus-within:w-52 group-focus-within:opacity-100">
    {#if value === ''}
      <Command.Empty class="py-1 text-foreground/70">No result found.</Command.Empty>
    {:else}
      {#each frameworks as framework}
        <Command.Item
          value={framework.value}
          onSelect={(currentValue) => {
            value = currentValue;
          }}>
          <a href={`/${framework.label}`} class="w-full">{framework.label}</a>
        </Command.Item>
      {/each}
    {/if}
  </Command.Group>
</Command.Root>
<a
  href="/novels"
  class="inline-flex h-auto w-8 items-center justify-center whitespace-nowrap rounded-md px-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:hidden">
  <SearchGlass size="20" />
</a>
