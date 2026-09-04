import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, href, accent = false, description, lang = 'en' }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <div className="mb-1 flex items-center gap-3">
          <div className={'h-7 w-[3px] rounded-full ' + (accent ? 'bg-saffron' : 'bg-ashoka')} />
          <h2 className="font-heading text-[28px] leading-none tracking-tight text-ink">{title}</h2>
        </div>
        {description && (
          <p className="ml-[18px] mt-1 font-body text-[13px] text-gray-400">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1.5 pb-0.5 text-[13px] font-semibold text-ashoka transition-colors hover:text-ashoka/70"
        >
          {lang === 'hi' ? 'सभी देखें' : 'View all'}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
