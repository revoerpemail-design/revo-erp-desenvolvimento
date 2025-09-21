import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Proteger rotas do app
  if (req.nextUrl.pathname.startsWith('/app')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Redirecionar usuário logado da página de login
  if (req.nextUrl.pathname === '/login') {
    if (session) {
      return NextResponse.redirect(new URL('/app', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/app/:path*', '/login'],
}
