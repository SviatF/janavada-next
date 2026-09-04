import Link from 'next/link';
import { Eye, TrendingUp } from 'lucide-react';
import { timeAgo } from '@/lib/format';

export default function TrendingBar({ articles = [], lang = 'en' }) {
  if (!articles.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
        <TrendingUp className="h-4 w-4 text-saffron" />
        <span className="text-[11px] font-bold uppercase tracking-[.08em] text-saffron">{lang === 'hi' ? 'अभी ट्रेंडिंग' : 'Trending Now'}</span>
      </div>
      <div className="divide-y divide-[#F5F2EC]">
        {articles.slice(0, 5).map((article, i) => (
          <Link
            key={article.id}
            href={'/' + lang + '/' + article.category + '/' + article.slug}
            className="group flex items-start gap-4 px-5 py-3.5 transition-colors hover:bg-ivory"
          >
            <span className={'mt-0.5 w-7 shrink-0 font-heading text-[22px] leading-none transition-colors group-hover:text-ashoka ' +
              (i === 0 ? 'text-saffron' : i === 1 ? 'text-ashoka' : i === 2 ? 'text-stone-500' : 'text-gray-300')}>
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="line-clamp-2 font-body text-[13px] font-semibold leading-snug text-ink transition-colors group-hover:text-ashoka">{article.title}</p>
              <div className="mt-1 flex items-center gap-2 font-body text-[11px] text-gray-400">
                <Eye className="h-3 w-3 shrink-0" />
                <span className="font-semibold text-gray-500">{Number(article._views14d || 0).toLocaleString()}</span>
                <span>·</span>
                <span>{timeAgo(article.published_date || article.created_date, lang)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
