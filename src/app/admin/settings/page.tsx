import { Button } from "@/components/ui/button";
import { Save, Shield, Bell, Palette, Database, Mail } from "lucide-react";

const settingSections = [
  {
    id: "general",
    name: "Configurações Gerais",
    description: "Configurações básicas do sistema",
    icon: Shield,
  },
  {
    id: "notifications",
    name: "Notificações",
    description: "Gerencie notificações e alertas",
    icon: Bell,
  },
  {
    id: "appearance",
    name: "Aparência",
    description: "Personalize a interface do sistema",
    icon: Palette,
  },
  {
    id: "database",
    name: "Banco de Dados",
    description: "Configurações de conexão e backup",
    icon: Database,
  },
  {
    id: "email",
    name: "E-mail",
    description: "Configurações de servidor de e-mail",
    icon: Mail,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="admin-card p-6">
        <h1 className="admin-title text-3xl font-bold mb-2">Configurações</h1>
        <p className="admin-subtitle text-lg">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings navigation */}
        <div className="lg:col-span-1">
          <div className="admin-card">
            <div className="p-4 border-b border-border">
              <h3 className="admin-title text-lg font-semibold">Seções</h3>
            </div>
            <nav className="p-2 admin-scrollbar">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  className="admin-button-ghost w-full flex items-center space-x-3 px-3 py-3 text-left rounded-md"
                >
                  <section.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {section.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings content */}
        <div className="lg:col-span-2">
          <div className="admin-card">
            <div className="p-6 border-b border-border">
              <h3 className="admin-title text-lg font-semibold mb-2">
                Configurações Gerais
              </h3>
              <p className="admin-subtitle text-sm">
                Configure as opções básicas do sistema
              </p>
            </div>
            <div className="p-6 space-y-6">
              {/* Site name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Site
                </label>
                <input
                  type="text"
                  defaultValue="Flashback Admin"
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Site description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descrição
                </label>
                <textarea
                  rows={3}
                  defaultValue="Painel de controle administrativo do Flashback"
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Fuso Horário
                </label>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                  <option value="America/Sao_Paulo">
                    (UTC-03:00) São Paulo
                  </option>
                  <option value="America/New_York">(UTC-05:00) New York</option>
                  <option value="Europe/London">(UTC+00:00) London</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Idioma
                </label>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              {/* Maintenance mode */}
              <div className="flex items-center justify-between p-4 admin-card">
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    Modo de Manutenção
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ativar modo de manutenção para o site
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-background transition-transform translate-x-1 shadow-lg" />
                </button>
              </div>

              {/* Save button */}
              <div className="flex justify-end pt-4 border-t border-border">
                <Button className="admin-button-primary">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
