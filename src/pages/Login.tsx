import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Truck, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppStore } from '@/store';
import { api } from '@/services/fakeApi';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.auth.login(data.email, data.password);
      setUser(response.user);
      navigate('/app');
    } catch {
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-secondary-500 flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-heading gradient-text">
              RotaFlux
            </span>
          </Link>

          <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Entre na sua conta para continuar
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800"
            >
              <p className="text-sm text-danger-700 dark:text-danger-300">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              {...register('email')}
              label="Email"
              type="email"
              placeholder="seu@email.com"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                {...register('password')}
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className={cn(
                    'w-4 h-4 rounded border-slate-300 dark:border-slate-600',
                    'text-brand-600 focus:ring-brand-500 focus:ring-offset-0',
                    'cursor-pointer'
                  )}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Lembrar-me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
              rightIcon={!isLoading && <ArrowRight className="w-4 h-4" />}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Não tem uma conta?{' '}
            <a
              href="#"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              Solicite uma demonstração
            </a>
          </p>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-4">
              Para testar, use qualquer email e senha com 6+ caracteres
            </p>
            <div className="flex gap-3 text-xs text-slate-400">
              <div className="flex-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="font-medium text-slate-600 dark:text-slate-300">Email</p>
                <p>demo@rotaflux.com</p>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="font-medium text-slate-600 dark:text-slate-300">Senha</p>
                <p>demo123</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Image/Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-1 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-secondary-600" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
              <Truck className="w-10 h-10" />
            </div>
            
            <h2 className="text-3xl font-bold font-heading mb-4">
              Gestão de transporte simplificada
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Controle embarques, frota, financeiro e muito mais em uma única plataforma intuitiva.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-white/70">Empresas</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <p className="text-2xl font-bold">50k+</p>
                <p className="text-sm text-white/70">Embarques/mês</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-white/70">Satisfação</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-secondary-500/20 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
}
