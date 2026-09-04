import StaticInfoPage, { staticPageMetadata } from '@/components/StaticInfoPage';

export const metadata = staticPageMetadata('contact');

export default function ContactPage({ params }) {
  return <StaticInfoPage params={params} page="contact" />;
}
