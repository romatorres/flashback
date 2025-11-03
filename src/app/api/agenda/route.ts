import { NextResponse } from "next/server";
import { createAgenda, listAgendas } from "@/actions/agenda";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, data, local, horario, detalhes, ativo = true } = body;

    if (!titulo || !data || !local || !horario) {
      return NextResponse.json(
        { message: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const agenda = await createAgenda({
      titulo,
      data: new Date(data),
      local,
      horario,
      detalhes,
      ativo,
    });

    return NextResponse.json(agenda, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating agenda:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao criar evento na agenda.";
    return NextResponse.json(
      { message: errorMessage },
      { status: errorMessage.includes("permissão") ? 403 : 500 }
    );
  }
}

export async function GET() {
  try {
    const agenda = await listAgendas();
    return NextResponse.json(agenda);
  } catch (error: unknown) {
    console.error("Error fetching agenda:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao buscar agenda.";
    return NextResponse.json(
      { message: errorMessage },
      { status: errorMessage.includes("permissão") ? 403 : 500 }
    );
  }
}
