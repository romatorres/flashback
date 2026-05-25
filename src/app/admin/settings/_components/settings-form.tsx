"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updatePromoModalStatus } from "@/actions/settings";

interface SettingsFormProps {
  initialShowPromoModal: boolean;
}

export function SettingsForm({ initialShowPromoModal }: SettingsFormProps) {
  const [showPromo, setShowPromo] = useState(initialShowPromoModal);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsPending(true);
    const result = await updatePromoModalStatus(checked);
    setIsPending(false);

    if (result.success) {
      setShowPromo(checked);
      toast.success(
        `Pop-up promocional ${checked ? "ativado" : "desativado"} com sucesso!`
      );
    } else {
      toast.error("Erro ao atualizar configuração.");
    }
  };

  return (
    <div className="admin-card p-6 max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Recursos do Site</h2>
      
      <div className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
        <div className="space-y-0.5">
          <Label htmlFor="promo-modal" className="text-base font-medium">
            Pop-up Promocional (PromoModal)
          </Label>
          <p className="text-sm text-muted-foreground">
            Habilitar ou desabilitar o pop-up de imagem que aparece ao carregar o site.
          </p>
        </div>
        <Switch
          id="promo-modal"
          checked={showPromo}
          onCheckedChange={handleToggle}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
