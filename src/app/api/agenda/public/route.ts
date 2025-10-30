import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const agenda = await prisma.agenda.findMany({
      where: {
        ativo: true, // Apenas eventos ativos
      },
      select: {
        id: true,
        titulo: true,
        data: true,
        local: true,
        horario: true,
        detalhes: true,
        ativo: true,
      },
      orderBy: {
        data: "asc",
      },
    });

    return NextResponse.json(agenda);
  } catch (error) {
    console.error("Erro ao buscar agenda pública:", error);
    return NextResponse.json(
      { message: "Erro ao buscar a agenda pública." },
      { status: 500 }
    );
  }
}
