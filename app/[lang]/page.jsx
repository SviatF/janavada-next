import ArticleCard from '@/components/ArticleCard';
import TopStory from '@/components/TopStory';
import SectionHeader from '@/components/SectionHeader';
import NewsletterSignup from '@/components/NewsletterSignup';
import TrendingBar from '@/components/TrendingBar';
import TrendingNow from '@/components/TrendingNow';
import AnalysisBlock from '@/components/AnalysisBlock';
import FeaturedGrid from '@/components/FeaturedGrid';
import LatestFeed from '@/components/LatestFeed';
import { getHomeArticles, getTrendingArticles } from '@/lib/articles';
import { getCategoryLabel } from '@/lib/categories';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const hi = lang === 'hi';

  return {
    title: hi
      ? 'जनवादा न्यूज़ — भारत समाचार, व्यापार, प्रौद्योगिकी और विश्लेषण'
      : 'JanaVada News — India News, Business, Technology & Analysis',
    description: hi
      ? 'हम सिर्फ खबरें नहीं देते। हम बताते हैं कि इसका भारत के लिए क्या मतलब है।'
      : SITE_DESCRIPTION,
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

function Divider() {
  return <div className="border-t border-border" />;
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const isHindi = lang === 'hi';

  const [articles, trending] = await Promise.all([
    getHomeArticles(lang),
    getTrendingArticles(lang, 10),
  ]);

  const topStory = articles.find(a => a.is_top_story);
  const hero = topStory || articles[0];
  const byCategory = (slug, limit = 6) => articles.filter(a => a.category === slug).slice(0, limit);
  const latest = articles.filter(a => a.id !== hero?.id).slice(0, 16);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  return (
    <div className="min-h-screen bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
      />

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-8 sm:px-6">
        {hero && <TopStory article={hero} lang={lang} />}

        <TrendingNow articles={trending} lang={lang} />

        <Divider />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {latest.length > 0 && (
              <>
                <SectionHeader title={isHindi ? 'ताज़ा खबरें' : 'Latest'} lang={lang} />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {latest.slice(0, 4).map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
                </div>
              </>
            )}
          </div>

          <div>
            <TrendingBar articles={trending} lang={lang} />
          </div>
        </div>

        <Divider />

        {byCategory('technology').length > 0 && (
          <section>
            <SectionHeader
              title={getCategoryLabel('technology', lang)}
              href={'/' + lang + '/category/technology'}
              lang={lang}
            />
            <FeaturedGrid articles={byCategory('technology', 5)} accentColor="#0891B2" lang={lang} />
          </section>
        )}

        {byCategory('business').length > 0 && (
          <section>
            <SectionHeader
              title={getCategoryLabel('business', lang)}
              href={'/' + lang + '/category/business'}
              lang={lang}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {byCategory('business', 3).map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
            </div>
          </section>
        )}

        <Divider />

        {byCategory('ai').length > 0 && (
          <section>
            <SectionHeader
              title={getCategoryLabel('ai', lang)}
              href={'/' + lang + '/category/ai'}
              description={isHindi ? 'भारत के भविष्य को आकार देने वाली बुद्धिमत्ता' : "The intelligence shaping India's future"}
              lang={lang}
            />
            <FeaturedGrid articles={byCategory('ai', 5)} accentColor="#7C3AED" lang={lang} />
          </section>
        )}

        {byCategory('government-schemes').length > 0 && (
          <section>
            <SectionHeader
              title={getCategoryLabel('government-schemes', lang)}
              href={'/' + lang + '/category/government-schemes'}
              lang={lang}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {byCategory('government-schemes', 4).map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
            </div>
          </section>
        )}

        <Divider />

        {(byCategory('opinion').length > 0 || byCategory('explainers').length > 0) && (
          <AnalysisBlock
            articles={[...byCategory('opinion', 2), ...byCategory('explainers', 2)].slice(0, 4)}
            lang={lang}
          />
        )}

        {byCategory('economy').length > 0 && (
          <section>
            <SectionHeader
              title={getCategoryLabel('economy', lang)}
              href={'/' + lang + '/category/economy'}
              lang={lang}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {byCategory('economy', 3).map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
            </div>
          </section>
        )}

        {byCategory('startups').length > 0 && (
          <section>
            <SectionHeader
              title={getCategoryLabel('startups', lang)}
              href={'/' + lang + '/category/startups'}
              lang={lang}
            />
            <FeaturedGrid articles={byCategory('startups', 5)} accentColor="#D97706" lang={lang} />
          </section>
        )}

        <Divider />

        <NewsletterSignup lang={lang} />

        <Divider />

        {latest.length > 4 && (
          <section>
            <SectionHeader title={isHindi ? 'और खबरें' : 'More Stories'} lang={lang} />
            <LatestFeed
              articles={latest.slice(4, 10)}
              sidebarArticles={latest.slice(10, 16)}
              lang={lang}
            />
          </section>
        )}
      </div>
    </div>
  );
}
