import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import { getAuthorArticles, getAuthorBySlug } from '@/lib/authors';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return {};
  return { title: author.name, description: author.bio || (author.name + ' — JanaVada News'), alternates: { canonical: SITE_URL + '/' + lang + '/author/' + slug } };
}

export default async function AuthorPage({ params }) {
  const { lang, slug } = await params;
  const hi = lang === 'hi';
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const articles = await getAuthorArticles(author, lang, 24);
  const canonical = SITE_URL + '/' + lang + '/author/' + slug;
  const schema = { '@context': 'https://schema.org', '@type': author.entityType === 'person' ? 'Person' : 'Organization', name: author.name, url: canonical, ...(author.same_as ? { sameAs: [author.same_as] } : {}) };
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <header className="mb-10 border-b border-border pb-8">
        <p className="text-xs font-bold uppercase tracking-[.1em] text-ashoka">{author.entityType === 'person' ? (hi ? 'सत्यापित contributor' : 'Verified contributor') : (hi ? 'संपादकीय संगठन' : 'Editorial organization')}</p>
        <h1 className="mt-2 font-heading text-4xl text-ink sm:text-5xl">{author.name}</h1>
        <p className="mt-2 text-sm font-semibold text-gray-500">{author.role || author.job_title}</p>
        {author.bio && <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600">{author.bio}</p>}
        {author.authority_focus && <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">{author.authority_focus}</p>}
      </header>
      <section>
        <h2 className="mb-6 font-heading text-3xl text-ink">{hi ? 'हाल के लेख' : 'Latest Articles'}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{articles.map(a => <ArticleCard key={a.id} article={a} lang={lang} />)}</div>
      </section>
    </article>
  );
}
