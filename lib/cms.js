import 'server-only';

const DEFAULT_CMS_PUBLIC_URL = 'https://janavada-cms-staging.oleg22777.workers.dev/api/public';
const configuredBase = process.env.JANAVADA_CMS_PUBLIC_URL;
const rawBase = configuredBase === 'off' ? '' : (configuredBase || DEFAULT_CMS_PUBLIC_URL);
const CMS_BASE = rawBase.replace(/\/$/, '');

function parseJson(value, fallback) {
  if (Array.isArray(value) || (value && typeof value === 'object')) return value;
  if (typeof value !== 'string' || !value) return fallback;
  try { return JSON.parse(value); } catch { return fallback; }
}

function normalizeCategory(value) {
  return String(value || 'other').trim().toLowerCase();
}

export function cmsConfigured() {
  return Boolean(CMS_BASE);
}

export function normalizeCmsArticle(row = {}) {
  return {
    ...row,
    category: normalizeCategory(row.category),
    language: String(row.language || 'en').toLowerCase(),
    sources: parseJson(row.sources, []),
    tags: parseJson(row.tags, []),
    faq: parseJson(row.faq, []),
    schema_org_faq: parseJson(row.schema_org_faq, []),
    internal_links: parseJson(row.internal_links, []),
    original_insights: parseJson(row.original_insights, []),
    secondary_keywords: parseJson(row.secondary_keywords, []),
    long_tail_keywords: parseJson(row.long_tail_keywords, []),
    corrections: parseJson(row.corrections, []),
    created_date: row.created_date || row.created_at || row.published_date || null,
    updated_date: row.updated_date || row.updated_at || row.last_refreshed_at || null,
    updated_date_custom: row.updated_date_custom || row.last_refreshed_at || row.updated_at || null,
    has_hindi: Boolean(row.translation_group_id),
    _source: 'cms',
  };
}

async function cmsFetch(path, { revalidate = 60, tags = ['cms-articles'] } = {}) {
  if (!CMS_BASE) return null;
  try {
    const res = await fetch(`${CMS_BASE}${path}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'JanaVada-Next/2.0' },
      next: { revalidate, tags },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`CMS HTTP ${res.status}`);
    const body = await res.json();
    return body?.ok ? body : null;
  } catch (error) {
    console.error('[JanaVada] CMS public API failed:', path, error);
    return null;
  }
}

export async function checkCmsConnection() {
  if (!CMS_BASE) {
    return { configured: false, reachable: false, ok: false, baseUrl: null };
  }
  const started = Date.now();
  try {
    const res = await fetch(`${CMS_BASE}/articles?limit=1`, {
      headers: { Accept: 'application/json', 'User-Agent': 'JanaVada-Next-Health/2.0' },
      cache: 'no-store',
    });
    const body = await res.json().catch(() => null);
    const sampleArticleCount = Array.isArray(body?.data) ? body.data.length : 0;
    return {
      configured: true,
      reachable: res.ok,
      ok: Boolean(res.ok && body?.ok),
      statusCode: res.status,
      latencyMs: Date.now() - started,
      sampleArticleCount,
      baseUrl: CMS_BASE,
    };
  } catch (error) {
    return {
      configured: true,
      reachable: false,
      ok: false,
      latencyMs: Date.now() - started,
      baseUrl: CMS_BASE,
      error: String(error?.message || error),
    };
  }
}

export async function getCmsArticles({ language, category, limit = 80, offset = 0 } = {}) {
  if (!CMS_BASE) return [];
  const params = new URLSearchParams();
  if (language) params.set('language', language);
  if (category) params.set('category', category);
  params.set('limit', String(Math.min(200, Math.max(1, limit))));
  params.set('offset', String(Math.max(0, offset)));
  const body = await cmsFetch(`/articles?${params.toString()}`, { revalidate: 60 });
  return Array.isArray(body?.data) ? body.data.map(normalizeCmsArticle) : [];
}

export async function getCmsArticle(slug, language = 'en') {
  if (!CMS_BASE || !slug) return null;
  const body = await cmsFetch(`/articles/${encodeURIComponent(slug)}?language=${encodeURIComponent(language)}`, { revalidate: 60 });
  return body?.data ? normalizeCmsArticle(body.data) : null;
}

export async function getCmsCounterpart(translationGroupId, language) {
  if (!CMS_BASE || !translationGroupId) return null;
  const params = new URLSearchParams({
    translation_group_id: String(translationGroupId),
    language: String(language || 'en'),
    limit: '2',
  });
  const body = await cmsFetch(`/articles?${params.toString()}`, { revalidate: 60 });
  const row = Array.isArray(body?.data) ? body.data[0] : null;
  return row ? normalizeCmsArticle(row) : null;
}

export async function getCmsTrending(language = 'en') {
  if (!CMS_BASE) return [];
  const body = await cmsFetch(`/trending?language=${encodeURIComponent(language)}`, { revalidate: 60 });
  return Array.isArray(body?.data) ? body.data.map(normalizeCmsArticle) : [];
}

export async function getCmsSitemapArticles(max = 5000) {
  if (!CMS_BASE) return [];
  const rows = [];
  let offset = 0;
  const pageSize = 200;
  while (rows.length < max) {
    const page = await getCmsArticles({ limit: Math.min(pageSize, max - rows.length), offset });
    if (!page.length) break;
    rows.push(...page);
    offset += page.length;
    if (page.length < pageSize) break;
  }
  return rows.slice(0, max);
}

export function cmsPublicBaseUrl() {
  return CMS_BASE || null;
}
