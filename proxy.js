import { NextResponse } from 'next/server';

export function proxy(request) {
  const response = NextResponse.next();
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '')
    .split(':')[0]
    .toLowerCase();

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
