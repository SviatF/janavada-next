import Image from 'next/image';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { getCategoryLabel } from '@/lib/categories';
import { timeAgo } from '@/lib/format';

export default function FeaturedGrid({ articles = [], accentColor = '#1E3A8A', lang = 'en' }) {
  if (!articles.length) return null;
  const [lead, ...rest] = articles;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Link href={'/' + lang + '/' + lead.category + '/' + lead.slug} className="group block lg:col-span-2">
        <div className="h-full overflow-hidden rounded-xl border border-border bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
          {lead.featured_image ? (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={lead.featured_image}
                alt={lead.featured_image_alt || lead.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
              <span className="font-heading text-4xl text-ashoka opacity-20">JV</span>
            </div>
          )}
          <div className="p-6">
            <span className="text-[11px] font-bold uppercase tracking-[.07em]" style={{ color: accentColor }}>
              {getCategoryLabel(lead.category, lang)}
            </span>
            <h3 className="mb-3 mt-2 font-heading text-2xl leading-snug text-ink transition-colors group-hover:text-ashoka lg:text-[26px]">
              {lead.title}
            </h3>
            {(lead.summary || lead.subtitle) && (
              <p className="line-clamp-2 font-body text-[14px] leading-relaxed text-gray-500">{lead.summary || lead.subtitle}</p>
            )}
            <div className="mt-4 flex items-center gap-2 border-t border-[#F3F0EA] pt-4 font-body text-[11px] text-gray-400">
              {lead.author_name && <span className="font-semibold text-gray-500">{lead.author_name}</span>}
              {lead.author_name && <span>·</span>}
              <span>{timeAgo(lead.published_date || lead.created_date, lang)}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-6">
        {rest.slice(0, 3).map(a => <ArticleCard key={a.id} article={a} variant="compact" lang={lang} />)}
      </div>
    </div>
  );
}
