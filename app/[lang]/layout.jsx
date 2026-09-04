import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function LanguageLayout({ children, params }) {
  const { lang } = await params;
  if (!['en', 'hi'].includes(lang)) notFound();

  return (
    <div lang={lang} className="flex min-h-screen flex-col bg-ivory">
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
