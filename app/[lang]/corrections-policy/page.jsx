import TrustPage from '@/components/TrustPage';
import { TRUST_PAGES } from '@/lib/editorial';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const page = TRUST_PAGES['corrections-policy']?.[lang] || TRUST_PAGES['corrections-policy'].en;
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: SITE_URL + '/' + lang + '/corrections-policy',
      languages: { 'en-IN': SITE_URL + '/en/corrections-policy', 'hi-IN': SITE_URL + '/hi/corrections-policy' },
    },
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <TrustPage pageKey="corrections-policy" lang={lang} />;
}
