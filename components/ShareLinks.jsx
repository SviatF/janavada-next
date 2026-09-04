import { Send } from 'lucide-react';

export default function ShareLinks({ title, url, lang = 'en' }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const telegram = 'https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedTitle;
  const x = 'https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedTitle;
  const whatsapp = 'https://wa.me/?text=' + encodedTitle + '%20' + encodedUrl;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[.08em] text-gray-400">{lang === 'hi' ? 'शेयर' : 'Share'}</span>
      <a href={telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-ashoka/30 hover:text-ashoka">
        <Send className="h-3.5 w-3.5" /> Telegram
      </a>
      <a href={x} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-ashoka/30 hover:text-ashoka">X</a>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-ashoka/30 hover:text-ashoka">WhatsApp</a>
    </div>
  );
}
