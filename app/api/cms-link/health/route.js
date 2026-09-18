import { checkCmsConnection, cmsConfigured, cmsPublicBaseUrl } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cms = await checkCmsConnection();

  return Response.json({
    ok: true,
    service: 'janavada-next',
    site: 'https://janavada.com',
    cmsLink: cms.ok ? 'connected' : (cmsConfigured() ? 'configured-unreachable' : 'disabled'),
    cmsPublicUrl: cmsPublicBaseUrl(),
    cms,
    publishingEnabled: false,
    articleSource: cmsConfigured() ? 'hybrid-cms-priority' : 'base44-fallback',
    time: new Date().toISOString(),
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
