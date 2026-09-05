import Link from 'next/link';
import { Mail } from 'lucide-react';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const hi = lang === 'hi';
  return {
    title: hi ? 'संपर्क — जनवादा न्यूज़' : 'Contact — JanaVada News',
    description: hi ? 'संपादकीय प्रश्न, सुधार और वास्तविक संपर्क चैनल।' : 'Editorial enquiries, corrections and genuine contact channels for JanaVada News.',
    alternates: { canonical: SITE_URL + '/' + lang + '/contact', languages: { 'en-IN': SITE_URL + '/en/contact', 'hi-IN': SITE_URL + '/hi/contact' } },
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const hi = lang === 'hi';
  const rows = [
    [hi ? 'संपादकीय प्रश्न' : 'Editorial enquiries', 'editorial@janavada.com', hi ? 'कहानी, कवरेज या संपादकीय प्रश्नों के लिए।' : 'For story, coverage or editorial enquiries.'],
    [hi ? 'सुधार' : 'Corrections', 'editorial@janavada.com', hi ? 'Subject में “Correction” और संबंधित लेख का URL शामिल करें।' : 'Include “Correction” in the subject and the relevant article URL.'],
    [hi ? 'सामान्य प्रश्न' : 'General enquiries', 'editorial@janavada.com', hi ? 'सामान्य प्रकाशन-संबंधी संपर्क के लिए।' : 'For general publication-related contact.'],
    [hi ? 'गोपनीयता' : 'Privacy', 'privacy@janavada.com', hi ? 'गोपनीयता-संबंधी अनुरोधों के लिए।' : 'For privacy-related requests.'],
  ];
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mb-10 border-b border-border pb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.12em] text-ashoka">{hi ? 'जनवादा न्यूज़' : 'JanaVada News'}</p>
        <h1 className="font-heading text-4xl text-ink sm:text-5xl">{hi ? 'संपर्क' : 'Contact'}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">{hi ? 'हम केवल वास्तविक संपर्क चैनल प्रकाशित करते हैं। नीचे सही विषय के अनुसार ईमेल करें।' : 'We publish only genuine contact channels. Use the relevant email below and include enough detail for us to review your request.'}</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2">
        {rows.map(([title, email, desc]) => (
          <section key={title} className="rounded-xl border border-border bg-white p-6">
            <Mail className="mb-4 h-5 w-5 text-ashoka" />
            <h2 className="font-heading text-xl text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{desc}</p>
            <a href={'mailto:' + email} className="mt-4 inline-block text-sm font-semibold text-ashoka hover:underline">{email}</a>
          </section>
        ))}
      </div>
      <p className="mt-10 border-t border-border pt-6 text-sm leading-6 text-gray-500">
        {hi ? 'हम अपुष्ट कार्यालय पते, फोन नंबर या व्यक्तिगत प्रोफाइल प्रकाशित नहीं करते। संपादकीय प्रक्रियाओं के लिए ' : 'We do not publish unverified office addresses, phone numbers or personal profiles. For our editorial processes, see '}
        <Link href={'/' + lang + '/editorial-policy'} className="text-ashoka hover:underline">{hi ? 'संपादकीय नीति' : 'Editorial Policy'}</Link>.
      </p>
    </article>
  );
}
