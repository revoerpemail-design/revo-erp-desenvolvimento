'use client'

import { formatCurrency } from '@/lib/utils'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign 
} from 'lucide-react'

const stats = [
  {
    name: 'Receita Total',
    value: 'R$ 45.231,89',
    change: '+20.1%',
    changeType: 'increase' as const,
    icon: DollarSign,
  },
  {
    name: 'Pedidos Este Mês',
    value: '241',
    change: '+10.2%',
    changeType: 'increase' as const,
    icon: ShoppingCart,
  },
  {
    name: 'Clientes Ativos',
    value: '89',
    change: '+5.1%',
    changeType: 'increase' as const,
    icon: Users,
  },
  {
    name: 'Produtos em Estoque',
    value: '1.247',
    change: '-2.3%',
    changeType: 'decrease' as const,
    icon: Package,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu negócio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="backdrop-blur-md bg-white/10 dark:bg-zinc-900/30 border border-white/20 dark:border-white/10 shadow rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className="rounded-2xl backdrop-blur-md bg-white/10 dark:bg-zinc-900/30 p-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              {stat.changeType === 'increase' ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'increase'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                vs último mês
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="backdrop-blur-md bg-white/10 dark:bg-zinc-900/30 border border-white/20 dark:border-white/10 shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Atividade Recente
          </h3>
          <div className="space-y-4">
            {[
              { action: 'Novo pedido #1234', time: '2 min atrás' },
              { action: 'Cliente João Silva cadastrado', time: '15 min atrás' },
              { action: 'Produto XYZ atualizado', time: '1 hora atrás' },
              { action: 'Pagamento recebido #1233', time: '2 horas atrás' },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-foreground">{activity.action}</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/10 dark:bg-zinc-900/30 border border-white/20 dark:border-white/10 shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Próximas Tarefas
          </h3>
          <div className="space-y-4">
            {[
              { task: 'Revisar pedido #1235', priority: 'Alta' },
              { task: 'Contatar fornecedor ABC', priority: 'Média' },
              { task: 'Atualizar preços', priority: 'Baixa' },
              { task: 'Backup mensal', priority: 'Média' },
            ].map((task, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-foreground">{task.task}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'Alta'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : task.priority === 'Média'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
