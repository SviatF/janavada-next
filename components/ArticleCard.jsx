import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { formatDate } from '@/lib/format';
import { getCategoryLabel } from '@/lib/categories';

const badge = {
  ai: 'text-violet-700 bg-violet-50',
  technology: 'text-cyan-700 bg-cyan-50',
  business: 'text-ashoka bg-indigo-50',
  economy: 'text-emerald bg-emerald-50',
  startups: 'text-amber-700 bg-amber-50',
  opinion: 'text-saffron bg-orange-50',
  'india-news': 'text-red-700 bg-red-50',
};

export default function ArticleCard({ article, lang = 'en', variant = 'default' }) {
  const href = '/' + lang + '/' + article.category + '/' + article.slug;
  const title = article.title;
  const summary = article.summary || article.subtitle;
  const categoryClass = badge[article.category] || 'text-gray-700 bg-gray-50';

  if (variant === 'horizontal') {
    return (
      <Link href={href} className="group grid gap-5 sm:grid-cols-[176px_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 sm:aspect-auto sm:min-h-32">
          {article.featured_image && (
            <Image
              src={article.featured_image}
              alt={article.featured_image_alt || title}
              fill
              sizes="176px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-col justify-center">
          <span className={'w-fit rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.07em] ' + categoryClass}>
            {getCategoryLabel(article.category, lang)}
          </span>
          <h3 className="mt-2 font-heading text-2xl leading-tight text-ink transition-colors group-hover:text-ashoka">{title}</h3>
          {summary && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">{summary}</p>}
          <div className="mt-3 flex gap-2 text-[11px] text-gray-400">
            {article.author_name && <span className="font-semibold text-gray-500">{article.author_name}</span>}
            <span>{formatDate(article.published_date || article.created_date, lang)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          {article.featured_image && (
            <Image
              src={article.featured_image}
              alt={article.featured_image_alt || title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className={'w-fit rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.07em] ' + categoryClass}>
            {getCategoryLabel(article.category, lang)}
          </span>
          <h3 className="mt-2.5 line-clamp-2 font-heading text-xl leading-snug text-ink transition-colors group-hover:text-ashoka">{title}</h3>
          {summary && <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-gray-500">{summary}</p>}
          <div className="mt-auto flex items-center gap-2 border-t border-[#F3F0EA] pt-4 text-[11px] text-gray-400">
            {article.author_name && <span className="font-semibold text-gray-500">{article.author_name}</span>}
            <span>{formatDate(article.published_date || article.created_date, lang)}</span>
            <span className="ml-auto flex items-center gap-1"><Eye size={12} />{Number(article.views || 0).toLocaleString()}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
