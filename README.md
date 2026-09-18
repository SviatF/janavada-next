# JanaVada Next

SEO-first public frontend for JanaVada News.

## Architecture

- **JanaVada CMS Worker** is the new automation and publishing authority.
- **Base44** remains available as a legacy content source during migration.
- Next.js reads both sources in hybrid mode; when the same `language + slug` exists in both, the CMS version wins.
- Public article data is fetched server-side and cached.
- Article/category/home pages render as server HTML.
- EN and HI use separate URLs.
- Publish/update events call `POST /api/revalidate` to invalidate article, category, home, sitemap and CMS cache tags.
- `sitemap.xml`, `news-sitemap.xml`, robots, metadata and NewsArticle JSON-LD are generated server-side.
- The legacy Base44 scheduled publisher is disabled; CMS/Worker cron is authoritative.

## Environment

Copy `.env.example` to `.env.local`.

```env
BASE44_APP_ID=6a2b3ec4c430dbb80ac96a13
BASE44_FUNCTIONS_VERSION=preview
REVALIDATE_SECRET=<strong-random-secret>
CMS_INVENTORY_SECRET=<same-secret-as-janavada-cms>
JANAVADA_CMS_PUBLIC_URL=https://janavada-cms-staging.oleg22777.workers.dev/api/public
NEXT_PUBLIC_SITE_URL=https://janavada.com
```

`JANAVADA_CMS_PUBLIC_URL=off` is an emergency rollback switch that returns the frontend to Base44-only reads. `BASE44_APP_BASE_URL` can remain empty unless the Base44 backend requires an explicit URL.

## Health check

`GET /api/cms-link/health` verifies the public CMS bridge and reports reachability, latency and current article-source mode.

## Migration safety

Production publishing stays controlled by `PUBLIC_SITE_PUBLISH_ENABLED` in the CMS Worker. The frontend can consume the CMS mirror while public publishing remains locked, allowing the data plane to be validated before new autonomous stories are released.
