import TrustPage from '@/components/TrustPage';
import { TRUST_PAGES } from '@/lib/editorial';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const page = TRUST_PAGES['fact-checking-policy']?.[lang] || TRUST_PAGES['fact-checking-policy'].en;
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: SITE_URL + '/' + lang + '/fact-checking-policy',
      languages: { 'en-IN': SITE_URL + '/en/fact-checking-policy', 'hi-IN': SITE_URL + '/hi/fact-checking-policy' },
    },
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <TrustPage pageKey="fact-checking-policy" lang={lang} />;
}
