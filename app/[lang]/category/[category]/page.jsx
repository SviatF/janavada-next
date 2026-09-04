import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import { CATEGORY_DESCRIPTIONS, CATEGORY_SLUGS, getCategoryLabel } from '@/lib/categories';
import { getCategoryArticles } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const { lang, category } = await params;
  if (!CATEGORY_SLUGS.has(category)) return {};
  const label = getCategoryLabel(category, lang);
  const desc = CATEGORY_DESCRIPTIONS[category]?.[lang] || 'Latest ' + label + ' articles from JanaVada News.';
  return {
    title: label,
    description: desc,
    alternates: {
      canonical: SITE_URL + '/' + lang + '/category/' + category,
      languages: {
        'en-IN': SITE_URL + '/en/category/' + category,
        'hi-IN': SITE_URL + '/hi/category/' + category,
      },
    },
  };
}

export default async function CategoryPage({ params }) {
  const { lang, category } = await params;
  if (!['en', 'hi'].includes(lang) || !CATEGORY_SLUGS.has(category)) notFound();

  const articles = await getCategoryArticles(category, lang);
  const label = getCategoryLabel(category, lang);
  const description = CATEGORY_DESCRIPTIONS[category]?.[lang] || (lang === 'hi' ? 'नवीनतम लेख।' : 'Latest articles.');
  const lead = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href={'/' + lang} className="hover:text-ashoka">{lang === 'hi' ? 'होम' : 'Home'}</Link>
        <span className="px-2">/</span>
        <span className="text-ink">{label}</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-heading text-5xl text-ink">{label}</h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-500">{description}</p>
      </header>

      {!lead ? (
        <div className="rounded-xl border border-border bg-white p-12 text-center text-gray-500">
          {lang === 'hi' ? 'इस श्रेणी में अभी तक कोई लेख नहीं है।' : 'No articles in this category yet.'}
        </div>
      ) : (
        <div className="space-y-14">
          <ArticleCard article={lead} lang={lang} variant="horizontal" />
          <section>
            <div className="mb-6 flex items-center gap-3">
              <h2 className="font-heading text-3xl text-ink">{lang === 'hi' ? 'सभी लेख' : 'All Articles'}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
