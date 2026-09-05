import 'server-only';
import { unstable_cache } from 'next/cache';
import { base44 } from '@/lib/base44';
import { getHomeArticles } from '@/lib/articles';
import { EDITORIAL_DESK } from '@/lib/editorial';

const AUTHOR_FIELDS = ['id','name','slug','author_page_url','avatar','bio','job_title','authority_focus','expertise_categories','same_as','entity_type','verified_real_person'];

const cachedVerifiedAuthors = unstable_cache(
  async () => {
    try {
      return await base44.entities.Author.filter(
        { verified_real_person: true, entity_type: 'person' },
        'name', 50, 0, AUTHOR_FIELDS
      );
    } catch (error) {
      console.error('[JanaVada] verified authors lookup failed:', error);
      return [];
    }
  },
  ['janavada-verified-authors-v1'],
  { revalidate: 3600, tags: ['authors'] }
);

export async function getPublicAuthors() {
  const verified = await cachedVerifiedAuthors();
  return [
    { ...EDITORIAL_DESK, urlSlug: EDITORIAL_DESK.slug },
    ...verified.map(a => ({ ...a, entityType: 'person', role: a.job_title || 'Contributor', urlSlug: a.slug })),
  ];
}

export async function getPublicAuthor(article) {
  if (article?.author_slug) {
    const verified = await cachedVerifiedAuthors();
    const match = verified.find(a => a.slug === article.author_slug);
    if (match) return { ...match, entityType: 'person', role: match.job_title || 'Contributor', urlSlug: match.slug };
  }
  return { ...EDITORIAL_DESK, urlSlug: EDITORIAL_DESK.slug };
}

export async function getAuthorBySlug(slug) {
  const authors = await getPublicAuthors();
  return authors.find(a => a.urlSlug === slug) || null;
}

export async function getAuthorArticles(author, lang = 'en', limit = 24) {
  const rows = await getHomeArticles(lang);
  if (!author || author.entityType === 'organization') return rows.slice(0, limit);
  return rows.filter(a => a.author_slug === author.urlSlug || a.author_name === author.name).slice(0, limit);
}
