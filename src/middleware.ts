import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Если задан ADMIN_PANEL_SLUG, прямой вход на /admin закрыт; открывайте /{slug} из .env */
export function middleware(request: NextRequest) {
  const slug = process.env.ADMIN_PANEL_SLUG?.trim();
  if (!slug) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
