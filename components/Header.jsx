'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Menu, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CATEGORIES, getCategoryLabel } from '@/lib/categories';
import JanaVadaLogo from '@/components/JanaVadaLogo';

const PRIMARY_NAV = CATEGORIES.slice(0, 7);

function switchLanguage(pathname, target) {
  const parts = pathname.split('/');
  if (parts[1] === 'en' || parts[1] === 'hi') parts[1] = target;
  else parts.splice(1, 0, target);
  return parts.join('/') || '/' + target;
}

export default function Header({ lang = 'en' }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const otherLang = lang === 'en' ? 'hi' : 'en';

  const dateLabel = useMemo(() => new Intl.DateTimeFormat(
    lang === 'hi' ? 'hi-IN' : 'en-IN',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' }
  ).format(new Date()), [lang]);

  function submitSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push('/' + lang + '/search?q=' + encodeURIComponent(query.trim()));
    setSearchOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="hidden border-b border-border bg-ivory lg:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-6">
          <span className="text-[10px] uppercase tracking-[.12em] text-gray-500">{dateLabel}</span>
          <span className="text-[10px] uppercase tracking-[.12em] text-gray-500">
            {lang === 'hi'
              ? 'हम सिर्फ खबरें नहीं देते। हम समझाते हैं कि भारत के लिए इसका क्या मतलब है।'
              : "We don't just report news. We explain what it means for India."}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between py-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 md:hidden"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href={'/' + lang} aria-label="JanaVada home">
            <JanaVadaLogo lang={lang} />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href={switchLanguage(pathname, otherLang)}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-indigo-50 hover:text-ashoka"
            >
              <Globe size={14} />
              {otherLang === 'hi' ? 'हिन्दी' : 'English'}
            </Link>
            {searchOpen ? (
              <form onSubmit={submitSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={lang === 'hi' ? 'लेख, विषय खोजें...' : 'Search articles, topics...'}
                  className="w-72 rounded-lg border border-border bg-ivory px-3 py-2 text-sm outline-none focus:border-ashoka"
                />
                <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={17} /></button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="flex h-9 w-9 items-center justify-center" aria-label="Search">
                <Search size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className="hidden border-t border-border md:block">
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-6">
          {PRIMARY_NAV.map(cat => {
            const href = '/' + lang + '/category/' + cat.slug;
            const active = pathname === href;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={'whitespace-nowrap border-b-2 px-4 py-3 text-[13px] font-medium transition-colors ' +
                  (active ? 'border-ashoka text-ashoka' : 'border-transparent text-gray-600 hover:text-ashoka')}
              >
                {getCategoryLabel(cat.slug, lang)}
              </Link>
            );
          })}
          {['explainers', 'opinion'].map(slug => (
            <Link
              key={slug}
              href={'/' + lang + '/category/' + slug}
              className={'whitespace-nowrap border-b-2 px-4 py-3 text-[13px] font-semibold ' +
                (slug === 'opinion' ? 'text-saffron' : 'text-gray-600')}
            >
              {getCategoryLabel(slug, lang)}
            </Link>
          ))}
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-white p-4 md:hidden">
          <form onSubmit={submitSearch} className="mb-4">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'लेख खोजें...' : 'Search articles...'}
              className="w-full rounded-lg border border-border bg-ivory px-3 py-2.5 text-sm"
            />
          </form>
          <div className="grid grid-cols-2">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={'/' + lang + '/category/' + cat.slug}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-indigo-50"
              >
                {getCategoryLabel(cat.slug, lang)}
              </Link>
            ))}
          </div>
          <Link
            href={switchLanguage(pathname, otherLang)}
            className="mt-3 flex items-center gap-2 border-t border-border px-3 pt-4 text-[13px] font-semibold text-gray-600"
          >
            <Globe size={16} />
            {otherLang === 'hi' ? 'हिन्दी में पढ़ें' : 'Read in English'}
          </Link>
        </div>
      )}
    </header>
  );
}
