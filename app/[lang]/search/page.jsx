import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { getHomeArticles } from '@/lib/articles';

export const metadata = {
  title: 'Search',
  robots: { index: false, follow: true },
};

export default async function SearchPage({ params, searchParams }) {
  const { lang } = await params;
  const query = String((await searchParams)?.q || '').trim().toLowerCase();
  const articles = await getHomeArticles(lang);
  const results = query
    ? articles.filter(a => [a.title, a.subtitle, a.summary, ...(a.tags || [])].filter(Boolean).join(' ').toLowerCase().includes(query))
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-5xl text-ink">{lang === 'hi' ? 'खोज' : 'Search'}</h1>
      <p className="mt-3 text-gray-500">
        {query ? (lang === 'hi' ? 'खोज परिणाम: ' : 'Results for: ') + '"' + query + '"' : (lang === 'hi' ? 'खोज शब्द दर्ज करें।' : 'Enter a search term.')}
      </p>

      {results.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
        </div>
      ) : query ? (
        <div className="mt-10 rounded-xl border border-border bg-white p-10 text-gray-500">
          {lang === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No matching articles found.'}
          <Link href={'/' + lang} className="ml-2 font-semibold text-ashoka">{lang === 'hi' ? 'होम' : 'Home'}</Link>
        </div>
      ) : null}
    </div>
  );
}
