import Image from 'next/image';
import Link from 'next/link';
import { Eye, TrendingUp } from 'lucide-react';
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

function TrendingItem({ article, rank, lang }) {
  const url = '/' + lang + '/' + article.category + '/' + article.slug;
  const colorClass = CATEGORY_COLORS[article.category] || 'text-gray-700 bg-gray-50';

  if (rank === 1) {
    return (
      <Link href={url} className="group block">
        <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-card transition-shadow duration-300 hover:shadow-lg">
          {article.featured_image ? (
            <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/3]">
              <Image src={article.featured_image} alt={article.featured_image_alt || article.title} fill sizes="(max-width: 640px) 100vw, 600px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-white">
                  <TrendingUp className="h-3 w-3" /> {lang === 'hi' ? '#1 ट्रेंडिंग' : '#1 Trending'}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className={'mb-2 inline-block rounded-full px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[.07em] ' + colorClass}>{getCategoryLabel(article.category, lang)}</span>
                <h3 className="mb-2 line-clamp-3 font-heading text-2xl leading-snug text-white transition-colors group-hover:text-blue-200">{article.title}</h3>
                {(article.summary || article.subtitle) && <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-white/75">{article.summary || article.subtitle}</p>}
                <div className="flex items-center gap-3 text-[12px] text-white/70">
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /><strong className="text-white">{Number(article._views14d || 0).toLocaleString()}</strong> {lang === 'hi' ? 'व्यूज़' : 'views'}</span>
                  <span>·</span>
                  <span>{timeAgo(article.published_date || article.created_date, lang)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[290px] flex-col justify-end p-6 sm:min-h-[330px]">
              <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-saffron px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-white">
                <TrendingUp className="h-3 w-3" /> {lang === 'hi' ? '#1 ट्रेंडिंग' : '#1 Trending'}
              </div>
              <span className={'mb-3 inline-block w-fit rounded-full px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[.07em] ' + colorClass}>{getCategoryLabel(article.category, lang)}</span>
              <h3 className="font-heading text-2xl leading-snug text-ink transition-colors group-hover:text-ashoka sm:text-[28px]">{article.title}</h3>
              {(article.summary || article.subtitle) && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">{article.summary || article.subtitle}</p>}
              <div className="mt-5 flex items-center gap-3 border-t border-[#F3F0EA] pt-4 text-[12px] text-gray-500">
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /><strong className="text-ink">{Number(article._views14d || 0).toLocaleString()}</strong> {lang === 'hi' ? 'व्यूज़' : 'views'}</span>
                <span>·</span>
                <span>{timeAgo(article.published_date || article.created_date, lang)}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (rank === 2 || rank === 3) {
    const badge = rank === 2 ? 'bg-ashoka' : 'bg-stone-500';
    return (
      <Link href={url} className="group block">
        <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-card transition-shadow duration-300 hover:shadow-lg">
          {article.featured_image ? (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={article.featured_image} alt={article.featured_image_alt || article.title} fill sizes="600px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />
              <div className="absolute left-3 top-3 z-10">
                <span className={'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-white ' + badge}>
                  <TrendingUp className="h-3.5 w-3.5" /> #{rank} {lang === 'hi' ? 'ट्रेंडिंग' : 'Trending'}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8">
                <span className={'mb-2 inline-block rounded-full px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[.07em] ' + colorClass}>{getCategoryLabel(article.category, lang)}</span>
                <h4 className="mb-2 line-clamp-3 font-heading text-lg leading-snug text-white transition-colors group-hover:text-blue-200 sm:text-xl">{article.title}</h4>
                <div className="flex items-center gap-2 text-[12px] text-white/70">
                  <Eye className="h-3.5 w-3.5" /><strong className="text-white">{Number(article._views14d || 0).toLocaleString()}</strong>
                  <span>·</span><span>{timeAgo(article.published_date || article.created_date, lang)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[180px] flex-col justify-between p-5">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className={'shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-white ' + badge}>#{rank}</span>
                  <span className={'inline-block rounded-full px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[.07em] ' + colorClass}>{getCategoryLabel(article.category, lang)}</span>
                </div>
                <h4 className="line-clamp-3 font-heading text-lg leading-snug text-ink transition-colors group-hover:text-ashoka sm:text-xl">{article.title}</h4>
                {(article.summary || article.subtitle) && <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-gray-500">{article.summary || article.subtitle}</p>}
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-[#F3F0EA] pt-3 text-[11px] text-gray-500">
                <Eye className="h-3 w-3" /><span className="font-semibold text-gray-500">{Number(article._views14d || 0).toLocaleString()}</span>
                <span>·</span><span>{timeAgo(article.published_date || article.created_date, lang)}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={url} className="group -mx-4 flex items-start gap-4 rounded-lg border-b border-[#F3F0EA] px-4 py-4 transition-colors last:border-0 hover:bg-ivory">
      <div className="w-8 shrink-0 text-center"><span className="font-body text-[15px] font-bold leading-none text-gray-300">#{rank}</span></div>
      {article.featured_image && (
        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md">
          <Image src={article.featured_image} alt={article.featured_image_alt || article.title} fill sizes="64px" className="object-cover" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <span className={'mb-1 inline-block rounded-full px-2 py-[2px] text-[10px] font-bold uppercase tracking-[.07em] ' + colorClass}>{getCategoryLabel(article.category, lang)}</span>
        <h4 className="line-clamp-2 font-heading text-[14px] leading-snug text-ink transition-colors group-hover:text-ashoka">{article.title}</h4>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
          <Eye className="h-3 w-3 shrink-0" />
          <span className="font-semibold text-gray-500">{Number(article._views14d || 0).toLocaleString()}</span>
          <span>·</span>
          <span>{timeAgo(article.published_date || article.created_date, lang)}</span>
        </div>
      </div>
    </Link>
  );
}

export default function TrendingNow({ articles = [], lang = 'en' }) {
  if (!articles.length) return null;
  const [rank1, rank2, rank3, ...rest] = articles.slice(0, 10);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-saffron" />
          <h2 className="font-body text-[13px] font-bold uppercase tracking-[.12em] text-ink">{lang === 'hi' ? 'अभी ट्रेंडिंग' : 'Trending Now'}</h2>
          <span className="font-body text-[11px] font-medium text-gray-500">{lang === 'hi' ? '— पिछले 14 दिन' : '— Last 14 days'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <TrendingItem article={rank1} rank={1} lang={lang} />
          {rank2 && <TrendingItem article={rank2} rank={2} lang={lang} />}
          {rank3 && <TrendingItem article={rank3} rank={3} lang={lang} />}
        </div>
        {rest.length > 0 && (
          <div className="rounded-xl border border-border bg-white px-4 py-2 shadow-card">
            {rest.map((article, idx) => <TrendingItem key={article.id} article={article} rank={idx + 4} lang={lang} />)}
          </div>
        )}
      </div>
    </section>
  );
}
