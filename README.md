# RotaFlux

A transport-management frontend prototype focused on operational dashboards, shipment boards and fleet/finance screens.

**Status:** frontend prototype. **Stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router and Zustand.

## Scope and boundaries

The interface uses demonstration data. Login, operational and finance screens do not establish backend authorization, live tracking, payment processing or production persistence.

## Explore and run

The [existing demo link](https://emilabs.cloud/demo/rotaflux/) is retained from the project documentation; hosting availability and interactive behavior must be checked separately.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The existing `build` script performs TypeScript compilation and a Vite build. This editorial update does not establish a successful build, accessibility audit or automated test suite.

## Documentação em português

A apresentação original do projeto continua abaixo, com seus detalhes visuais e de navegação. As funcionalidades descritas referem-se ao protótipo.

---

# RotaFlux 🚛

> **Controle sua operação de transporte em tempo real.**  
> Protótipo de um sistema moderno de gestão de transporte (TMS), com interface premium, dashboards operacionais e experiência pensada para eficiência logística.

## 🔗 Demo online
[Acessar demonstração](https://emilabs.cloud/demo/rotaflux/)

## 📸 Visão geral

O **RotaFlux** é um protótipo frontend de um **TMS (Transportation Management System)** criado para simular uma plataforma completa de gestão de transporte, com foco em **operações**, **embarques**, **frota**, **financeiro**, **cadastros** e **relatórios**.

A proposta do projeto foi construir uma experiência de produto moderna e organizada, capaz de atender rotinas operacionais de empresas de transporte e logística com uma interface clara, intuitiva e visualmente sofisticada.

O sistema foi pensado para centralizar a operação em uma única plataforma, facilitando:
- acompanhamento de embarques
- visão da frota e motoristas
- gestão financeira
- controle de cadastros e tabelas
- visualização de indicadores e relatórios

---

## ✨ Principais funcionalidades

### Área pública
- Landing page com apresentação comercial do produto
- Seções de recursos, diferenciais, preços e CTA
- Interface moderna com foco em conversão

### Área logada
- Dashboard com KPIs, gráficos e alertas
- Gestão visual da operação
- Controle de embarques
- Gestão de frota, motoristas e abastecimentos
- Visão financeira da operação
- Cadastros estratégicos do sistema
- Relatórios e configurações

---

## 🧩 Módulos do sistema

### Dashboard
Visão geral da operação com métricas, gráficos, tendências e alertas relevantes para tomada de decisão.

### Operação
Kanban visual de embarques por status, permitindo acompanhar o andamento da operação de forma prática e intuitiva.

### Embarques
Listagem e gestão de embarques com fluxo estruturado para criação e acompanhamento.

### Frota
Gestão de veículos, motoristas, manutenções e abastecimentos.

### Financeiro
Controle de faturas, custos e análises financeiras relacionadas à operação.

### Cadastros
Gerenciamento de clientes, fornecedores, rotas e tabelas de preço.

### Relatórios
Visualização de relatórios operacionais com foco em análise e exportação.

### Configurações
Preferências do usuário, dados da empresa, contas e personalizações do sistema.

---

## 🧠 Diferenciais do projeto

- Simulação realista de um produto SaaS para logística
- Interface premium com UX intuitiva
- Estrutura modular de fácil expansão
- Dashboard orientado à tomada de decisão
- Fluxo operacional visual e organizado
- Design system consistente e reutilizável
- Suporte a tema claro e escuro

---

## 👩‍💻 Meu papel no projeto

Neste projeto, fui responsável por:
- concepção do produto
- definição da arquitetura frontend
- design da experiência do usuário
- criação da interface visual
- organização de componentes e páginas
- construção dos fluxos principais do sistema
- simulação da experiência completa da plataforma

---

## 🛠️ Stack utilizada

| Tecnologia | Uso |
|------------|-----|
| React 18 | Interface da aplicação |
| TypeScript | Tipagem estática |
| Vite | Build tool |
| TailwindCSS | Estilização |
| React Router | Navegação SPA |
| TanStack Query | Simulação de gerenciamento de dados |
| Zustand | Estado global |
| Framer Motion | Animações |
| Recharts | Gráficos e visualizações |
| React Hook Form | Formulários |
| Zod | Validação |
| Lucide React | Ícones |

---

## 🎨 Design System

### Paleta de cores
| Nome | Valor | Uso |
|------|-------|-----|
| Brand / Primary | `#2563EB` | Ações principais, links e destaques |
| Secondary | `#06B6D4` | Informações e elementos secundários |
| Accent | `#F59E0B` | Alertas e destaques |
| Success | `#22C55E` | Status positivos |
| Danger | `#EF4444` | Erros e ações destrutivas |

### Tipografia
- **Headings:** Sora
- **Body/UI:** Inter

### Componentes disponíveis
- Buttons
- Inputs
- Selects
- Textareas
- Badges e chips de status
- Cards
- Modals
- Drawers
- Tables
- Tabs
- Toasts
- Skeletons
- Empty states
- KPI cards
- Chart cards
- Tooltips
- Dropdown menus
- Filter bars

---

## 🌙 Tema claro e escuro

O sistema conta com suporte a **modo claro e escuro**, com preferência persistida localmente para melhorar a experiência do usuário.

---

## 📊 Dados mockados

O projeto utiliza **dados mockados realistas** para simular o comportamento de uma aplicação real de logística.

Essa camada inclui:
- fake API com atraso artificial
- dados fictícios para clientes, motoristas, veículos, embarques, faturas e rotas
- integração com TanStack Query para simular carregamento de dados
- uso de Zustand para persistência local de estados

---

## 🔐 Acesso à demonstração

Para acessar a área logada, utilize:

- **Email:** `demo@rotaflux.com`
- **Senha:** `demo123`

> Também é possível testar com qualquer email e senha contendo 6 ou mais caracteres.

---

## 📱 Responsividade

O sistema foi pensado com abordagem **desktop-first**, mas com suporte completo a telas menores, incluindo:
- sidebar colapsável
- layouts responsivos
- navegação mobile otimizada

---

## ⚡ Performance

Algumas decisões aplicadas no projeto:
- lazy loading de componentes
- skeleton loading para carregamento
- debounce em buscas
- animações otimizadas com Framer Motion

---

## 🚀 Como rodar localmente

```bash
pnpm install
pnpm dev
pnpm build

```
