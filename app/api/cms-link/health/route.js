export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    ok: true,
    service: 'janavada-next',
    site: 'https://janavada.com',
    cmsLink: 'ready',
    publishingEnabled: false,
    articleSource: 'base44',
    time: new Date().toISOString(),
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
