import StaticInfoPage, { staticPageMetadata } from '@/components/StaticInfoPage';

export const metadata = staticPageMetadata('terms');

export default function TermsPage({ params }) {
  return <StaticInfoPage params={params} page="terms" />;
}
