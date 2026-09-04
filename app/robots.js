import { SITE_URL } from '@/lib/site';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/login', '/en/search', '/hi/search'] },
    ],
    sitemap: [SITE_URL + '/sitemap.xml', SITE_URL + '/news-sitemap.xml'],
    host: SITE_URL,
  };
}
