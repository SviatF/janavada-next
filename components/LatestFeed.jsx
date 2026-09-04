import Image from 'next/image';
import Link from 'next/link';
import { getCategoryLabel } from '@/lib/categories';
import { timeAgo } from '@/lib/format';

export default function LatestFeed({ articles = [], sidebarArticles = [], lang = 'en' }) {
  if (!articles.length) return null;
  const isHindi = lang === 'hi';

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {articles.map(a => (
          <Link
            key={a.id}
            href={'/' + lang + '/' + a.category + '/' + a.slug}
            className="group -mx-4 flex gap-5 rounded-xl p-4 transition-all duration-200 hover:bg-white hover:shadow-card"
          >
            {a.featured_image ? (
              <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
                <Image
                  src={a.featured_image}
                  alt={a.featured_image_alt || a.title}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex h-24 w-32 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 sm:h-28 sm:w-40">
                <span className="font-heading text-lg text-ashoka opacity-30">JV</span>
              </div>
            )}
            <div className="flex min-w-0 flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[.07em] text-ashoka">
                {getCategoryLabel(a.category, lang)}
              </span>
              <h3 className="mt-1.5 line-clamp-2 font-heading text-[17px] leading-snug text-ink transition-colors group-hover:text-ashoka sm:text-[19px]">
                {a.title}
              </h3>
              {(a.summary || a.subtitle) && (
                <p className="mt-1 hidden line-clamp-1 font-body text-[13px] text-gray-500 sm:block">{a.summary || a.subtitle}</p>
              )}
              <div className="mt-2 flex items-center gap-2 font-body text-[11px] text-gray-400">
                {a.author_name && <span className="font-semibold text-gray-500">{a.author_name}</span>}
                {a.author_name && <span>·</span>}
                <span>{timeAgo(a.published_date || a.created_date, lang)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sidebarArticles.length > 0 && (
        <div>
          <h3 className="mb-4 border-b border-border pb-3 text-[11px] font-bold uppercase tracking-[.08em] text-gray-400">
            {isHindi ? 'और खबरें' : 'More Stories'}
          </h3>
          {sidebarArticles.map(a => (
            <Link
              key={a.id}
              href={'/' + lang + '/' + a.category + '/' + a.slug}
              className="group -mx-2 flex gap-3 rounded-lg border-b border-[#F5F2EC] px-2 py-3.5 transition-colors last:border-0 hover:bg-ivory"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-[.07em] text-ashoka">
                  {getCategoryLabel(a.category, lang)}
                </span>
                <h4 className="mt-0.5 line-clamp-2 font-heading text-[14px] leading-snug text-ink transition-colors group-hover:text-ashoka">
                  {a.title}
                </h4>
                <span className="mt-1 block font-body text-[11px] text-gray-400">
                  {timeAgo(a.published_date || a.created_date, lang)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
