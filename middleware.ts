// middleware edge function: not in a front end environment, not in a node environment, in a webworker environment
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// pages we want to protect
const signedInPages = ['/', '/playlist', '/library'];

export default function middleware(req: NextRequest) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    // use of get required for Next.js > 12.2
    const token = req.cookies.get('P4L_ACCESS_TOKEN');

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/signin';

      return NextResponse.redirect(url);
    }
  }
}
