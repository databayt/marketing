import { NextRequest } from 'next/server';
import { localizationMiddleware } from './src/components/internationalization/middleware';

// Matcher ignoring `/_next/`, `/api/`, and static files
export const config = {
  matcher: ['/((?!api|_next|_static|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)'],
};

export function middleware(request: NextRequest) {
  return localizationMiddleware(request);
}