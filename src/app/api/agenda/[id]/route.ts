import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const agenda = await prisma.agenda.findUnique({
      where: { id: id },
    });
    return NextResponse.json(agenda);
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return NextResponse.json(
      { message: "Erro ao buscar um evento na agenda." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { titulo, data, local, horario, detalhes, ativo } =
      await request.json();
    const agendaUpdateData: {
      titulo?: string;
      data?: Date;
      local?: string;
      horario?: string;
      detalhes?: string;
      ativo?: boolean;
    } = {};

    if (titulo !== undefined) agendaUpdateData.titulo = titulo;
    if (data !== undefined) agendaUpdateData.data = new Date(data);
    if (local !== undefined) agendaUpdateData.local = local;
    if (horario !== undefined) agendaUpdateData.horario = horario;
    if (detalhes !== undefined) agendaUpdateData.detalhes = detalhes;
    if (ativo !== undefined) agendaUpdateData.ativo = ativo;

    if (Object.keys(agendaUpdateData).length > 0) {
      await prisma.agenda.update({
        where: { id: id },
        data: agendaUpdateData,
      });
    }

    const updatedAgenda = await prisma.agenda.findUnique({
      where: { id: id },
    });

    return NextResponse.json(updatedAgenda);
  } catch (error) {
    console.error("Error editing agenda:", error);
    return NextResponse.json(
      { message: "Erro ao editar um evento na agenda." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.agenda.delete({
      where: { id: id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting agenda:", error);
    return NextResponse.json(
      { message: "Erro ao excluir um evento da agenda." },
      { status: 500 }
    );
  }
}
