<script>
  import { page } from '$app/state';

  let {
    title,
    description = 'Read your favorite web novels online with our fast, clean, and user-friendly web novel reader. Discover trending stories, bookmark chapters, and enjoy a seamless reading experience.'
  } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta
    name="keywords"
    content="web novel, web novel reader, light novel, online novels, free novels, read novels online" />
  <meta name="author" content="yogyy" />
  <meta name="theme-color" content="#181A1B" />

  <meta property="og_site_name" content="fool-translations.pages.dev" />
  <meta
    property="og:url"
    content="https://fool-translations.pages.dev{page.url.pathname.toString()}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="/static/default-banner.webp" />
</svelte:head>
