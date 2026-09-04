import { CATEGORIES } from '@/lib/categories';
import { getSitemapArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const revalidate = 1800;

export default async function sitemap() {
  const rows = await getSitemapArticles();
  const staticUrls = ['en', 'hi'].flatMap(lang => [
    { url: SITE_URL + '/' + lang, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    ...CATEGORIES.map(c => ({
      url: SITE_URL + '/' + lang + '/category/' + c.slug,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: .8,
    })),
  ]);

  const articleUrls = rows
    .filter(a => a.slug && a.category)
    .map(a => {
      const lang = a.language === 'hi' ? 'hi' : 'en';
      return {
        url: SITE_URL + '/' + lang + '/' + a.category + '/' + a.slug,
        lastModified: a.updated_date_custom || a.published_date || a.updated_date || new Date(),
        changeFrequency: 'daily',
        priority: .7,
      };
    });

  return [...staticUrls, ...articleUrls];
}
