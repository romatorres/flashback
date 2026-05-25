import { getSettings } from "@/actions/settings";
import { SettingsForm } from "./_components/settings-form";
import { PermissionGate } from "@/components/auth/PermissionGate";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <PermissionGate requireAdmin>
      <div className="space-y-6">
        <div className="sm:p-4 p-2">
          <h1 className="admin-title text-3xl font-bold mb-2">
            Configurações do Sistema
          </h1>
          <p className="admin-subtitle text-lg">
            Gerencie recursos e funcionalidades globais do site
          </p>
        </div>

        <div className="sm:p-4 p-2">
          <SettingsForm initialShowPromoModal={settings?.showPromoModal ?? false} />
        </div>
      </div>
    </PermissionGate>
  );
}
