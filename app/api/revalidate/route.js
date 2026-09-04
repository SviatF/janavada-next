import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json().catch(() => ({}));
  const { slug, category, language = 'en' } = payload;
  const lang = language === 'hi' ? 'hi' : 'en';

  revalidateTag('articles', 'max');
  revalidatePath('/' + lang);
  if (category) revalidatePath('/' + lang + '/category/' + category);
  if (category && slug) revalidatePath('/' + lang + '/' + category + '/' + slug);
  revalidatePath('/sitemap.xml');
  revalidatePath('/news-sitemap.xml');

  return Response.json({ ok: true, revalidated: { lang, category, slug } });
}
