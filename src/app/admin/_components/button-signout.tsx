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
      <span onClick={signOut} className="w-full text-sm cursor-pointer">
        Sair da conta
      </span>
    );
  }

  return (
    <Button onClick={signOut} className="admin-button-secondary w-full">
      <LogOut className="h-4 w-4 mr-2" />
      Sair da conta
    </Button>
  );
}
