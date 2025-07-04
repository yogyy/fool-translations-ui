export async function GET() {
  return new Response(
    `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
            <url>
            <loc>https://fool-translations.pages.dev</loc>
            <lastmod>2025-06-18T10:31:22.001Z</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
            </url>
            <url>
            <loc>https://fool-translations.pages.dev/novels</loc>
            <lastmod>2025-06-18T10:31:22.001Z</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
            </url>
            <url>
            <loc>https://fool-translations.pages.dev/novels/vwy5c7jn6wdhadev</loc>
            <lastmod>2025-06-18T10:31:22.001Z</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
            </url>
            <url>
            <loc>https://fool-translations.pages.dev/login</loc>
            <lastmod>2025-06-18T10:31:22.001Z</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
            </url>
            <url>
            <loc>https://fool-translations.pages.dev/register</loc>
            <lastmod>2025-06-18T10:31:22.001Z</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
            </url>
		</urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
