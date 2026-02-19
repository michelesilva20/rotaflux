import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Truck,
  Package,
  BarChart3,
  MapPin,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronDown,
  Play,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: Truck,
    title: 'Gestão de Frota',
    description: 'Controle completo de veículos, manutenções, abastecimentos e indicadores de performance.',
  },
  {
    icon: Package,
    title: 'Embarques',
    description: 'Gerencie embarques do planejamento à entrega com rastreamento em tempo real.',
  },
  {
    icon: BarChart3,
    title: 'Análises & Relatórios',
    description: 'Dashboards inteligentes e relatórios detalhados para tomada de decisão.',
  },
  {
    icon: MapPin,
    title: 'Rotas Otimizadas',
    description: 'Planejamento de rotas com custos de pedágio e estimativas precisas.',
  },
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Controle de ocorrências e gestão de riscos operacionais.',
  },
  {
    icon: Zap,
    title: 'Automação',
    description: 'Automatize processos e reduza erros com workflows inteligentes.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Cadastre sua operação',
    description: 'Configure clientes, rotas, veículos e motoristas em poucos minutos.',
  },
  {
    number: '02',
    title: 'Gerencie embarques',
    description: 'Crie e acompanhe embarques com status em tempo real e documentação digital.',
  },
  {
    number: '03',
    title: 'Analise resultados',
    description: 'Acesse dashboards e relatórios para otimizar sua operação continuamente.',
  },
];

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Diretor de Operações',
    company: 'TransLog Brasil',
    content: 'O RotaFlux transformou nossa operação. Reduzimos custos em 23% e aumentamos a pontualidade das entregas.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    name: 'Ana Paula Santos',
    role: 'Gerente de Logística',
    company: 'Express Cargas',
    content: 'Interface intuitiva e suporte excepcional. Nossos motoristas se adaptaram rapidamente ao sistema.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
  },
  {
    name: 'Roberto Alves',
    role: 'CEO',
    company: 'Rápido Transportes',
    content: 'A visibilidade em tempo real dos embarques melhorou significativamente a comunicação com nossos clientes.',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    rating: 5,
  },
];

const plans = [
  {
    name: 'Start',
    price: 'R$ 297',
    period: '/mês',
    description: 'Para pequenas operações',
    features: [
      'Até 10 veículos',
      'Até 200 embarques/mês',
      '3 usuários',
      'Dashboard básico',
      'Suporte por email',
    ],
    cta: 'Começar agora',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R$ 597',
    period: '/mês',
    description: 'Para operações em crescimento',
    features: [
      'Até 50 veículos',
      'Embarques ilimitados',
      '10 usuários',
      'Dashboard avançado',
      'Relatórios personalizados',
      'API de integração',
      'Suporte prioritário',
    ],
    cta: 'Assinar Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    description: 'Para grandes operações',
    features: [
      'Veículos ilimitados',
      'Embarques ilimitados',
      'Usuários ilimitados',
      'Dashboard personalizado',
      'Integrações customizadas',
      'SLA garantido',
      'Gerente de conta dedicado',
    ],
    cta: 'Falar com vendas',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'Quanto tempo leva para implementar o RotaFlux?',
    answer: 'A implementação básica leva de 1 a 3 dias. Oferecemos treinamento completo e suporte para garantir uma transição suave.',
  },
  {
    question: 'Posso integrar com outros sistemas?',
    answer: 'Sim! O RotaFlux possui API completa para integração com ERPs, sistemas contábeis e outras ferramentas.',
  },
  {
    question: 'Existe período de teste gratuito?',
    answer: 'Oferecemos 14 dias de teste gratuito em todos os planos, sem necessidade de cartão de crédito.',
  },
  {
    question: 'Como funciona o suporte?',
    answer: 'Oferecemos suporte por email, chat e telefone dependendo do plano. Todos os planos incluem acesso à base de conhecimento.',
  },
  {
    question: 'O sistema funciona offline?',
    answer: 'O RotaFlux é baseado na nuvem, mas oferece funcionalidades de cache para consultas básicas em caso de conexão instável.',
  },
];

export function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-secondary-500 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading gradient-text">
                RotaFlux
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Recursos
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Como funciona
              </a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Preços
              </a>
              <a href="#faq" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                FAQ
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/login">
                <Button>Começar grátis</Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-4"
          >
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300">Recursos</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-300">Como funciona</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300">Preços</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 dark:text-slate-300">FAQ</a>
              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link to="/login" className="flex-1">
                  <Button variant="secondary" className="w-full">Entrar</Button>
                </Link>
                <Link to="/login" className="flex-1">
                  <Button className="w-full">Começar</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Novo: Integração com PIX automático
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 dark:text-white mb-6"
            >
              Controle sua operação de
              <br />
              <span className="gradient-text">transporte em tempo real</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10"
            >
              O RotaFlux é o sistema de gestão de transporte mais completo do mercado. 
              Gerencie embarques, frota, financeiro e muito mais em uma única plataforma.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/login">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Começar gratuitamente
                </Button>
              </Link>
              <Button variant="outline" size="lg" leftIcon={<Play className="w-5 h-5" />}>
                Ver demonstração
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400"
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success-500" />
                14 dias grátis
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success-500" />
                Sem cartão de crédito
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success-500" />
                Cancele quando quiser
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-10 pointer-events-none h-32 bottom-0 top-auto" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
              <div className="bg-gradient-to-br from-brand-600 to-secondary-500 p-1">
                <div className="bg-slate-900 rounded-xl p-4">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-danger-500" />
                    <div className="w-3 h-3 rounded-full bg-accent-500" />
                    <div className="w-3 h-3 rounded-full bg-success-500" />
                  </div>
                  <div className="aspect-[16/9] bg-slate-800 rounded-lg flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Preview do Dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4">
              Tudo que você precisa para sua operação
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Módulos integrados que trabalham juntos para otimizar sua logística
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 w-fit mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Comece a usar o RotaFlux em 3 passos simples
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold font-heading gradient-text opacity-30 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-gradient-to-r from-brand-300 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Empresas que transformaram sua operação com o RotaFlux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-slate-200"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4">
              Planos para todos os tamanhos
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Escolha o plano ideal para sua operação
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    'h-full relative',
                    plan.highlighted && 'ring-2 ring-brand-500 scale-105'
                  )}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-600 text-white text-sm font-medium rounded-full">
                      Mais popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {plan.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Tire suas dúvidas sobre o RotaFlux
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card padding="none" className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-slate-400 transition-transform',
                        openFaq === index && 'rotate-180'
                      )}
                    />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-secondary-600 p-8 sm:p-12 text-center"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                Pronto para otimizar sua operação?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Comece seu teste gratuito de 14 dias. Sem compromisso, sem cartão de crédito.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/login">
                  <Button
                    size="lg"
                    className="bg-white text-brand-600 hover:bg-white/90"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Começar gratuitamente
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  Falar com vendas
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-secondary-500 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-heading">RotaFlux</span>
              </div>
              <p className="text-slate-400 text-sm">
                Controle sua operação de transporte em tempo real.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 RotaFlux. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
