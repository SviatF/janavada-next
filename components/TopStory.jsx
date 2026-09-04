import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/format';
import { getCategoryLabel } from '@/lib/categories';

export default function TopStory({ article, lang = 'en' }) {
  if (!article) return null;
  const href = '/' + lang + '/' + article.category + '/' + article.slug;

  return (
    <Link href={href} className="group block">
      <article className="relative min-h-[520px] overflow-hidden rounded-2xl bg-ink lg:min-h-[580px]">
        {article.featured_image && (
          <>
            <Image
              src={article.featured_image}
              alt={article.featured_image_alt || article.title}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
          </>
        )}
        <div className="relative z-10 flex min-h-[520px] items-end p-8 lg:min-h-[580px] lg:p-14">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {lang === 'hi' ? 'मुख्य समाचार' : 'Top Story'}
              </span>
              <span className="text-[12px] font-medium uppercase tracking-wider text-white/60">{getCategoryLabel(article.category, lang)}</span>
            </div>
            <h1 className="font-heading text-4xl leading-[1.06] text-white sm:text-5xl lg:text-6xl">{article.title}</h1>
            {(article.summary || article.subtitle) && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 lg:text-lg">{article.summary || article.subtitle}</p>
            )}
            <div className="mt-7 flex items-center gap-5 text-[13px] text-white/55">
              {article.author_name && <span className="font-semibold text-white/75">{article.author_name}</span>}
              <span>{formatDate(article.published_date || article.created_date, lang)}</span>
              <span className="ml-auto hidden items-center gap-2 font-semibold text-white/70 sm:flex">
                {lang === 'hi' ? 'लेख पढ़ें' : 'Read story'} <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
