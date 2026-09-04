import { notFound } from 'next/navigation';

const COPY = {
  about: {
    en: ['About JanaVada', "JanaVada is a modern India-focused news publication built to explain not only what happened, but why it matters."],
    hi: ['जनवादा के बारे में', 'जनवादा भारत-केंद्रित आधुनिक समाचार मंच है जो सिर्फ खबर नहीं, उसका अर्थ भी समझाता है।'],
  },
  contact: {
    en: ['Contact', 'For editorial, partnership and business enquiries, contact the JanaVada team through the official channels listed by the publication.'],
    hi: ['संपर्क', 'संपादकीय, साझेदारी और व्यावसायिक पूछताछ के लिए जनवादा की आधिकारिक संपर्क जानकारी का उपयोग करें।'],
  },
  privacy: {
    en: ['Privacy Policy', 'JanaVada respects reader privacy. This page will contain the publication’s full privacy policy before production launch.'],
    hi: ['गोपनीयता नीति', 'जनवादा पाठकों की गोपनीयता का सम्मान करता है। प्रोडक्शन लॉन्च से पहले यहां पूर्ण गोपनीयता नीति प्रकाशित की जाएगी।'],
  },
  terms: {
    en: ['Terms of Use', 'This page will contain JanaVada’s full terms of use before production launch.'],
    hi: ['उपयोग की शर्तें', 'प्रोडक्शन लॉन्च से पहले यहां जनवादा की पूर्ण उपयोग शर्तें प्रकाशित की जाएंगी।'],
  },
};

export function staticPageMetadata(page) {
  const data = COPY[page];
  return data ? { title: data.en[0] } : {};
}

export default async function StaticInfoPage({ params, page }) {
  const { lang } = await params;
  const data = COPY[page];

  if (!data || !['en', 'hi'].includes(lang)) notFound();

  const [title, body] = data[lang] || data.en;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-5xl text-ink">{title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-gray-600">{body}</p>
    </article>
  );
}
