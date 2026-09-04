import { ArrowRight, Send } from 'lucide-react';

const TELEGRAM_URL = 'https://t.me/janavada';

export default function NewsletterSignup({ variant = 'default', lang = 'en' }) {
  const isHindi = lang === 'hi';

  if (variant === 'inline') {
    return (
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#0088cc] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0077b5]"
      >
        <Send className="h-4 w-4" />
        {isHindi ? 'टेलीग्राम पर जुड़ें' : 'Join on Telegram'}
      </a>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#0088cc]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-saffron/10 blur-3xl" />
      <div className="relative z-10 px-8 py-14 sm:px-14 sm:py-16">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0088cc]/30 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-[#7cc4f0]">
            <Send className="h-3 w-3" /> Telegram
          </div>
          <h3 className="mb-4 font-heading text-3xl leading-tight text-white sm:text-4xl">
            {isHindi ? 'सभी मुख्य खबरें — हमारे टेलीग्राम चैनल में।' : 'All the key stories — in our Telegram channel.'}
          </h3>
          <p className="mb-8 font-body text-base leading-relaxed text-gray-400">
            {isHindi
              ? 'जनवादा न्यूज़ की सबसे महत्वपूर्ण खबरें, तीखा विश्लेषण और एक्सक्लूसिव अपडेट — सबसे पहले टेलीग्राम पर।'
              : "JanaVada News' most important stories, sharp analysis and exclusive updates — first on Telegram."}
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0088cc] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#0077b5] hover:shadow-lg hover:shadow-[#0088cc]/25"
          >
            <Send className="h-5 w-5" />
            {isHindi ? '@janavada पर जुड़ें' : 'Join @janavada'}
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 font-body text-xs text-gray-500">
            {isHindi ? 'टेलीग्राम पर मुफ्त। कभी भी छोड़ें।' : 'Free on Telegram. Leave anytime.'}
          </p>
        </div>
      </div>
    </div>
  );
}
