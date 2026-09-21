import { NextResponse } from 'next/server';
import { getArticle, getCounterpart } from '@/lib/articles';

const NON_ARTICLE_SEGMENTS = new Set([
  'category',
  'author',
  'authors',
  'search',
  'about',
  'contact',
  'privacy',
  'terms',
  'editorial-policy',
  'ethics-policy',
  'fact-checking-policy',
  'corrections-policy',
]);

function switchLanguage(pathname, target) {
  const parts = String(pathname || '/').split('/');
  if (parts[1] === 'en' || parts[1] === 'hi') parts[1] = target;
  else parts.splice(1, 0, target);
  return parts.join('/') || '/' + target;
}

export async function GET(request) {
  const url = new URL(request.url);
  const pathname = url.searchParams.get('path') || '/';
  const target = url.searchParams.get('target');

  if (target !== 'en' && target !== 'hi') {
    return NextResponse.json({ ok: false, error: 'Invalid target language' }, { status: 400 });
  }

  const fallback = switchLanguage(pathname, target);
  const parts = pathname.split('/').filter(Boolean);
  const currentLang = parts[0];
  const category = parts[1];
  const slug = parts[2];
  const looksLikeArticle =
    parts.length === 3 &&
    (currentLang === 'en' || currentLang === 'hi') &&
    category &&
    slug &&
    !NON_ARTICLE_SEGMENTS.has(category);

  if (!looksLikeArticle) {
    return NextResponse.json({ ok: true, href: fallback, resolved: 'path_swap' });
  }

  try {
    const article = await getArticle(slug, currentLang);
    if (!article || article.category !== category) {
      return NextResponse.json({ ok: true, href: '/' + target, resolved: 'target_home' });
    }

    const counterpart = await getCounterpart(article, currentLang);
    if (!counterpart) {
      return NextResponse.json({ ok: true, href: '/' + target, resolved: 'target_home_no_counterpart' });
    }

    return NextResponse.json({
      ok: true,
      href: '/' + target + '/' + counterpart.category + '/' + counterpart.slug,
      resolved: 'article_counterpart',
    });
  } catch (error) {
    console.error('[JanaVada] language switch resolver failed:', error);
    return NextResponse.json({ ok: true, href: '/' + target, resolved: 'target_home_error' });
  }
}
