import { CATEGORIES } from '@/lib/categories';
import { getSitemapArticles } from '@/lib/articles';
import { getPublicAuthors } from '@/lib/authors';
import { SITE_URL } from '@/lib/site';

export const revalidate = 1800;

export default async function sitemap() {
  const [rows, authors] = await Promise.all([getSitemapArticles(), getPublicAuthors()]);
  const trustPages = ['about', 'editorial-policy', 'fact-checking-policy', 'corrections-policy', 'ethics-policy', 'authors', 'contact', 'privacy', 'terms'];
  const staticUrls = ['en', 'hi'].flatMap(lang => [
    { url: SITE_URL + '/' + lang, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    ...CATEGORIES.map(c => ({
      url: SITE_URL + '/' + lang + '/category/' + c.slug,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: .8,
    })),
    ...trustPages.map(page => ({ url: SITE_URL + '/' + lang + '/' + page, lastModified: new Date(), changeFrequency: 'monthly', priority: .6 })),
    ...authors.map(author => ({ url: SITE_URL + '/' + lang + '/author/' + author.urlSlug, lastModified: new Date(), changeFrequency: 'weekly', priority: .6 })),
  ]);

  const articleUrls = rows
    .filter(a => a.slug && a.category)
    .map(a => {
      const lang = a.language === 'hi' ? 'hi' : 'en';
      return {
        url: SITE_URL + '/' + lang + '/' + a.category + '/' + a.slug,
        lastModified: a.updated_date_custom || a.published_date || new Date(),
        changeFrequency: 'daily',
        priority: .7,
      };
    });

  return [...staticUrls, ...articleUrls];
}
