"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });

    if (!settings) {
      // Cria a configuração inicial se não existir
      settings = await prisma.settings.create({
        data: {
          id: 1,
          showPromoModal: false,
        },
      });
    }

    return settings;
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    return null;
  }
}

export async function updatePromoModalStatus(status: boolean) {
  try {
    await prisma.settings.upsert({
      where: { id: 1 },
      update: { showPromoModal: status },
      create: { id: 1, showPromoModal: status },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar status do modal:", error);
    return { success: false, error: "Falha ao atualizar configuração" };
  }
}
