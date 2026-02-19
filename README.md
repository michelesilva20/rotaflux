# RotaFlux

> **Controle sua operação de transporte em tempo real.**

Sistema de Gestão de Transporte (TMS) moderno, com interface premium e UX intuitiva.

![RotaFlux Preview](https://via.placeholder.com/1200x630/2563eb/ffffff?text=RotaFlux+TMS)

## 🚀 Tecnologias

- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS** - Estilização utilitária
- **React Router** - Roteamento SPA
- **TanStack Query** - Gerenciamento de estado do servidor
- **Zustand** - Estado global leve
- **Framer Motion** - Animações fluidas
- **Recharts** - Gráficos e visualizações
- **React Hook Form** + **Zod** - Formulários e validação
- **Lucide React** - Ícones

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/rotaflux.git

# Entre na pasta
cd rotaflux

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

## 🗺️ Mapa de Rotas

### Rotas Públicas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Landing | Página marketing com apresentação do produto |
| `/login` | Login | Autenticação de usuários |

### Rotas Privadas (requerem login)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/app` | Dashboard | Visão geral com KPIs, gráficos e alertas |
| `/app/operacao` | Operação | Kanban visual de embarques por status |
| `/app/embarques` | Embarques | Lista e gestão de embarques com wizard de criação |
| `/app/frota` | Frota | Veículos, motoristas, manutenções e abastecimentos |
| `/app/financeiro` | Financeiro | Faturas, custos e análises financeiras |
| `/app/cadastros` | Cadastros | Clientes, fornecedores, rotas e tabelas de preço |
| `/app/relatorios` | Relatórios | Relatórios operacionais e exportação |
| `/app/configuracoes` | Configurações | Perfil, empresa, preferências e usuários |

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── layout/          # Sidebar, Topbar, AppLayout
│   └── ui/              # Design System (Button, Card, Modal, etc.)
├── lib/
│   └── utils.ts         # Funções utilitárias
├── mocks/               # Dados mock realistas
│   ├── customers.ts
│   ├── drivers.ts
│   ├── vehicles.ts
│   ├── shipments.ts
│   ├── invoices.ts
│   ├── routes.ts
│   └── dashboard.ts
├── pages/
│   ├── Landing.tsx      # Página marketing
│   ├── Login.tsx        # Autenticação
│   └── app/             # Páginas da área logada
│       ├── Dashboard.tsx
│       ├── Operacao.tsx
│       ├── Embarques.tsx
│       ├── Frota.tsx
│       ├── Financeiro.tsx
│       ├── Cadastros.tsx
│       ├── Relatorios.tsx
│       └── Configuracoes.tsx
├── services/
│   └── fakeApi.ts       # Simulação de API com promises
├── store/
│   └── index.ts         # Estado global (Zustand)
├── types/
│   └── index.ts         # TypeScript types e enums
├── App.tsx              # Roteamento principal
├── main.tsx             # Entry point
└── index.css            # Estilos globais + Tailwind
```

## 🎨 Design System

### Paleta de Cores

| Nome | Valor | Uso |
|------|-------|-----|
| Brand/Primary | `#2563EB` | Ações principais, links, elementos de destaque |
| Secondary | `#06B6D4` | Elementos secundários, informações |
| Accent | `#F59E0B` | Alertas, avisos, destaques |
| Success | `#22C55E` | Confirmações, status positivo |
| Danger | `#EF4444` | Erros, ações destrutivas |

### Tipografia

- **Headings**: Sora (Google Fonts)
- **Body/UI**: Inter (Google Fonts)

### Componentes Disponíveis

| Componente | Descrição |
|------------|-----------|
| `Button` | Botões com variantes: primary, secondary, ghost, danger, outline |
| `Input` | Campo de texto com suporte a ícones e validação |
| `Select` | Select estilizado com opções |
| `Textarea` | Área de texto multilinha |
| `Badge/StatusChip` | Badges de status com cores semânticas |
| `Card` | Container com sombras e bordas suaves |
| `Modal` | Diálogos modais com animação |
| `Drawer` | Painéis laterais deslizantes |
| `Table` | Tabela configurável com loading e empty states |
| `Tabs` | Navegação por abas com animação |
| `Toast` | Notificações temporárias |
| `Skeleton` | Loading placeholders |
| `EmptyState` | Estados vazios ilustrados |
| `KPIStatCard` | Cards de métricas com tendência |
| `ChartCard` | Wrapper para gráficos Recharts |
| `PageHeader` | Cabeçalho de página com ações |
| `Tooltip` | Dicas de contexto |
| `DropdownMenu` | Menus dropdown |
| `FilterBar` | Barra de filtros com chips |

### Variantes de Botão

```tsx
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Perigo</Button>
<Button variant="outline">Outline</Button>
```

### Tamanhos

```tsx
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>
```

## 🌙 Tema Claro/Escuro

O sistema suporta modo claro e escuro. A preferência é salva no localStorage e aplicada automaticamente.

Para alternar o tema programaticamente:

```tsx
import { useAppStore } from '@/store';

const { setTheme } = useAppStore();
setTheme('dark'); // 'light' | 'dark' | 'system'
```

## 📊 Dados Mock

O sistema utiliza dados mock realistas para demonstração. Os dados são carregados através de uma fake API que simula latência de rede.

```tsx
import { api } from '@/services/fakeApi';

// Exemplo de uso com TanStack Query
const { data, isLoading } = useQuery({
  queryKey: ['shipments'],
  queryFn: api.shipments.getAll,
});
```

## 🔐 Autenticação (Mock)

Para acessar a área logada, utilize qualquer email e senha com 6+ caracteres.

**Credenciais de teste:**
- Email: `demo@rotaflux.com`
- Senha: `demo123`

## 📱 Responsividade

O sistema é **desktop-first** com suporte completo a dispositivos móveis:
- Sidebar colapsável em telas menores
- Layouts adaptativos com grid responsivo
- Menu mobile com navegação otimizada

## ⚡ Performance

- Lazy loading de componentes
- Skeleton loading durante carregamento
- Debounce em buscas
- Animações otimizadas com Framer Motion

## 🛠️ Scripts Disponíveis

```bash
pnpm dev      # Inicia servidor de desenvolvimento
pnpm build    # Build de produção
pnpm preview  # Preview do build de produção
pnpm lint     # Verifica erros de linting
```

## 📄 Licença

Este projeto é um protótipo para fins de demonstração.

---

Desenvolvido com ❤️ usando React + TypeScript
