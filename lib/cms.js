import 'server-only';

const DEFAULT_CMS_PUBLIC_URL = 'https://janavada-cms-staging.oleg22777.workers.dev/api/public';
const configuredBase = process.env.JANAVADA_CMS_PUBLIC_URL;
const rawBase = configuredBase === 'off' ? '' : (configuredBase || DEFAULT_CMS_PUBLIC_URL);
const CMS_BASE = rawBase.replace(/\/$/, '');
const JANA_HOSTS = new Set(['janavada.com', 'www.janavada.com']);

function parseJson(value, fallback) {
  if (Array.isArray(value) || (value && typeof value === 'object')) return value;
  if (typeof value !== 'string' || !value) return fallback;
  try { return JSON.parse(value); } catch { return fallback; }
}

function normalizeCategory(value) {
  return String(value || 'other').trim().toLowerCase();
}

function normalizeInternalHref(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  if (raw.startsWith('/') && !raw.startsWith('//')) return raw;
  try {
    const url = new URL(raw, 'https://janavada.com');
    if (!JANA_HOSTS.has(url.hostname.toLowerCase())) return null;
    return `${url.pathname}${url.search}${url.hash}` || '/';
  } catch {
    return null;
  }
}

function sanitizeArticleHtml(value = '') {
  let html = String(value || '');

  // JanaVada public articles are self-contained. Keep first-party links, but turn any
  // source/outbound anchor into plain editorial text. Source provenance remains in CMS.
  html = html.replace(
    /<a\b[^>]*?href=(['"])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi,
    (_match, _quote, href, label) => {
      const internal = normalizeInternalHref(href);
      return internal ? `<a href="${internal}" class="article-inline-link">${label}</a>` : label;
    }
  );

  const parts = html.split(/(<[^>]+>)/g);
  let insideAnchor = 0;
  return parts.map(part => {
    if (part.startsWith('<')) {
      if (/^<a\b/i.test(part)) insideAnchor += 1;
      if (/^<\/a\b/i.test(part)) insideAnchor = Math.max(0, insideAnchor - 1);
      return part;
    }
    if (insideAnchor) return part;
    return part
      .replace(/https?:\/\/[^\s<]+/gi, '')
      .replace(/\s{2,}/g, ' ');
  }).join('');
}

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeInternalLinks(rawLinks, language) {
  const links = parseJson(rawLinks, []);
  if (!Array.isArray(links)) return [];

  const seen = new Set();
  const out = [];
  for (const item of links) {
    if (!item || typeof item !== 'object') continue;
    const itemLanguage = String(item.language || item.lang || language || '').toLowerCase();
    if (language && itemLanguage && itemLanguage !== String(language).toLowerCase()) continue;

    const direct = item.url || item.href || item.live_url || item.target_url;
    const fallback = item.slug && item.category
      ? `/${itemLanguage || language || 'en'}/${normalizeCategory(item.category)}/${item.slug}`
      : '';
    const href = normalizeInternalHref(direct || fallback);
    const anchor = String(item.anchor || item.anchor_text || item.text || item.keyword || item.title || '').trim();
    if (!href || !anchor || anchor.length < 4) continue;

    const key = `${href}|${anchor.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ href, anchor });
    if (out.length >= 5) break;
  }
  return out;
}

function injectInternalLinks(html, rawLinks, language) {
  const links = normalizeInternalLinks(rawLinks, language);
  if (!links.length || !html) return html;

  const parts = String(html).split(/(<[^>]+>)/g);
  let insideAnchor = 0;
  let blockedDepth = 0;
  const linked = new Set();

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (part.startsWith('<')) {
      if (/^<a\b/i.test(part)) insideAnchor += 1;
      if (/^<\/a\b/i.test(part)) insideAnchor = Math.max(0, insideAnchor - 1);
      if (/^<(h[1-6]|script|style)\b/i.test(part)) blockedDepth += 1;
      if (/^<\/(h[1-6]|script|style)\b/i.test(part)) blockedDepth = Math.max(0, blockedDepth - 1);
      continue;
    }
    if (insideAnchor || blockedDepth || !part.trim()) continue;

    let text = part;
    for (const link of links) {
      if (linked.has(link.href)) continue;
      const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])(${escapeRegExp(link.anchor)})(?=$|[^\\p{L}\\p{N}])`, 'iu');
      if (!pattern.test(text)) continue;
      text = text.replace(pattern, (_m, before, matched) => `${before}<a href="${link.href}" class="article-inline-link">${matched}</a>`);
      linked.add(link.href);
      if (linked.size >= 4) break;
    }
    parts[index] = text;
    if (linked.size >= 4) break;
  }
  return parts.join('');
}

export function cmsConfigured() {
  return Boolean(CMS_BASE);
}

export function normalizeCmsArticle(row = {}) {
  const language = String(row.language || 'en').toLowerCase();
  const internalLinks = parseJson(row.internal_links, []);
  const safeBody = injectInternalLinks(sanitizeArticleHtml(row.body || ''), internalLinks, language);

  return {
    ...row,
    category: normalizeCategory(row.category),
    language,
    body: safeBody,
    // Editorial provenance is retained in CMS, but source URLs are not exposed as reader-facing
    // outbound links. JanaVada pages should stand on their own analysis and first-party graph.
    sources: [],
    source_url: null,
    tags: parseJson(row.tags, []),
    faq: parseJson(row.faq, []),
    schema_org_faq: parseJson(row.schema_org_faq, []),
    internal_links: internalLinks,
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
