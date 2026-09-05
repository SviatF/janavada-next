import Link from 'next/link';
import { getPublicAuthors } from '@/lib/authors';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const hi = lang === 'hi';
  return {
    title: hi ? 'लेखक और संपादकीय पहचान' : 'Authors & Editorial Identities',
    description: hi ? 'जनवादा के सत्यापित contributors और Editorial Desk.' : 'Verified JanaVada contributors and the JanaVada Editorial Desk.',
    alternates: { canonical: SITE_URL + '/' + lang + '/authors', languages: { 'en-IN': SITE_URL + '/en/authors', 'hi-IN': SITE_URL + '/hi/authors' } },
  };
}

export default async function AuthorsPage({ params }) {
  const { lang } = await params;
  const hi = lang === 'hi';
  const authors = await getPublicAuthors();
  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mb-10 border-b border-border pb-8">
        <h1 className="font-heading text-4xl text-ink sm:text-5xl">{hi ? 'लेखक और संपादकीय पहचान' : 'Authors & Editorial Identities'}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-600">
          {hi ? 'जनवादा किसी contributor को Person के रूप में तभी प्रकाशित करता है जब वह वास्तविक और सत्यापित पहचान हो। अन्यथा सामग्री JanaVada Editorial Desk के अंतर्गत प्रकाशित होती है।' : 'JanaVada publishes a contributor as a Person only when the identity is real and verified. Otherwise, material is attributed to the JanaVada Editorial Desk rather than to a fabricated human persona.'}
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2">
        {authors.map(author => (
          <Link key={author.urlSlug} href={'/' + lang + '/author/' + author.urlSlug} className="rounded-xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-card">
            <p className="text-xs font-bold uppercase tracking-[.08em] text-ashoka">{author.entityType === 'person' ? (hi ? 'सत्यापित contributor' : 'Verified contributor') : (hi ? 'संपादकीय संगठन' : 'Editorial organization')}</p>
            <h2 className="mt-2 font-heading text-2xl text-ink">{author.name}</h2>
            <p className="mt-1 text-sm font-medium text-gray-500">{author.role || author.job_title}</p>
            {author.bio && <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">{author.bio}</p>}
          </Link>
        ))}
      </div>
    </article>
  );
}
