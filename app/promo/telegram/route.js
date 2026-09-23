import { GET as getLegacyPromo } from '../tg/route';

const GTM_ID = 'GTM-T9SSRVJ4';
const CANONICAL_URL = 'https://janavada.com/promo/telegram';

const gtmHead = `<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
</script>`;

const gtmNoScript = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>`;

export async function GET() {
  const legacyResponse = await getLegacyPromo();
  let html = await legacyResponse.text();

  html = html
    .replace(
      '<meta name="robots" content="noindex,nofollow,noarchive" />',
      '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />'
    )
    .replace(
      '<link rel="icon" href="/favicon.webp" />',
      `<link rel="icon" href="/favicon.webp" />\n  <link rel="canonical" href="${CANONICAL_URL}" />\n  ${gtmHead}`
    )
    .replace('<body>', `<body>\n  ${gtmNoScript}`)
    .replace(/placement:'promo_tg'/g, "placement:'promo_telegram'");

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60, s-maxage=300',
      'x-robots-tag': 'index, follow, max-image-preview:large',
    },
  });
}
