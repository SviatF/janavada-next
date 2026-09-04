import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronRight, Clock, Eye } from 'lucide-react';
import { notFound } from 'next/navigation';
import ArticleBody from '@/components/ArticleBody';
import ArticleCard from '@/components/ArticleCard';
import ArticleSection from '@/components/ArticleSection';
import ArticleViewTracker from '@/components/ArticleViewTracker';
import NewsletterSignup from '@/components/NewsletterSignup';
import ReadingProgress from '@/components/ReadingProgress';
import ShareLinks from '@/components/ShareLinks';
import {
  getArticle,
  getCategoryArticles,
  getCounterpart,
  getRelatedArticles,
  getTrendingArticles,
} from '@/lib/articles';
import { formatDate } from '@/lib/format';
import { getCategoryLabel } from '@/lib/categories';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600;

function cleanBody(html = '', article) {
  let result = html;

  if (article?.faq?.length) {
    result = result
      .replace(/<h2>Frequently Asked Questions<\/h2>[\s\S]*$/i, '')
      .replace(/<h2>अक्सर पूछे जाने वाले प्रश्न<\/h2>[\s\S]*$/i, '');
  }

  if (article?.key_takeaways?.length) {
    result = result
      .replace(/<h2>Key Takeaways<\/h2>[\s\S]*$/i, '')
      .replace(/<h2>मुख्य बातें<\/h2>[\s\S]*$/i, '');
  }

  return result;
}

export async function generateMetadata({ params }) {
  const { lang, category, slug } = await params;
  const article = await getArticle(slug, lang);
  if (!article || article.category !== category) return {};

  const counterpart = await getCounterpart(article, lang);
  const canonical = article.canonical_url || SITE_URL + '/' + lang + '/' + category + '/' + slug;
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
      modifiedTime: article.updated_date_custom || article.updated_date || article.published_date,
      authors: article.author_name ? [article.author_name] : undefined,
      section: getCategoryLabel(article.category, lang),
      tags: article.tags || undefined,
      images: article.featured_image
        ? [{ url: article.featured_image, alt: article.featured_image_alt || article.title }]
        : undefined,
    },
    twitter: {
      card: article.featured_image ? 'summary_large_image' : 'summary',
      title: article.title,
      description: article.summary || article.subtitle,
      images: article.featured_image ? [article.featured_image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { lang, category, slug } = await params;
  const article = await getArticle(slug, lang);
  if (!article || article.category !== category) notFound();

  const [counterpart, related, categoryArticles, trending] = await Promise.all([
    getCounterpart(article, lang),
    getRelatedArticles(article, lang, 3),
    getCategoryArticles(article.category, lang),
    getTrendingArticles(lang, 6),
  ]);

  const moreFromCategory = categoryArticles
    .filter(a => a.id !== article.id && !related.some(r => r.id === a.id))
    .slice(0, 4);

  const trendingArticles = trending
    .filter(a => a.id !== article.id && !related.some(r => r.id === a.id))
    .slice(0, 3);

  const isHindi = lang === 'hi';
  const canonical = article.canonical_url || SITE_URL + '/' + lang + '/' + category + '/' + slug;
  const alternateUrl = counterpart
    ? SITE_URL + '/' + (isHindi ? 'en' : 'hi') + '/' + counterpart.category + '/' + counterpart.slug
    : null;

  const structuredSections = [
    [isHindi ? 'क्या हुआ' : 'What Happened', article.what_happened],
    [isHindi ? 'यह क्यों महत्वपूर्ण है' : 'Why It Matters', article.why_it_matters],
    [isHindi ? 'भारतीयों पर प्रभाव' : 'Impact on Indians', article.impact_on_indians],
    [isHindi ? 'आर्थिक प्रभाव' : 'Economic Impact', article.economic_impact],
    [isHindi ? 'भारतीय स्टार्टअप पर प्रभाव' : 'Impact on Indian Startups', article.impact_on_indian_startups],
    [isHindi ? 'शिक्षा और कार्यबल पर प्रभाव' : 'Impact on Education & Workforce', article.impact_on_education_and_workforce],
    [isHindi ? 'चुनौतियाँ और जोखिम' : 'Challenges & Risks', article.challenges_and_risks],
    [isHindi ? 'जनवादा विश्लेषण' : 'JanaVada Analysis', article.bharat_nova_analysis, true],
    [isHindi ? 'निष्कर्ष' : 'Conclusion', article.conclusion],
    [isHindi ? 'उद्धरणीय अंतर्दृष्टि' : 'Citable Insights', article.citable_insights],
  ];

  const hasStructuredSections = structuredSections.some(([, value]) => Boolean(value));
  const processedBody = cleanBody(article.body || '', article);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary || article.subtitle,
    image: article.featured_image ? [article.featured_image] : undefined,
    datePublished: article.published_date,
    dateModified: article.updated_date_custom || article.updated_date || article.published_date,
    mainEntityOfPage: canonical,
    articleSection: getCategoryLabel(article.category, lang),
    keywords: article.tags?.join(', '),
    author: {
      '@type': article.author_name ? 'Person' : 'Organization',
      name: article.author_name || SITE_NAME,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: isHindi ? 'hi-IN' : 'en-IN',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isHindi ? 'होम' : 'Home',
        item: SITE_URL + '/' + lang,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: getCategoryLabel(article.category, lang),
        item: SITE_URL + '/' + lang + '/category/' + article.category,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonical,
      },
    ],
  };

  const faqSchema = article.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <ReadingProgress />
      <ArticleViewTracker articleId={article.id} language={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
        />
      )}

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
          <Link href={'/' + lang} className="hover:text-ashoka">{isHindi ? 'होम' : 'Home'}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={'/' + lang + '/category/' + article.category} className="hover:text-ashoka">
            {getCategoryLabel(article.category, lang)}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="line-clamp-1 text-gray-500">{article.title}</span>
        </nav>

        {counterpart && (
          <div className="mb-5 space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-ivory px-4 py-1.5 text-xs">
              <span>🌐</span>
              <span className="font-medium text-ink">
                {isHindi ? 'यह लेख अंग्रेज़ी में उपलब्ध है' : 'यह लेख हिन्दी में उपलब्ध है'}
              </span>
            </div>
            <Link
              href={'/' + (isHindi ? 'en' : 'hi') + '/' + counterpart.category + '/' + counterpart.slug}
              className="block text-sm font-medium text-ashoka hover:underline"
            >
              {isHindi ? 'Read in English →' : 'हिन्दी में पढ़ें →'}
            </Link>
          </div>
        )}

        <Link
          href={'/' + lang + '/category/' + article.category}
          className="mb-4 inline-block rounded-full bg-ashoka/10 px-3 py-1 text-xs font-semibold uppercase tracking-[.07em] text-ashoka transition-colors hover:bg-ashoka/20"
        >
          {getCategoryLabel(article.category, lang)}
        </Link>

        <h1 className="mb-4 font-heading text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="mb-6 text-lg leading-relaxed text-gray-500">{article.subtitle}</p>
        )}

        <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-border/70 py-4">
          {article.author_name && (
            <span className="text-sm font-semibold text-ink">{article.author_name}</span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            {formatDate(article.published_date || article.created_date, lang)}
          </span>
          {article.reading_time && (
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {article.reading_time} {isHindi ? 'मिनट' : 'min read'}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <Eye className="h-4 w-4" />
            {Number(article.views || 0).toLocaleString()} {isHindi ? 'व्यूज़' : 'views'}
          </span>

          <div className="w-full pt-1 sm:ml-auto sm:w-auto sm:pt-0">
            <ShareLinks title={article.title} url={canonical} lang={lang} />
          </div>
        </div>

        {article.featured_image && (
          <figure className="mb-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={article.featured_image}
                alt={article.featured_image_alt || article.title}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
            {(article.featured_image_caption || article.featured_image_alt) && (
              <figcaption className="mt-2 text-center text-xs text-gray-400">
                {article.featured_image_caption || article.featured_image_alt}
              </figcaption>
            )}
          </figure>
        )}

        {article.summary && (
          <div className="mb-8 rounded-lg border-l-4 border-ashoka bg-ashoka/5 p-6">
            <p className="font-medium leading-relaxed text-ink">{article.summary}</p>
          </div>
        )}

        {hasStructuredSections ? (
          <div className="mb-8">
            {structuredSections.map(([title, value, accent]) => (
              <ArticleSection key={title} title={title} content={value} accent={Boolean(accent)} />
            ))}
          </div>
        ) : (
          processedBody && <ArticleBody html={processedBody} />
        )}

        {article.key_takeaways?.length > 0 && (
          <section className="my-8 rounded-xl bg-[#F3F0EA] p-6">
            <h2 className="mb-4 font-heading text-xl text-ink">{isHindi ? 'मुख्य बातें' : 'Key Takeaways'}</h2>
            <ul className="space-y-3">
              {article.key_takeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ashoka text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-gray-600">{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {article.faq?.length > 0 && (
          <section className="my-8">
            <h2 className="mb-4 font-heading text-2xl text-ink">
              {isHindi ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {article.faq.map((item, index) => (
                <details key={index} className="group rounded-lg border border-border bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium text-ink">
                    {item.question}
                    <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-4 leading-relaxed text-gray-500">{item.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {article.tags?.length > 0 && (
          <div className="my-8 flex flex-wrap gap-2 border-t border-border/70 pt-6">
            {article.tags.map(tag => (
              <Link
                key={tag}
                href={'/' + lang + '/search?q=' + encodeURIComponent(tag)}
                className="rounded-full bg-[#F3F0EA] px-3 py-1.5 text-xs text-gray-500 transition-colors hover:bg-ashoka/10 hover:text-ashoka"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center border-t border-border/70 py-6">
          <ShareLinks title={article.title} url={canonical} lang={lang} />
        </div>

        {counterpart && (
          <section className="my-8 rounded-xl border border-border bg-ivory p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {isHindi ? 'यह लेख पढ़ें' : 'Read this article in'}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={'/en/' + (isHindi ? counterpart.category : article.category) + '/' + (isHindi ? counterpart.slug : article.slug)}
                className={'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ' +
                  (!isHindi ? 'bg-ashoka text-white' : 'border border-border bg-white text-ink hover:bg-ashoka/5')}
              >
                <span>🇺🇸</span> English
              </Link>
              <Link
                href={'/hi/' + (isHindi ? article.category : counterpart.category) + '/' + (isHindi ? article.slug : counterpart.slug)}
                className={'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ' +
                  (isHindi ? 'bg-ashoka text-white' : 'border border-border bg-white text-ink hover:bg-ashoka/5')}
              >
                <span>🇮🇳</span> हिन्दी
              </Link>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-border/70 pt-8">
            <h2 className="mb-6 font-heading text-2xl text-ink">
              {isHindi ? 'संबंधित खबरें' : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
            </div>
          </section>
        )}

        {moreFromCategory.length > 0 && (
          <section className="mt-10 border-t border-border/70 pt-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl text-ink">
                {isHindi ? 'इस श्रेणी से और' : 'More From'} {getCategoryLabel(article.category, lang)}
              </h2>
              <Link href={'/' + lang + '/category/' + article.category} className="text-sm font-medium text-ashoka hover:underline">
                {isHindi ? 'सभी देखें →' : 'View All →'}
              </Link>
            </div>
            <div>
              {moreFromCategory.map(a => <ArticleCard key={a.id} article={a} lang={lang} variant="compact" />)}
            </div>
          </section>
        )}

        {trendingArticles.length > 0 && (
          <section className="mt-10 border-t border-border/70 pt-8">
            <h2 className="mb-6 font-heading text-2xl text-ink">
              {isHindi ? 'ट्रेंडिंग खबरें' : 'Trending Articles'}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trendingArticles.map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}
            </div>
          </section>
        )}

        <div className="my-12">
          <NewsletterSignup lang={lang} />
        </div>
      </article>
    </>
  );
}
