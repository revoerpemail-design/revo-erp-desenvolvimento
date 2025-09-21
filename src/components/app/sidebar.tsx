'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Building2,
  Wrench,
  ClipboardList,
  Package,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Landmark,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { featureFlags } from '@/config/feature-flags'
import { supabase } from '@/infrastructure/supabase/client'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const navigation = [
  {
    name: 'Dashboard',
    href: '/app',
    icon: LayoutDashboard,
    flag: 'dashboard' as const,
  },
  {
    name: 'Clientes',
    href: '/app/clients',
    icon: Users,
    flag: 'clients' as const,
  },
  {
    name: 'Fornecedores',
    href: '/app/vendors',
    icon: Building2,
    flag: 'vendors' as const,
  },
  {
    name: 'Serviços',
    href: '/app/services',
    icon: Wrench,
    flag: 'services' as const,
  },
  {
    name: 'Ordens de Serviço',
    href: '/app/os',
    icon: ClipboardList,
    flag: 'os' as const,
  },
  {
    name: 'Produtos',
    href: '/app/products',
    icon: Package,
    flag: 'products' as const,
  },
  {
    name: 'Pedidos',
    href: '/app/orders',
    icon: ShoppingCart,
    flag: 'orders' as const,
  },
]

const financeNavigation = [
  {
    name: 'Contas a Receber',
    href: '/app/finance/ar',
    icon: CreditCard,
    flag: 'ar' as const,
  },
  {
    name: 'Contas a Pagar',
    href: '/app/finance/ap',
    icon: DollarSign,
    flag: 'ap' as const,
  },
  {
    name: 'Fluxo de Caixa',
    href: '/app/finance/cash',
    icon: Landmark,
    flag: 'cash' as const,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error('Erro ao fazer logout')
        return
      }
      toast.success('Logout realizado com sucesso')
    } catch (error) {
      toast.error('Erro inesperado ao fazer logout')
    }
  }

  const visibleNavigation = navigation.filter((item) => featureFlags[item.flag])
  const visibleFinanceNavigation = financeNavigation.filter(
    (item) => featureFlags.finance[item.flag]
  )

  return (
    <div className="flex h-full w-64 flex-col backdrop-blur-md bg-white/10 dark:bg-zinc-900/30 border-r border-white/20 dark:border-white/10">
      <div className="flex h-16 items-center justify-center border-b border-white/20 dark:border-white/10">
        <h1 className="text-xl font-bold text-foreground">ERP Moderno</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {visibleNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-2xl px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                isActive
                  ? 'bg-primary text-primary-foreground backdrop-blur-md bg-white/20 dark:bg-white/10'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}

        {visibleFinanceNavigation.length > 0 && (
          <>
            <div className="mt-8 mb-2">
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Financeiro
              </h3>
            </div>
            {visibleFinanceNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-2xl px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    isActive
                      ? 'bg-primary text-primary-foreground backdrop-blur-md bg-white/20 dark:bg-white/10'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      <div className="p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
