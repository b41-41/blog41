import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fallbackLng, languages } from './i18n/settings';

export function middleware(request: NextRequest) {
  const isProduction = process.env.NODE_ENV === 'production';
  const { pathname } = request.nextUrl;
  
  if (isProduction && (pathname.startsWith('/add') || pathname.includes('/edit/'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  const isLocalhost = request.headers.get('host')?.includes('localhost') || 
                     request.headers.get('host')?.includes('127.0.0.1');
                     
  if (!isLocalhost && pathname.includes('/edit/')) {
    const langMatch = pathname.match(/^\/([^/]+)\//);
    const lang = langMatch ? langMatch[1] : fallbackLng;
    
    return NextResponse.redirect(new URL(`/${lang}`, request.url));
  }
  
  const pathnameHasLng = languages.some(
    lng => pathname.startsWith(`/${lng}/`) || pathname === `/${lng}`
  );
  
  if (!pathnameHasLng) {
    const newUrl = new URL(request.url);
    
    newUrl.pathname = `/${fallbackLng}${pathname}`;
    
    return NextResponse.redirect(newUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\.png$).*)'],
};
