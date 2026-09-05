import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { getCategoryLabel } from '@/lib/categories';
import { timeAgo } from '@/lib/format';

const CATEGORY_COLORS = {
  ai: 'text-violet-700 bg-violet-50',
  technology: 'text-cyan-700 bg-cyan-50',
  business: 'text-ashoka bg-indigo-50',
  economy: 'text-emerald bg-emerald-50',
  startups: 'text-amber-700 bg-amber-50',
  opinion: 'text-saffron bg-orange-50',
  'government-schemes': 'text-ashoka bg-indigo-50',
  'india-news': 'text-red-700 bg-red-50',
  world: 'text-gray-700 bg-gray-50',
  finance: 'text-emerald bg-emerald-50',
  education: 'text-violet-700 bg-violet-50',
  jobs: 'text-amber-700 bg-amber-50',
  explainers: 'text-cyan-700 bg-cyan-50',
};

function CategoryBadge({ category, lang }) {
  const colorClass = CATEGORY_COLORS[category] || 'text-gray-700 bg-gray-50';
  return (
    <span className={'inline-block rounded-full px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[.07em] ' + colorClass}>
      {getCategoryLabel(category, lang)}
    </span>
  );
}

export default function ArticleCard({ article, variant = 'default', lang = 'en' }) {
  const url = '/' + lang + '/' + article.category + '/' + article.slug;
  const summary = article.summary || article.subtitle;

  if (variant === 'compact') {
    return (
      <Link href={url} className="group -mx-3 flex gap-4 rounded-lg border-b border-border px-3 py-4 transition-colors last:border-0 hover:bg-ivory">
        {article.featured_image && (
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
            <Image src={article.featured_image} alt={article.featured_image_alt || article.title} fill sizes="80px" className="object-cover" />
          </div>
        )}
        <div className="flex min-w-0 flex-col justify-center">
          <CategoryBadge category={article.category} lang={lang} />
          <h3 className="mt-1.5 line-clamp-2 font-heading text-[15px] leading-snug text-ink transition-colors group-hover:text-ashoka">{article.title}</h3>
          <span className="mt-1.5 font-body text-[11px] text-gray-400">{timeAgo(article.published_date || article.created_date, lang)}</span>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={url} className="group flex flex-col gap-5 transition duration-300 hover:-translate-y-0.5 sm:flex-row">
        {article.featured_image && (
          <div className="relative h-32 shrink-0 overflow-hidden rounded-lg sm:h-auto sm:w-44">
            <Image src={article.featured_image} alt={article.featured_image_alt || article.title} fill sizes="176px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        )}
        <div className="flex min-w-0 flex-col justify-center">
          <CategoryBadge category={article.category} lang={lang} />
          <h3 className="mt-2 line-clamp-2 font-heading text-xl leading-snug text-ink transition-colors group-hover:text-ashoka">{article.title}</h3>
          {summary && <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-gray-500">{summary}</p>}
          <div className="mt-3 flex items-center gap-3 font-body text-[11px] text-gray-400">
            {article.author_name && <span className="font-medium text-gray-500">{article.author_name}</span>}
            {article.author_name && <span>·</span>}
            <span>{timeAgo(article.published_date || article.created_date, lang)}</span>
            {article.reading_time && <><span>·</span><span>{article.reading_time} {lang === 'hi' ? 'मिनट' : 'min'}</span></>}
            <span className="ml-auto flex items-center gap-1"><Eye className="h-3 w-3" /><span>{Number(article.views || 0).toLocaleString()}</span></span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={url} className="group block h-full transition duration-300 hover:-translate-y-0.5">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition-shadow duration-300 group-hover:shadow-lg">
        {article.featured_image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image src={article.featured_image} alt={article.featured_image_alt || article.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        )}
        <div className={"flex flex-1 flex-col " + (article.featured_image ? "p-5" : "p-6")}>
          <CategoryBadge category={article.category} lang={lang} />
          <h3 className="mt-2.5 line-clamp-2 flex-1 font-heading text-[17px] leading-snug text-ink transition-colors group-hover:text-ashoka">{article.title}</h3>
          {summary && <p className="mt-2 line-clamp-2 font-body text-[13px] leading-relaxed text-gray-500">{summary}</p>}
          <div className="mt-4 flex items-center gap-2 border-t border-[#F3F0EA] pt-4 font-body text-[11px] text-gray-400">
            {article.author_name && <span className="font-semibold text-gray-500">{article.author_name}</span>}
            {article.author_name && <span>·</span>}
            <span>{timeAgo(article.published_date || article.created_date, lang)}</span>
            <span className="ml-auto flex items-center gap-1">
              {article.reading_time && <><span>{article.reading_time} {lang === 'hi' ? 'मिनट' : 'min'}</span><span>·</span></>}
              <Eye className="h-3 w-3" /><span>{Number(article.views || 0).toLocaleString()}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
