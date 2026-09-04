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

export async function POST(request) {
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : '';

  if (!token) {
    return json({ ok: false, error: 'Missing Base44 access token' }, 401);
  }

  try {
    const authClient = createClient({
      appId: APP_ID,
      token,
    });

    const user = await authClient.auth.me();

    if (!user || user.role !== 'admin') {
      return json({ ok: false, error: 'Admin authorization required' }, 403);
    }
  } catch (error) {
    console.error('[JanaVada] Revalidate auth failed:', error);
    return json({ ok: false, error: 'Invalid or expired Base44 access token' }, 401);
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
    revalidated: { lang, category, slug },
  });
}
