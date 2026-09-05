import Link from 'next/link';
import { TRUST_PAGES } from '@/lib/editorial';

const STANDARD_LINKS = [
  ['editorial-policy', 'Editorial Policy', 'संपादकीय नीति'],
  ['fact-checking-policy', 'Fact-Checking Policy', 'तथ्य-जांच नीति'],
  ['corrections-policy', 'Corrections Policy', 'सुधार नीति'],
  ['ethics-policy', 'Ethics Policy', 'नैतिकता नीति'],
  ['authors', 'Authors', 'लेखक'],
  ['contact', 'Contact', 'संपर्क'],
];

export default function TrustPage({ pageKey, lang = 'en' }) {
  const page = TRUST_PAGES[pageKey]?.[lang] || TRUST_PAGES[pageKey]?.en;
  if (!page) return null;
  const hi = lang === 'hi';

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mb-10 border-b border-border pb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.12em] text-ashoka">{hi ? 'जनवादा न्यूज़' : 'JanaVada News'}</p>
        <h1 className="font-heading text-4xl leading-tight text-ink sm:text-5xl">{page.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-600">{page.intro}</p>
      </header>
      <div className="space-y-10">
        {page.sections.map(section => (
          <section key={section.title}>
            <h2 className="mb-4 font-heading text-2xl text-ink sm:text-3xl">{section.title}</h2>
            {section.paragraphs?.map((p, i) => <p key={i} className="mb-4 leading-8 text-gray-700">{p}</p>)}
            {section.bullets?.length > 0 && (
              <ul className="grid gap-2 pl-5 text-gray-700 sm:grid-cols-2">
                {section.bullets.map(item => <li key={item} className="list-disc leading-7">{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[.1em] text-gray-500">{hi ? 'संपादकीय मानक' : 'Editorial Standards'}</h2>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {STANDARD_LINKS.map(([slug, en, hiLabel]) => (
            <Link key={slug} href={'/' + lang + '/' + slug} className="text-sm font-medium text-ashoka hover:underline">{hi ? hiLabel : en}</Link>
          ))}
        </div>
      </section>
    </article>
  );
}
