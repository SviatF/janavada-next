import { getSitemapArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const revalidate = 900;

function esc(value = '') {
  return String(value).replace(/[<>&'"]/g, c => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', "'":'&apos;', '"':'&quot;' }[c]));
}

export async function GET() {
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const rows = (await getSitemapArticles())
    .filter(a => a.published_date && new Date(a.published_date).getTime() >= cutoff)
    .slice(0, 1000);

  const body = rows.map(a => {
    const lang = a.language === 'hi' ? 'hi' : 'en';
    return `
      <url>
        <loc>${esc(SITE_URL + '/' + lang + '/' + a.category + '/' + a.slug)}</loc>
        <news:news>
          <news:publication>
            <news:name>JanaVada News</news:name>
            <news:language>${lang}</news:language>
          </news:publication>
          <news:publication_date>${esc(a.published_date)}</news:publication_date>
          <news:title>${esc(a.title)}</news:title>
        </news:news>
      </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${body}
  </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
    },
  });
}
