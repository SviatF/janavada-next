import './globals.css';
import { Inter, Instrument_Serif, Cormorant_Garamond } from 'next/font/google';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin', 'devanagari'], variable: '--font-inter', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], variable: '--font-instrument', weight: '400', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', weight: ['600'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: '%s | JanaVada News' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'JanaVada News' }],
  creator: 'JanaVada News',
  publisher: 'JanaVada News',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable + ' ' + instrument.variable + ' ' + cormorant.variable}>
      <body>{children}</body>
    </html>
  );
}
