import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Building2,
  Palette,
  Users,
  Bell,
  Shield,
  Plus,
  Mail,
  Save,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';

const mockUsers = [
  { id: '1', name: 'Michele Silva', email: 'michele@rotaflux.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Carlos Eduardo', email: 'carlos@rotaflux.com', role: 'manager', status: 'active' },
  { id: '3', name: 'Ana Paula', email: 'ana@rotaflux.com', role: 'operator', status: 'active' },
  { id: '4', name: 'Roberto Santos', email: 'roberto@rotaflux.com', role: 'operator', status: 'pending' },
];

export function Configuracoes() {
  const toast = useToast();
  const { theme, setTheme, user } = useAppStore();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleSave = () => {
    toast.success('Configurações salvas', 'As alterações foram aplicadas com sucesso');
  };

  const handleInvite = () => {
    setIsInviteModalOpen(false);
    toast.success('Convite enviado', 'O usuário receberá um email com o convite');
  };

  const profileContent = (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader title="Informações pessoais" />
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'US'}
          </div>
          <div>
            <Button variant="secondary" size="sm">Alterar foto</Button>
            <p className="text-xs text-slate-500 mt-2">JPG, PNG ou GIF. Máx. 2MB</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nome" defaultValue={user?.name || ''} />
            <Input label="Sobrenome" defaultValue="" />
          </div>
          <Input label="Email" type="email" defaultValue={user?.email || ''} />
          <Input label="Telefone" placeholder="(00) 00000-0000" />
        </div>
      </Card>

      <Card>
        <CardHeader title="Alterar senha" />
        <div className="grid gap-4">
          <Input label="Senha atual" type="password" placeholder="••••••••" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nova senha" type="password" placeholder="••••••••" />
            <Input label="Confirmar nova senha" type="password" placeholder="••••••••" />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
          Salvar alterações
        </Button>
      </div>
    </div>
  );

  const companyContent = (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader title="Dados da empresa" />
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <Building2 className="w-10 h-10 text-slate-400" />
          </div>
          <div>
            <Button variant="secondary" size="sm">Upload logo</Button>
            <p className="text-xs text-slate-500 mt-2">PNG ou SVG. Recomendado: 200x200px</p>
          </div>
        </div>
        <div className="grid gap-4">
          <Input label="Razão social" defaultValue="RotaFlux Transportes Ltda" />
          <Input label="Nome fantasia" defaultValue="RotaFlux" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="CNPJ" defaultValue="12.345.678/0001-90" />
            <Input label="Inscrição estadual" placeholder="000.000.000.000" />
          </div>
          <Input label="Endereço" defaultValue="Av. Paulista, 1000 - Bela Vista" />
          <div className="grid grid-cols-3 gap-4">
            <Input label="Cidade" defaultValue="São Paulo" />
            <Input label="Estado" defaultValue="SP" />
            <Input label="CEP" defaultValue="01310-100" />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
          Salvar alterações
        </Button>
      </div>
    </div>
  );

  const preferencesContent = (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader title="Aparência" />
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Tema
            </p>
            <div className="flex gap-3">
              {[
                { id: 'light', label: 'Claro', icon: Sun },
                { id: 'dark', label: 'Escuro', icon: Moon },
                { id: 'system', label: 'Sistema', icon: Monitor },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id as 'light' | 'dark' | 'system')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all',
                    theme === option.id
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  )}
                >
                  <option.icon className={cn(
                    'w-5 h-5',
                    theme === option.id
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-500'
                  )} />
                  <span className={cn(
                    'font-medium',
                    theme === option.id
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-700 dark:text-slate-300'
                  )}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Notificações" />
        <div className="space-y-4">
          {[
            { id: 'email', label: 'Notificações por email', description: 'Receba alertas importantes por email' },
            { id: 'browser', label: 'Notificações do navegador', description: 'Receba notificações em tempo real' },
            { id: 'occurrences', label: 'Alertas de ocorrências', description: 'Seja notificado sobre novas ocorrências' },
            { id: 'deliveries', label: 'Entregas concluídas', description: 'Notificação ao concluir uma entrega' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-brand-600"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
          Salvar preferências
        </Button>
      </div>
    </div>
  );

  const usersContent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Usuários</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gerencie os usuários da sua organização
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsInviteModalOpen(true)}>
          Convidar usuário
        </Button>
      </div>

      <Card padding="none">
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {mockUsers.map((userItem) => (
            <div
              key={userItem.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-secondary-500 flex items-center justify-center text-white font-medium">
                  {userItem.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {userItem.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {userItem.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={
                  userItem.role === 'admin' ? 'primary' :
                  userItem.role === 'manager' ? 'secondary' : 'default'
                }>
                  {userItem.role === 'admin' ? 'Administrador' :
                   userItem.role === 'manager' ? 'Gerente' : 'Operador'}
                </Badge>
                <Badge variant={userItem.status === 'active' ? 'success' : 'warning'}>
                  {userItem.status === 'active' ? 'Ativo' : 'Pendente'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: <User className="w-4 h-4" />, content: profileContent },
    { id: 'company', label: 'Empresa', icon: <Building2 className="w-4 h-4" />, content: companyContent },
    { id: 'preferences', label: 'Preferências', icon: <Palette className="w-4 h-4" />, content: preferencesContent },
    { id: 'users', label: 'Usuários', icon: <Users className="w-4 h-4" />, content: usersContent },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Configurações"
        subtitle="Gerencie suas preferências e configurações"
      />

      <Tabs tabs={tabs} />

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Convidar usuário"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="email@empresa.com"
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Função
            </label>
            <div className="space-y-2">
              {[
                { id: 'admin', label: 'Administrador', description: 'Acesso total ao sistema' },
                { id: 'manager', label: 'Gerente', description: 'Gerenciar operações e relatórios' },
                { id: 'operator', label: 'Operador', description: 'Acesso operacional básico' },
              ].map((role) => (
                <label
                  key={role.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {role.label}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {role.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsInviteModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleInvite}>
            Enviar convite
          </Button>
        </ModalFooter>
      </Modal>
    </motion.div>
  );
}
