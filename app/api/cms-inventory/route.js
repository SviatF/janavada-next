import { NextResponse } from 'next/server';
import { base44 } from '@/lib/base44';

export const dynamic = 'force-dynamic';

const ARTICLE_FIELDS = [
  'id','title','slug','category','language','translation_group_id','summary','subtitle',
  'author_name','author_slug','featured_image','featured_image_alt','published_date','created_date',
  'updated_date','updated_date_custom','reading_time','views','seo_title','seo_description',
  'canonical_url','source_url','sources','tags','faq','body'
];

const AUTHOR_FIELDS = [
  'id','name','slug','author_page_url','avatar','bio','job_title','authority_focus',
  'expertise_categories','same_as','entity_type','verified_real_person'
];

function authorized(request) {
  const secret = process.env.CMS_INVENTORY_SECRET;
  if (!secret) return false;
  const bearer = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const direct = request.headers.get('x-janavada-cms-key') || '';
  return bearer === secret || direct === secret;
}

export async function GET(request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok:false, error:'Unauthorized' }, { status:401 });
  }

  const url = new URL(request.url);
  const offset = Math.max(0, Number(url.searchParams.get('offset') || 0));
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') || 50)));

  try {
    const [articles, authors] = await Promise.all([
      base44.entities.Article.filter(
        { status:'published' },
        '-published_date',
        limit,
        offset,
        ARTICLE_FIELDS
      ),
      offset === 0
        ? base44.entities.Author.filter(
            { verified_real_person:true, entity_type:'person' },
            'name',
            100,
            0,
            AUTHOR_FIELDS
          )
        : Promise.resolve([])
    ]);

    const rows = (articles || []).map(article => ({
      ...article,
      body: String(article.body || '').slice(0, 24000),
      live_url: article.canonical_url || `https://janavada.com/${article.language || 'en'}/${String(article.category || 'news').toLowerCase()}/${article.slug}`
    }));

    return NextResponse.json({
      ok:true,
      source:'janavada-next-live',
      offset,
      limit,
      count:rows.length,
      has_more:rows.length === limit,
      articles:rows,
      authors:authors || [],
      generated_at:new Date().toISOString()
    }, {
      headers:{
        'Cache-Control':'no-store, max-age=0',
        'X-Robots-Tag':'noindex, nofollow'
      }
    });
  } catch (error) {
    console.error('[JanaVada] CMS inventory export failed', error);
    return NextResponse.json({ ok:false, error:'Inventory unavailable' }, { status:500 });
  }
}
