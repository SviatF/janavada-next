import { createClient } from '@base44/sdk';
import { revalidatePath, revalidateTag } from 'next/cache';

const APP_ID = process.env.BASE44_APP_ID || '6a2b3ec4c430dbb80ac96a13';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

function json(body, status = 200) {
  return Response.json(body, { status, headers: corsHeaders });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

async function authorize(request) {
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : '';

  if (!token) {
    return { ok: false, status: 401, error: 'Missing bearer token' };
  }

  // Server-to-server publishing (Base44 backend workers / automation)
  if (process.env.REVALIDATE_SECRET && token === process.env.REVALIDATE_SECRET) {
    return { ok: true, mode: 'shared-secret' };
  }

  // Manual publishing from an authenticated Base44 admin session
  try {
    const authClient = createClient({
      appId: APP_ID,
      token,
    });

    const user = await authClient.auth.me();

    if (!user || user.role !== 'admin') {
      return { ok: false, status: 403, error: 'Admin authorization required' };
    }

    return { ok: true, mode: 'base44-admin' };
  } catch (error) {
    console.error('[JanaVada] Revalidate auth failed:', error);
    return { ok: false, status: 401, error: 'Invalid bearer token' };
  }
}

export async function POST(request) {
  const auth = await authorize(request);

  if (!auth.ok) {
    return json({ ok: false, error: auth.error }, auth.status);
  }

  const payload = await request.json().catch(() => ({}));
  const { slug, category, language = 'en' } = payload;

  if (!slug || !category) {
    return json({ ok: false, error: 'slug and category are required' }, 400);
  }

  const lang = language === 'hi' ? 'hi' : 'en';

  revalidateTag('articles', 'max');
  revalidateTag('article-views', 'max');
  revalidatePath('/' + lang);
  revalidatePath('/' + lang + '/category/' + category);
  revalidatePath('/' + lang + '/' + category + '/' + slug);
  revalidatePath('/sitemap.xml');
  revalidatePath('/news-sitemap.xml');

  return json({
    ok: true,
    authMode: auth.mode,
    revalidated: { lang, category, slug },
  });
}
