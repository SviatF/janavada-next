export default function ArticleSection({ title, content, accent = false }) {
  if (!content) return null;

  return (
    <section className={'my-9 rounded-xl ' + (accent ? 'border border-gold/30 bg-amber-50/40 p-6 sm:p-7' : '')}>
      <div className="mb-4 flex items-center gap-3">
        <div className={'h-6 w-[3px] rounded-full ' + (accent ? 'bg-gold' : 'bg-ashoka')} />
        <h2 className="font-heading text-2xl leading-tight text-ink sm:text-[28px]">{title}</h2>
      </div>
      <div className="article-prose" dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}
