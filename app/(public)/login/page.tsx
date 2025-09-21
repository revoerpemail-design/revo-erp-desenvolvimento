'use client'

import { useState } from 'react'
import { supabase } from '@/infrastructure/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Por favor, informe seu e-mail')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
        },
      })

      if (error) {
        toast.error('Erro ao enviar magic link')
        return
      }

      toast.success('Magic link enviado! Verifique seu e-mail')
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Faça login em sua conta
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Insira seu e-mail e enviaremos um link mágico
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/10 dark:bg-zinc-900/30 border border-white/20 dark:border-white/10 shadow rounded-2xl p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                E-mail
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Magic Link'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
