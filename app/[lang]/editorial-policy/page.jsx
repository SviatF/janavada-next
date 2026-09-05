import TrustPage from '@/components/TrustPage';
import { TRUST_PAGES } from '@/lib/editorial';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const page = TRUST_PAGES['editorial-policy']?.[lang] || TRUST_PAGES['editorial-policy'].en;
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: SITE_URL + '/' + lang + '/editorial-policy',
      languages: { 'en-IN': SITE_URL + '/en/editorial-policy', 'hi-IN': SITE_URL + '/hi/editorial-policy' },
    },
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  return <TrustPage pageKey="editorial-policy" lang={lang} />;
}
