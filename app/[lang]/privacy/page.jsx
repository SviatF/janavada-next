import StaticInfoPage, { staticPageMetadata } from '@/components/StaticInfoPage';

export const metadata = staticPageMetadata('privacy');

export default function PrivacyPage({ params }) {
  return <StaticInfoPage params={params} page="privacy" />;
}
