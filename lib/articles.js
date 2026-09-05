import 'server-only';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { base44 } from '@/lib/base44';

const published = { status: 'published' };

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function withBase44Retry(operation, label) {
  let lastError;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const status = error?.status || error?.response?.status;
      const isRateLimit = status === 429;

      if (!isRateLimit || attempt === 3) {
        console.error(`[JanaVada] Base44 ${label} failed:`, error);
        throw error;
      }

      const delay = 300 * (2 ** attempt);
      console.warn(`[JanaVada] Base44 ${label} rate-limited; retrying in ${delay}ms`);
      await sleep(delay);
    }
  }

  throw lastError;
}

const LIST_FIELDS = [
  'id',
  'title',
  'slug',
  'category',
  'language',
  'has_hindi',
  'translation_group_id',
  'translated_article_id',
  'summary',
  'subtitle',
  'author_name',
  'featured_image',
  'featured_image_alt',
  'published_date',
  'created_date',
  'reading_time',
  'views',
  'views_en',
  'views_hi',
  'is_top_story',
  'is_trending',
];

const ARTICLE_FIELDS = [
  ...LIST_FIELDS,
  'author_slug',
  'article_type',
  'featured_image_caption',
  'body',
  'seo_title',
  'seo_description',
  'canonical_url',
  'source_url',
  'sources',
  'corrections',
  'updated_date',
  'updated_date_custom',
  'what_happened',
  'why_it_matters',
  'impact_on_indians',
  'economic_impact',
  'impact_on_indian_startups',
  'impact_on_education_and_workforce',
  'challenges_and_risks',
  'bharat_nova_analysis',
  'key_takeaways',
  'faq',
  'conclusion',
  'citable_insights',
  'tags',
  'hindi_published_date',
];

const COUNTERPART_FIELDS = [
  'id',
  'title',
  'slug',
  'category',
  'language',
  'translation_group_id',
  'published_date',
];

const SITEMAP_FIELDS = [
  'id',
  'title',
  'slug',
  'category',
  'language',
  'published_date',
  'updated_date',
  'updated_date_custom',
];

const cachedLatest = unstable_cache(
  async (limit = 80) => withBase44Retry(
    () => base44.entities.Article.filter(
      published,
      '-published_date',
      limit,
      0,
      LIST_FIELDS
    ),
    'latest articles'
  ),
  ['janavada-latest-v2'],
  { revalidate: 300, tags: ['articles'] }
);

const cachedBySlug = unstable_cache(
  async (slug) => withBase44Retry(
    () => base44.entities.Article.filter(
      { slug, status: 'published' },
      '-published_date',
      4,
      0,
      ARTICLE_FIELDS
    ),
    `article lookup: ${slug}`
  ),
  ['janavada-by-slug-v2'],
  { revalidate: 3600, tags: ['articles'] }
);

const cachedCategory = unstable_cache(
  async (category, limit = 60) => withBase44Retry(
    () => base44.entities.Article.filter(
      { category, status: 'published' },
      '-published_date',
      limit,
      0,
      LIST_FIELDS
    ),
    `category lookup: ${category}`
  ),
  ['janavada-category-v2'],
  { revalidate: 600, tags: ['articles'] }
);

const cachedArticleViews = unstable_cache(
  async () => withBase44Retry(
    () => base44.entities.ArticleView.list('-view_date', 1000),
    'article views'
  ),
  ['janavada-article-views-14d-v2'],
  { revalidate: 300, tags: ['article-views'] }
);

const cachedCounterpartByGroup = unstable_cache(
  async (translationGroupId, targetLanguage) => {
    if (!translationGroupId) return null;
    const rows = await withBase44Retry(
      () => base44.entities.Article.filter(
        {
          translation_group_id: translationGroupId,
          language: targetLanguage,
          status: 'published',
        },
        '-published_date',
        1,
        0,
        COUNTERPART_FIELDS
      ),
      `counterpart lookup: ${translationGroupId}/${targetLanguage}`
    );
    return rows?.[0] || null;
  },
  ['janavada-counterpart-v2'],
  { revalidate: 3600, tags: ['articles'] }
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

export async function getTrendingArticles(lang, limit = 10) {
  const [articles, views] = await Promise.all([
    getHomeArticles(lang),
    cachedArticleViews(),
  ]);

  const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const viewsMap = {};
  for (const row of views) {
    if (!row?.article_id || !row?.view_date || row.view_date < cutoff) continue;
    viewsMap[row.article_id] = (viewsMap[row.article_id] || 0) + Number(row.count || 1);
  }

  return articles
    .map(article => {
      const views14d = viewsMap[article.id] || 0;
      const publishedAt = new Date(article.published_date || article.created_date || 0).getTime();
      const ageDays = Math.max(0, (Date.now() - publishedAt) / 86400000);
      const recencyBonus = Math.max(0, 1 - ageDays / 14);
      return {
        ...article,
        _views14d: views14d,
        _trendScore: views14d * 1000 + recencyBonus,
      };
    })
    .sort((a, b) => b._trendScore - a._trendScore)
    .slice(0, limit);
}

export const getArticle = cache(async function getArticle(slug, lang) {
  const rows = await cachedBySlug(slug);
  if (lang === 'hi') {
    return rows.find(a => a.language === 'hi') ||
      rows.find(a => a.has_hindi && !a.language) ||
      null;
  }
  return rows.find(a => a.language === 'en') ||
    rows.find(a => a.language == null) ||
    null;
});

export const getCounterpart = cache(async function getCounterpart(article, lang) {
  if (!article) return null;
  const target = lang === 'hi' ? 'en' : 'hi';

  if (article.translation_group_id) {
    const paired = await cachedCounterpartByGroup(
      article.translation_group_id,
      target
    );
    if (paired) return paired;
  }

  const rows = await cachedBySlug(article.slug);
  return rows.find(a => a.language === target) || null;
});

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
  return withBase44Retry(
    () => base44.entities.Article.filter(
      published,
      '-published_date',
      5000,
      0,
      SITEMAP_FIELDS
    ),
    'sitemap lookup'
  );
}
