import 'server-only';
import { unstable_cache } from 'next/cache';
import { base44 } from '@/lib/base44';

const published = { status: 'published' };

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
  'featured_image_caption',
  'body',
  'seo_title',
  'seo_description',
  'canonical_url',
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
  async (limit = 80) => {
    try {
      return await base44.entities.Article.filter(
        published,
        '-published_date',
        limit,
        0,
        LIST_FIELDS
      );
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
      return await base44.entities.Article.filter(
        { slug, status: 'published' },
        '-published_date',
        4,
        0,
        ARTICLE_FIELDS
      );
    } catch (error) {
      console.error('[JanaVada] Base44 article lookup failed:', error);
      return [];
    }
  },
  ['janavada-by-slug'],
  { revalidate: 3600, tags: ['articles'] }
);

const cachedCategory = unstable_cache(
  async (category, limit = 60) => {
    try {
      return await base44.entities.Article.filter(
        { category, status: 'published' },
        '-published_date',
        limit,
        0,
        LIST_FIELDS
      );
    } catch (error) {
      console.error('[JanaVada] Base44 category lookup failed:', error);
      return [];
    }
  },
  ['janavada-category'],
  { revalidate: 600, tags: ['articles'] }
);

const cachedCounterpartByGroup = unstable_cache(
  async (translationGroupId, targetLanguage) => {
    if (!translationGroupId) return null;
    try {
      const rows = await base44.entities.Article.filter(
        {
          translation_group_id: translationGroupId,
          language: targetLanguage,
          status: 'published',
        },
        '-published_date',
        1,
        0,
        COUNTERPART_FIELDS
      );
      return rows?.[0] || null;
    } catch (error) {
      console.error('[JanaVada] Base44 counterpart lookup failed:', error);
      return null;
    }
  },
  ['janavada-counterpart'],
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
    const paired = await cachedCounterpartByGroup(
      article.translation_group_id,
      target
    );
    if (paired) return paired;
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
  try {
    return await base44.entities.Article.filter(
      published,
      '-published_date',
      5000,
      0,
      SITEMAP_FIELDS
    );
  } catch (error) {
    console.error('[JanaVada] Base44 sitemap lookup failed:', error);
    return [];
  }
}
