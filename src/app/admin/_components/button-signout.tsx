"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

interface ButtonSignOutProps {
  variant?: "default" | "menu";
}

export function ButtonSignOut({ variant = "default" }: ButtonSignOutProps) {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
        },
      },
    });
  }

  if (variant === "menu") {
    return (
      <button
        onClick={signOut}
        className="w-full flex items-center px-0 py-2 text-sm text-destructive hover:text-destructive/80 transition-colors cursor-pointer"
      >
        <LogOut className="h-4 w-4 mr-3" />
        Sair da conta
      </button>
    );
  }

  return (
    <Button onClick={signOut} className="admin-button-secondary w-full">
      <LogOut className="h-4 w-4 mr-2" />
      Sair da conta
    </Button>
  );
}
