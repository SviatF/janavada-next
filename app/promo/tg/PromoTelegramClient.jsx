'use client';

import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  LineChart,
  Lock,
  Send,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import styles from './promo.module.css';

const TELEGRAM_URL = 'https://t.me/+uw1ti8qXDetjYTBi';

const benefits = [
  'रोज़ाना बिजनेस और मार्केट अपडेट',
  'स्टॉक मार्केट का साफ़ विश्लेषण',
  'स्टार्टअप और फंडिंग की अहम खबरें',
  'अर्थव्यवस्था आसान भाषा में',
  'पर्सनल फाइनेंस की उपयोगी बातें',
  'निवेश से जुड़ी गहरी व्याख्या',
];

const cards = [
  { icon: LineChart, label: 'स्टॉक मार्केट' },
  { icon: BriefcaseBusiness, label: 'बिजनेस' },
  { icon: WalletCards, label: 'पर्सनल फाइनेंस' },
];

function trackLead() {
  try {
    if (typeof window !== 'undefined') {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'JanaVada Telegram Promo',
          content_category: 'Telegram Channel',
        });
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'telegram_lead',
        placement: 'promo_tg',
        destination: 'telegram',
      });
    }
  } catch (_) {
    // Tracking must never block the destination click.
  }
}

function joinTelegram(event) {
  event.preventDefault();
  trackLead();
  window.setTimeout(() => {
    window.location.assign(TELEGRAM_URL);
  }, 180);
}

export default function PromoTelegramClient() {
  return (
    <main className={styles.page}>
      <div className={styles.auroraOne} />
      <div className={styles.auroraTwo} />
      <div className={styles.auroraThree} />
      <div className={styles.noise} />

      <section className={styles.shell}>
        <div className={styles.brandWrap}>
          <div className={styles.logoHalo}>
            <div className={styles.logoRing}>
              <img src="/favicon.webp" alt="JanaVada" className={styles.logo} />
            </div>
          </div>
          <div className={styles.trustPill}>
            <ShieldCheck size={16} />
            <span>भारत-केंद्रित खबरें और विश्लेषण</span>
          </div>
        </div>

        <header className={styles.hero}>
          <div className={styles.kicker}><Sparkles size={17} /> JANAVADA NEWS</div>
          <h1>
            भारत की <span>सबसे महत्वपूर्ण</span><br />
            बिजनेस और फाइनेंस अपडेट्स
          </h1>
          <p>
            हर दिन सिर्फ <strong>5 मिनट</strong> में समाचार नहीं, बल्कि <strong>समझ</strong>।
          </p>
        </header>

        <div className={styles.proofBar}>
          <div><LineChart size={18} /><strong>भारत-केंद्रित</strong></div>
          <div className={styles.proofDivider} />
          <div><Sparkles size={17} /><strong>EN + HI</strong></div>
          <div className={styles.proofDivider} />
          <div><Bell size={18} /><strong>रोज़ अपडेट</strong></div>
        </div>

        <div className={styles.cards}>
          {cards.map(({ icon: Icon, label }) => (
            <div className={styles.topicCard} key={label}>
              <div className={styles.iconBubble}><Icon size={24} /></div>
              <strong>{label}</strong>
            </div>
          ))}
        </div>

        <div className={styles.benefitPanel}>
          <div className={styles.panelGlow} />
          <h2>हमारे <span>Telegram चैनल</span> में मिलेगा</h2>
          <div className={styles.benefitList}>
            {benefits.map((text) => (
              <div className={styles.benefit} key={text}>
                <CheckCircle2 size={21} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href={TELEGRAM_URL}
          onClick={joinTelegram}
          className={styles.cta}
          aria-label="Join JanaVada Telegram channel"
        >
          <span className={styles.ctaShine} />
          <Send size={25} />
          <strong>🚀 फ्री Telegram चैनल जॉइन करें</strong>
          <ArrowRight size={23} className={styles.arrow} />
        </a>

        <div className={styles.microProof}>
          <div><Lock size={16} />100% मुफ़्त</div>
          <div><Bell size={16} />रोज़ अपडेट</div>
          <div><GraduationCap size={17} />गहरा विश्लेषण</div>
        </div>

        <p className={styles.disclaimer}>केवल शैक्षिक एवं समाचार उद्देश्यों के लिए।</p>
      </section>
    </main>
  );
}
