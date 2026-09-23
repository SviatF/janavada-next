import { NextResponse } from 'next/server';

export function proxy(request) {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '')
    .split(':')[0]
    .toLowerCase();

  if (request.nextUrl.pathname === '/promo/tg') {
    const url = request.nextUrl.clone();
    url.pathname = '/promo/telegram';
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();

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
