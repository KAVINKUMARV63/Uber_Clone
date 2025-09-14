import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Match all except sign-in, sign-up, and Next.js internals/static files
    '/((?!_next|static|favicon.ico|sign-in|sign-up).*)',
    '/(api|trpc)(.*)',
  ],
}




