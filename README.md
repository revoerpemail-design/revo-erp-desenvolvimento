# ERP Moderno

Sistema ERP moderno e simples para PMEs, inspirado no Tiny ERP, com visual macOS Sonoma (glassmorphism/blur).

## Stack Tecnológica

- **Frontend**: Next.js 14 (App Router + RSC), TypeScript, Tailwind CSS
- **UI**: shadcn/ui (Radix UI) com glassmorphism
- **Backend**: Supabase (Auth, Database, RLS)
- **Testes**: Vitest (unit), Playwright (e2e)
- **CI/CD**: GitHub Actions

## Pré-requisitos

- Node.js 18+ 
- npm/yarn
- Conta Supabase

## Setup do Projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure suas credenciais do Supabase:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Fluxo de Autenticação (Magic Link)

1. **Login**: Acesse `/login`
2. **Email**: Informe seu e-mail e clique em "Enviar Magic Link"
3. **Verificação**: Verifique seu e-mail e clique no link recebido
4. **Redirecionamento**: Você será redirecionado automaticamente para `/app`

⚠️ **Importante**: Para testar localmente, você precisa configurar o Supabase com um e-mail real e configurar a URL de redirecionamento no dashboard do Supabase.

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor de desenvolvimento
npm run build         # Build para produção
npm run start         # Inicia servidor de produção

# Qualidade de código
npm run typecheck     # Verificação de tipos TypeScript
npm run lint          # ESLint
npm run lint:fix      # ESLint com correção automática

# Testes
npm run test          # Testes unitários (Vitest)
npm run test:watch    # Testes unitários em modo watch
npm run test:e2e      # Testes e2e (Playwright)
npm run test:e2e:ui   # Testes e2e com interface
```

## Feature Flags

As funcionalidades são controladas via feature flags em `src/config/feature-flags.ts`:

```typescript
export const featureFlags = {
  auth: true,        // ✅ Implementado
  shell: true,       // ✅ Implementado  
  dashboard: true,   // ✅ Implementado
  clients: false,    // 🚧 Próximo sprint
  vendors: false,    // 🚧 Futuro
  services: false,   // 🚧 Futuro
  os: false,         // 🚧 Futuro
  products: false,   // 🚧 Futuro
  orders: false,     // 🚧 Futuro
  finance: {
    ar: false,       // 🚧 Futuro
    ap: false,       // 🚧 Futuro
    cash: false,     // 🚧 Futuro
  },
}
```

Para ativar uma funcionalidade, altere o valor para `true` e reinicie o servidor.

## Acessibilidade

- **Navegação por teclado**: Tab, Enter, Esc
- **Foco visível**: Todos os elementos interativos têm foco visível
- **ARIA**: Labels e roles adequados em modais e menus
- **Contraste**: Atende padrão AA

### Atalhos de Teclado

- `Tab`: Navegar entre elementos
- `Enter`: Ativar botões/links
- `Esc`: Fechar modais/menus
- `Space`: Ativar botões

## Estrutura de Pastas

```
/
├── app/                          # Next.js App Router
│   ├── (public)/login/          # Páginas públicas
│   ├── (app-shell)/             # Layout da aplicação
│   └── globals.css              # Estilos globais
├── src/
│   ├── components/
│   │   ├── app/                 # Componentes específicos da app
│   │   ├── providers/           # Providers (Theme, etc)
│   │   └── ui/                  # Componentes base shadcn/ui
│   ├── config/                  # Configurações e feature flags
│   ├── infrastructure/          # Integração externa (Supabase)
│   └── lib/                     # Utilitários
├── tests/                       # Testes e2e
└── package.json
```

## Temas (Dark/Light)

O sistema possui suporte nativo a tema escuro/claro:

- **Detecção automática**: Respeita preferência do sistema
- **Persistência**: Tema escolhido é salvo localmente
- **Alternância**: Botão no header para alternar

## CI/CD (GitHub Actions)

O pipeline de CI executa:

1. **Type check**: Verificação de tipos TypeScript
2. **Lint**: ESLint com regras do projeto
3. **Testes unitários**: Vitest
4. **Build**: Verificação de build
5. **Testes e2e**: Playwright (opcional)

## Próximos Passos

### Sprint 1: CRUD de Clientes
- Implementar listagem, criação, edição e exclusão de clientes
- Formulários com validação
- Busca e filtros
- Paginação

### Funcionalidades Futuras
- Fornecedores
- Produtos e estoque
- Ordens de serviço
- Pedidos
- Financeiro (AR, AP, Fluxo de caixa)

## Contribuindo

1. Clone o repositório
2. Crie uma branch feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Crie um Pull Request

## Licença

Este projeto está sob licença MIT.
