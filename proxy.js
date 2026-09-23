import { NextResponse } from 'next/server';

export function proxy(request) {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '')
    .split(':')[0]
    .toLowerCase();
  const pathname = request.nextUrl.pathname;

  // Force the Telegram promo landing through a plain static asset. This avoids
  // any framework-route/cache mismatch while keeping the public URL /promo/tg.
  let response;
  if (pathname === '/promo/tg' || pathname === '/promo/tg/') {
    const url = request.nextUrl.clone();
    url.pathname = '/tg-promo.html';
    response = NextResponse.rewrite(url);
  } else {
    response = NextResponse.next();
  }

  // Every temporary platform hostname must stay out of search indexes.
  // The custom production domain janavada.com remains indexable.
  if (host.endsWith('.vercel.app') || host.endsWith('.workers.dev')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
