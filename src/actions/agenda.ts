"use server";

import { requireAuth, requireEditorOrAdmin } from "@/lib/auth-middleware";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Listar agendas (usuários autenticados podem ver)
export async function listAgendas() {
  await requireAuth();

  const agendas = await prisma.agenda.findMany({
    orderBy: {
      data: "asc",
    },
  });

  return agendas;
}

// Listar agendas públicas (não requer autenticação)
export async function listPublicAgendas() {
  const agendas = await prisma.agenda.findMany({
    where: {
      ativo: true,
    },
    orderBy: {
      data: "asc",
    },
  });

  return agendas;
}

// Obter agenda específica
export async function getAgenda(id: string) {
  await requireAuth();

  const agenda = await prisma.agenda.findUnique({
    where: { id },
  });

  if (!agenda) {
    throw new Error("Agenda não encontrada");
  }

  return agenda;
}

// Criar agenda (apenas admin ou editor)
export async function createAgenda(data: {
  titulo: string;
  data: Date;
  local: string;
  horario: string;
  detalhes?: string;
  ativo?: boolean;
}) {
  await requireEditorOrAdmin();

  const agenda = await prisma.agenda.create({
    data: {
      titulo: data.titulo,
      data: data.data,
      local: data.local,
      horario: data.horario,
      detalhes: data.detalhes,
      ativo: data.ativo ?? true,
    },
  });

  revalidatePath("/admin/agenda");
  revalidatePath("/");
  return agenda;
}

// Atualizar agenda (apenas admin ou editor)
export async function updateAgenda(
  id: string,
  data: {
    titulo?: string;
    data?: Date;
    local?: string;
    horario?: string;
    detalhes?: string;
    ativo?: boolean;
  }
) {
  await requireEditorOrAdmin();

  const agenda = await prisma.agenda.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/agenda");
  revalidatePath("/");
  return agenda;
}

// Deletar agenda (apenas admin ou editor)
export async function deleteAgenda(id: string) {
  await requireEditorOrAdmin();

  await prisma.agenda.delete({
    where: { id },
  });

  revalidatePath("/admin/agenda");
  revalidatePath("/");
  return { success: true };
}
