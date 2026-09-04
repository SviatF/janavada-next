import StaticInfoPage, { staticPageMetadata } from '@/components/StaticInfoPage';

export const metadata = staticPageMetadata('about');

export default function AboutPage({ params }) {
  return <StaticInfoPage params={params} page="about" />;
}
