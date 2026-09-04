import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { timeAgo } from '@/lib/format';

export default function AnalysisBlock({ articles = [], lang = 'en' }) {
  if (!articles.length) return null;
  const [lead, ...rest] = articles.slice(0, 4);
  const isHindi = lang === 'hi';

  return (
    <div className="overflow-hidden rounded-2xl bg-ink">
      <div className="flex items-center justify-between border-b border-white/10 px-8 pb-6 pt-8">
        <div className="flex items-center gap-3">
          <div className="h-7 w-[3px] rounded-full bg-gold" />
          <h2 className="font-heading text-[26px] text-white">{isHindi ? 'जनवादा विश्लेषण' : 'JanaVada Analysis'}</h2>
        </div>
        <Link
          href={'/' + lang + '/category/opinion'}
          className="group flex items-center gap-1.5 text-[13px] font-semibold text-gold transition-colors hover:text-gold/70"
        >
          {isHindi ? 'सभी विश्लेषण' : 'All analysis'}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5">
        <Link
          href={'/' + lang + '/' + lead.category + '/' + lead.slug}
          className="group border-b border-white/10 p-8 transition-colors hover:bg-white/5 lg:col-span-3 lg:border-b-0 lg:border-r"
        >
          {lead.featured_image && (
            <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={lead.featured_image}
                alt={lead.featured_image_alt || lead.title}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          )}
          <span className="text-[11px] font-bold uppercase tracking-[.07em] text-gold">{isHindi ? 'विश्लेषण' : 'Analysis'}</span>
          <h3 className="mb-3 mt-2 font-heading text-2xl leading-tight text-white transition-colors group-hover:text-white/80 lg:text-3xl">{lead.title}</h3>
          {(lead.summary || lead.subtitle) && (
            <p className="line-clamp-3 font-body text-[14px] leading-relaxed text-gray-400">{lead.summary || lead.subtitle}</p>
          )}
          <div className="mt-4 flex items-center gap-2 font-body text-[11px] text-gray-500">
            {lead.author_name && <span className="font-semibold text-gray-400">{lead.author_name}</span>}
            {lead.author_name && <span>·</span>}
            <span>{timeAgo(lead.published_date || lead.created_date, lang)}</span>
          </div>
        </Link>

        <div className="divide-y divide-white/10 lg:col-span-2">
          {rest.map(a => (
            <Link
              key={a.id}
              href={'/' + lang + '/' + a.category + '/' + a.slug}
              className="group block p-6 transition-colors hover:bg-white/5"
            >
              <span className="text-[11px] font-bold uppercase tracking-[.07em] text-gold/70">{isHindi ? 'विश्लेषण' : 'Analysis'}</span>
              <h3 className="mt-1.5 line-clamp-3 font-heading text-[17px] leading-snug text-white transition-colors group-hover:text-white/80">{a.title}</h3>
              <span className="mt-2 block font-body text-[11px] text-gray-500">{timeAgo(a.published_date || a.created_date, lang)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
