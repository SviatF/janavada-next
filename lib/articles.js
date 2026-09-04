import 'server-only';
import { unstable_cache } from 'next/cache';
import { base44 } from '@/lib/base44';

const published = { status: 'published' };

const cachedLatest = unstable_cache(
  async (limit = 80) => {
    try {
      return await base44.entities.Article.filter(published, '-published_date', limit);
    } catch (error) {
      console.error('[JanaVada] Base44 latest articles failed:', error);
      return [];
    }
  },
  ['janavada-latest'],
  { revalidate: 300, tags: ['articles'] }
);

const cachedBySlug = unstable_cache(
  async (slug) => {
    try {
      return await base44.entities.Article.filter({ slug, status: 'published' });
    } catch (error) {
      console.error('[JanaVada] Base44 article lookup failed:', error);
      return [];
    }
  },
  ['janavada-by-slug'],
  { revalidate: 3600, tags: ['articles'] }
);

const cachedCategory = unstable_cache(
  async (category, limit = 50) => {
    try {
      return await base44.entities.Article.filter(
        { category, status: 'published' },
        '-published_date',
        limit
      );
    } catch (error) {
      console.error('[JanaVada] Base44 category lookup failed:', error);
      return [];
    }
  },
  ['janavada-category'],
  { revalidate: 600, tags: ['articles'] }
);

export function languageMatch(article, lang) {
  if (lang === 'hi') {
    return article.language === 'hi' || (article.has_hindi && !article.language);
  }
  return article.language === 'en' || article.language == null;
}

export async function getHomeArticles(lang) {
  const rows = await cachedLatest(80);
  return rows.filter(a => languageMatch(a, lang));
}

export async function getArticle(slug, lang) {
  const rows = await cachedBySlug(slug);
  if (lang === 'hi') {
    return rows.find(a => a.language === 'hi') ||
      rows.find(a => a.has_hindi && !a.language) ||
      null;
  }
  return rows.find(a => a.language === 'en') ||
    rows.find(a => a.language == null) ||
    null;
}

export async function getCounterpart(article, lang) {
  if (!article) return null;
  const target = lang === 'hi' ? 'en' : 'hi';

  if (article.translation_group_id) {
    try {
      const rows = await base44.entities.Article.filter({
        translation_group_id: article.translation_group_id,
        language: target,
        status: 'published',
      });
      if (rows?.[0]) return rows[0];
    } catch {}
  }

  const rows = await cachedBySlug(article.slug);
  return rows.find(a => a.language === target) || null;
}

export async function getCategoryArticles(category, lang) {
  const rows = await cachedCategory(category, 60);
  return rows.filter(a => languageMatch(a, lang));
}

export async function getRelatedArticles(article, lang, limit = 5) {
  if (!article) return [];
  const rows = await getCategoryArticles(article.category, lang);
  return rows.filter(a => a.id !== article.id).slice(0, limit);
}

export async function getSitemapArticles() {
  return cachedLatest(5000);
}
