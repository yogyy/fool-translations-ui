<script lang="ts">
  import Card from '$lib/components/novels/card.svelte';
  import Seo from '$lib/components/SEO.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import * as Tabs from '$lib/components/ui/tabs';

  let { data } = $props();

  let sort = $state<'popular' | 'recent' | 'views'>('popular');
  let status = $state<'all' | 'ongoing' | 'completed'>('all');
  let searchTitle = $state('');

  let sortedNovels = $derived(
    data.novels
      .filter((novel) => {
        if (status === 'all') return true;
        return novel.status === status;
      })
      .sort((a, b) => {
        if (sort === 'popular') {
          return b.popularityScore - a.popularityScore;
        } else if (sort === 'views') {
          return b.totalViews - a.totalViews;
        } else if (sort === 'recent') {
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        }
        return 0;
      })
      .filter((novel) => novel.title.toLowerCase().includes(searchTitle))
  );
</script>

<Seo title="Explore Popular Novels | Fool Translations" />

<div class="container mt-14 overflow-hidden md:mt-0">
  <div class="my-2 md:mx-12 lg:mx-20">
    <div class="mx-auto flex h-12 w-full flex-row items-center gap-2">
      <Input
        placeholder="Search"
        bind:value={searchTitle}
        class="border-border focus-visible:ring-0"
        name="title" />
    </div>
    <div class="flex w-full flex-col gap-4 min-sm:flex-row">
      <div class="items-center gap-4 sm:flex sm:flex-row">
        <div class="flex flex-col gap-y-1 sm:w-auto">
          <p class="py-1 capitalize">{sort}</p>
          <Tabs.Root bind:value={sort} id="sort">
            <Tabs.List class="gap-2">
              <Tabs.Trigger value="popular">Popular</Tabs.Trigger>
              <Tabs.Trigger value="recent">Recent</Tabs.Trigger>
              <Tabs.Trigger value="views">Views</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>
      </div>
      <div class="items-center gap-4 sm:flex sm:flex-row">
        <div class="flex flex-col gap-y-1 sm:w-auto">
          <p class="py-1 capitalize">{status}</p>
          <Tabs.Root bind:value={status} id="status">
            <Tabs.List class="gap-2">
              <Tabs.Trigger value="all">All</Tabs.Trigger>
              <Tabs.Trigger value="ongoing">Ongoing</Tabs.Trigger>
              <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>
      </div>
    </div>
    <div class="h my-4 grid grid-cols-2 gap-4 md:grid-cols-4">
      {#each sortedNovels as novel}
        <Card id={novel.id} image={novel.cover!} title={novel.title} />
      {/each}
    </div>
  </div>
</div>
