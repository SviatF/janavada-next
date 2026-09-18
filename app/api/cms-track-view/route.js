import { NextResponse } from 'next/server';

export async function POST(request) {
  const base = String(process.env.JANAVADA_CMS_PUBLIC_URL || '').replace(/\/$/, '');
  if (!base) return NextResponse.json({ ok: false, error: 'CMS_NOT_CONFIGURED' }, { status: 503 });

  const body = await request.json().catch(() => ({}));
  const articleId = String(body?.article_id || '');
  if (!articleId) return NextResponse.json({ ok: false, error: 'article_id required' }, { status: 400 });

  try {
    const response = await fetch(`${base}/track-view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ article_id: articleId }),
      cache: 'no-store',
    });
    const payload = await response.json().catch(() => ({}));
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json({ ok: false, error: 'CMS_TRACK_FAILED' }, { status: 502 });
  }
}
