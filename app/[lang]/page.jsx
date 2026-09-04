import ArticleCard from '@/components/ArticleCard';
import TopStory from '@/components/TopStory';
import { getHomeArticles } from '@/lib/articles';
import { getCategoryLabel } from '@/lib/categories';
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const hi = lang === 'hi';
  return {
    title: hi ? 'जनवादा न्यूज़ — भारत समाचार, व्यापार, प्रौद्योगिकी और विश्लेषण' : 'JanaVada News — India News, Business, Technology & Analysis',
    description: hi ? 'हम सिर्फ खबरें नहीं देते। हम बताते हैं कि इसका भारत के लिए क्या मतलब है।' : SITE_DESCRIPTION,
    alternates: {
      canonical: SITE_URL + '/' + lang,
      languages: {
        'en-IN': SITE_URL + '/en',
        'hi-IN': SITE_URL + '/hi',
        'x-default': SITE_URL + '/en',
      },
    },
  };
}

function Section({ title, articles, lang }) {
  if (!articles.length) return null;
  return (
    <section>
      <div className="mb-5 flex items-center gap-4">
        <h2 className="font-heading text-3xl text-ink">{title}</h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
      </div>
    </section>
  );
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const articles = await getHomeArticles(lang);
  const hero = articles.find(a => a.is_top_story) || articles[0];
  const latest = articles.filter(a => a.id !== hero?.id).slice(0, 6);
  const byCategory = slug => articles.filter(a => a.category === slug);

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-8 sm:px-6">
      {hero ? <TopStory article={hero} lang={lang} /> : (
        <div className="rounded-2xl border border-border bg-white p-12 text-center">
          <h1 className="font-heading text-5xl text-ink">JanaVada News</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">The Next.js frontend is ready. Published Base44 articles will appear here automatically.</p>
        </div>
      )}

      <Section title={lang === 'hi' ? 'ताज़ा खबरें' : 'Latest'} articles={latest} lang={lang} />
      <Section title={getCategoryLabel('technology', lang)} articles={byCategory('technology').slice(0, 3)} lang={lang} />
      <Section title={getCategoryLabel('business', lang)} articles={byCategory('business').slice(0, 3)} lang={lang} />
      <Section title={getCategoryLabel('ai', lang)} articles={byCategory('ai').slice(0, 3)} lang={lang} />
      <Section title={getCategoryLabel('economy', lang)} articles={byCategory('economy').slice(0, 3)} lang={lang} />
    </div>
  );
}
