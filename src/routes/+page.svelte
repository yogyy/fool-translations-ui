<script>
  import Footer from '$lib/components/footer.svelte';
  import HotSection from '$lib/components/layout/hot-section.svelte';
  import TopSection from '$lib/components/layout/top-section.svelte';
  import Navbar from '$lib/components/navbar.svelte';
  import Seo from '$lib/components/SEO.svelte';

  let { data } = $props();
</script>

<Seo title="Fool Translations" />
<Navbar user={data.user} />
<main class="mt-14 min-h-svh overflow-hidden">
  <h1 class="sr-only">
    Welcome to Fool Translations. Read the latest and most popular Korean and Chinese web novels
    with high quality English translations.
  </h1>
  <div class="overflow-hidden">
    <div class="flex flex-col">
      <HotSection data={data.featured.hot} />
      <TopSection data={data.featured.top} />
    </div>
    <!-- <pre>{JSON.stringify(featured.top, null, 4)}</pre> -->
  </div>
</main>
<Footer />
