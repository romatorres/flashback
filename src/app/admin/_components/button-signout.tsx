"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

interface ButtonSignOutProps {
  variant?: "default" | "menu";
}

export function ButtonSignOut({ variant = "default" }: ButtonSignOutProps) {
  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Força uma navegação completa para limpar qualquer estado
          window.location.href = "/";
        },
      },
    });
  }

  if (variant === "menu") {
    return (
      <span onClick={signOut} className="w-full text-sm cursor-pointer">
        Sair do painel
      </span>
    );
  }

  return (
    <Button onClick={signOut} className="admin-button-secondary w-full">
      <LogOut className="h-4 w-4 mr-2" />
      Sair do painel
    </Button>
  );
}
