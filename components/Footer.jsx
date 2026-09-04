import Link from 'next/link';
import { CATEGORIES, getCategoryLabel } from '@/lib/categories';
import JanaVadaLogo from '@/components/JanaVadaLogo';

export default function Footer({ lang = 'en' }) {
  const hi = lang === 'hi';
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="h-[3px] bg-ashoka" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href={'/' + lang}><JanaVadaLogo size={36} theme="light" lang={lang} /></Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
              {hi
                ? 'हम सिर्फ खबरें नहीं देते। हम समझाते हैं कि भारत के लिए इसका क्या मतलब है।'
                : "We don't just report news. We explain what it means for India. Modern media for the people."}
            </p>
            <div className="mt-6 text-sm font-medium text-gold">{hi ? 'मेड इन इंडिया' : 'Made in India'} 🇮🇳</div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[.1em] text-gray-500">{hi ? 'कवरेज' : 'Coverage'}</h4>
            <div className="space-y-2.5">
              {CATEGORIES.slice(0, 7).map(cat => (
                <Link key={cat.slug} href={'/' + lang + '/category/' + cat.slug} className="block text-[13px] text-gray-400 hover:text-white">
                  {getCategoryLabel(cat.slug, lang)}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[.1em] text-gray-500">{hi ? 'अन्य' : 'More'}</h4>
            <div className="space-y-2.5">
              {CATEGORIES.slice(7).map(cat => (
                <Link key={cat.slug} href={'/' + lang + '/category/' + cat.slug} className="block text-[13px] text-gray-400 hover:text-white">
                  {getCategoryLabel(cat.slug, lang)}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[.1em] text-gray-500">{hi ? 'कंपनी' : 'Company'}</h4>
            <div className="space-y-2.5">
              <Link href={'/' + lang + '/about'} className="block text-[13px] text-gray-400 hover:text-white">{hi ? 'हमारे बारे में' : 'About Us'}</Link>
              <Link href={'/' + lang + '/contact'} className="block text-[13px] text-gray-400 hover:text-white">{hi ? 'संपर्क' : 'Contact'}</Link>
              <Link href={'/' + lang + '/privacy'} className="block text-[13px] text-gray-400 hover:text-white">{hi ? 'गोपनीयता नीति' : 'Privacy Policy'}</Link>
              <Link href={'/' + lang + '/terms'} className="block text-[13px] text-gray-400 hover:text-white">{hi ? 'उपयोग की शर्तें' : 'Terms of Use'}</Link>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[12px] text-gray-600 sm:flex-row">
          <p>© {new Date().getFullYear()} JanaVada News. All rights reserved.</p>
          <p>{hi ? 'लोगों के लिए खबरें। भारत को समझना।' : 'News for the people. Understanding India.'}</p>
        </div>
      </div>
    </footer>
  );
}
