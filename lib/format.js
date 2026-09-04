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
