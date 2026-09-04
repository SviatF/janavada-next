# JanaVada Next

SEO-first public frontend for JanaVada News.

## Architecture

- **Base44** remains the editorial CMS / AI pipeline.
- **Next.js App Router** serves the public website.
- Public article data is fetched on the server and cached.
- Article/category/home pages render as server HTML.
- EN and HI use separate URLs.
- Publish events can call `POST /api/revalidate` to refresh affected pages.
- `sitemap.xml`, `news-sitemap.xml`, robots, metadata and NewsArticle JSON-LD are generated server-side.

## Environment

Copy `.env.example` to `.env.local`.

```
BASE44_APP_ID=6a2b3ec4c430dbb80ac96a13
BASE44_FUNCTIONS_VERSION=preview
REVALIDATE_SECRET=<strong-random-secret>
NEXT_PUBLIC_SITE_URL=https://janavada.com
```

`BASE44_APP_BASE_URL` can remain empty unless the Base44 backend requires an explicit URL.

## Important

The existing `SviatF/janavada-news` repository remains untouched. It continues to be the Base44 CMS. This repository is the new public frontend.
