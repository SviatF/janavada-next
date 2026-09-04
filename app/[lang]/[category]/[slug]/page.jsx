import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleBody from '@/components/ArticleBody';
import ArticleCard from '@/components/ArticleCard';
import { getArticle, getCounterpart, getRelatedArticles } from '@/lib/articles';
import { formatDate } from '@/lib/format';
import { getCategoryLabel } from '@/lib/categories';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { lang, category, slug } = await params;
  const article = await getArticle(slug, lang);
  if (!article || article.category !== category) return {};

  const counterpart = await getCounterpart(article, lang);
  const canonical = SITE_URL + '/' + lang + '/' + category + '/' + slug;
  const alternate = counterpart
    ? SITE_URL + '/' + (lang === 'hi' ? 'en' : 'hi') + '/' + counterpart.category + '/' + counterpart.slug
    : null;

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.summary || article.subtitle,
    alternates: {
      canonical,
      languages: {
        [lang === 'hi' ? 'hi-IN' : 'en-IN']: canonical,
        ...(alternate ? { [lang === 'hi' ? 'en-IN' : 'hi-IN']: alternate } : {}),
      },
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary || article.subtitle,
      url: canonical,
      publishedTime: article.published_date,
      modifiedTime: article.updated_date_custom || article.published_date,
      authors: article.author_name ? [article.author_name] : undefined,
      images: article.featured_image ? [{ url: article.featured_image, alt: article.featured_image_alt || article.title }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { lang, category, slug } = await params;
  const article = await getArticle(slug, lang);
  if (!article || article.category !== category) notFound();

  const [counterpart, related] = await Promise.all([
    getCounterpart(article, lang),
    getRelatedArticles(article, lang, 3),
  ]);

  const canonical = SITE_URL + '/' + lang + '/' + category + '/' + slug;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary || article.subtitle,
    image: article.featured_image ? [article.featured_image] : undefined,
    datePublished: article.published_date,
    dateModified: article.updated_date_custom || article.published_date,
    mainEntityOfPage: canonical,
    author: {
      '@type': article.author_name ? 'Person' : 'Organization',
      name: article.author_name || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        <nav className="mb-7 text-sm text-gray-500">
          <Link href={'/' + lang} className="hover:text-ashoka">{lang === 'hi' ? 'होम' : 'Home'}</Link>
          <span className="px-2">/</span>
          <Link href={'/' + lang + '/category/' + category} className="hover:text-ashoka">{getCategoryLabel(category, lang)}</Link>
        </nav>

        <header className="mx-auto max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[.1em] text-ashoka">{getCategoryLabel(category, lang)}</span>
          <h1 className="mt-4 font-heading text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">{article.title}</h1>
          {article.subtitle && <p className="mt-5 text-xl leading-relaxed text-gray-500">{article.subtitle}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-border py-4 text-sm text-gray-500">
            {article.author_name && <span className="font-semibold text-ink">{article.author_name}</span>}
            <span>{formatDate(article.published_date || article.created_date, lang)}</span>
            {article.reading_time && <span>· {article.reading_time} {lang === 'hi' ? 'मिनट' : 'min read'}</span>}
            {counterpart && (
              <Link
                className="ml-auto font-semibold text-ashoka"
                href={'/' + (lang === 'hi' ? 'en' : 'hi') + '/' + counterpart.category + '/' + counterpart.slug}
              >
                {lang === 'hi' ? 'Read in English' : 'हिन्दी में पढ़ें'}
              </Link>
            )}
          </div>
        </header>

        {article.featured_image && (
          <figure className="mx-auto mt-9 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
              <Image src={article.featured_image} alt={article.featured_image_alt || article.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
            </div>
            {article.featured_image_caption && <figcaption className="mt-2 text-sm text-gray-500">{article.featured_image_caption}</figcaption>}
          </figure>
        )}

        <div className="mx-auto mt-10 max-w-3xl">
          {article.summary && (
            <div className="mb-8 rounded-xl border-l-4 border-ashoka bg-indigo-50/60 p-6 text-lg leading-relaxed text-gray-700">
              {article.summary}
            </div>
          )}
          <ArticleBody html={article.body} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="font-heading text-3xl text-ink">{lang === 'hi' ? 'संबंधित खबरें' : 'Related Stories'}</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
          </div>
        </section>
      )}
    </>
  );
}
