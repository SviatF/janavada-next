export function formatDate(value, lang = 'en') {
  if (!value) return '';
  try {
    return new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(new Date(value));
  } catch {
    return '';
  }
}

export function timeAgo(value, lang = 'en') {
  if (!value) return '';
  const seconds = Math.floor((Date.now() - new Date(value).getTime()) / 1000);
  const hi = lang === 'hi';
  if (seconds < 60) return hi ? 'अभी अभी' : 'Just now';
  if (seconds < 3600) return hi ? Math.floor(seconds / 60) + ' मिनट पहले' : Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return hi ? Math.floor(seconds / 3600) + ' घंटे पहले' : Math.floor(seconds / 3600) + 'h ago';
  if (seconds < 604800) return hi ? Math.floor(seconds / 86400) + ' दिन पहले' : Math.floor(seconds / 86400) + 'd ago';
  return formatDate(value, lang);
}
