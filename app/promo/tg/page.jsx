import Script from 'next/script';
import PromoTelegramClient from './PromoTelegramClient';

const PIXEL_ID = '27749735947983607';

export const metadata = {
  title: 'JanaVada Telegram — बिजनेस और फाइनेंस अपडेट्स',
  description: 'भारत-केंद्रित बिजनेस, मार्केट, स्टार्टअप और पर्सनल फाइनेंस अपडेट्स के लिए JanaVada Telegram चैनल जॉइन करें।',
  alternates: { canonical: '/promo/tg' },
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    title: 'JanaVada Telegram',
    description: 'बिजनेस, मार्केट और फाइनेंस अपडेट्स — सीधे Telegram पर।',
    type: 'website',
    url: '/promo/tg',
  },
};

export default function TelegramPromoPage() {
  return (
    <>
      <Script id="meta-pixel-promo-tg" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <PromoTelegramClient />
    </>
  );
}
