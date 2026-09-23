import { NextResponse } from 'next/server';

const DEFAULT_CMS_PUBLIC_URL = 'https://janavada-cms-staging.oleg22777.workers.dev/api/public';

export async function POST(request) {
  const configured = process.env.JANAVADA_CMS_PUBLIC_URL;
  const base = String(configured === 'off' ? '' : (configured || DEFAULT_CMS_PUBLIC_URL)).replace(/\/$/, '');
  if (!base) return NextResponse.json({ ok: false, error: 'CMS_NOT_CONFIGURED' }, { status: 503 });

  const body = await request.json().catch(() => ({}));
  const articleId = String(body?.article_id || '');
  if (!articleId) return NextResponse.json({ ok: false, error: 'article_id required' }, { status: 400 });

  try {
    const response = await fetch(`${base}/track-view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        article_id: articleId,
        language: body?.language === 'hi' ? 'hi' : 'en',
      }),
      cache: 'no-store',
    });
    const payload = await response.json().catch(() => ({}));
    return NextResponse.json(payload, {
      status: response.status,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: 'CMS_TRACK_FAILED',
      detail: String(error?.message || error),
    }, { status: 502, headers: { 'Cache-Control': 'no-store, max-age=0' } });
  }
}
