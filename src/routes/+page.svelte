<script>
  import HotSection from '$lib/components/layout/hot-section.svelte';
  import TopSection from '$lib/components/layout/top-section.svelte';

  export let data;

  const { featured } = data;
</script>

<main class="min-h-dvh overflow-hidden sm:mt-14">
  <h1 class="sr-only">
    Welcome to Fools Translations. Read the latest and most popular Korean web novels with high
    quality English translations.
  </h1>
  <div class="overflow-hidden">
    <div class="flex flex-col">
      <HotSection data={featured.hot} />
      <TopSection data={featured.top} />
    </div>
  </div>
</main>
