import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Titulo, Data, Local, Horario, Detalhes } = body;

    if (!Titulo || !Data || !Local || !Horario) {
      return NextResponse.json(
        { message: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const newAgenda = await prisma.agenda.create({
      data: {
        Titulo,
        Data: new Date(Data),
        Local,
        Horario,
        Detalhes,
      },
    });

    return NextResponse.json(newAgenda, { status: 201 });
  } catch (error) {
    console.error("Error creating agenda:", error);
    return NextResponse.json(
      { message: "Erro ao criar um evento na agenda." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const agenda = await prisma.agenda.findMany({
      select: {
        id: true,
        Titulo: true,
        Data: true,
        Local: true,
        Horario: true,
        Detalhes: true,
      },
      orderBy: {
        Data: 'asc'
      }
    });

    return NextResponse.json(agenda);
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return NextResponse.json(
      { message: "Erro ao buscar a agenda." },
      { status: 500 }
    );
  }
}
