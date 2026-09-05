import TrustPage from '@/components/TrustPage';
import { TRUST_PAGES } from '@/lib/editorial';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const page = TRUST_PAGES['ethics-policy']?.[lang] || TRUST_PAGES['ethics-policy'].en;
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: SITE_URL + '/' + lang + '/ethics-policy',
      languages: { 'en-IN': SITE_URL + '/en/ethics-policy', 'hi-IN': SITE_URL + '/hi/ethics-policy' },
    },
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <TrustPage pageKey="ethics-policy" lang={lang} />;
}
