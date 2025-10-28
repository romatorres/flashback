import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    context: { params: { id: string } }
){
    try{
        const { id } = context.params;
        const agenda = await prisma.agenda.findUnique({
            where: { id: id },
        });
        return NextResponse.json(agenda);
    }catch(error){
        console.error("Error fetching agenda:", error);
        return NextResponse.json(
            { message: "Erro ao buscar um evento na agenda." },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    context: { params: { id: string } }
){
    try{
        const { id } = context.params;
        const { Titulo, Data, Local, Horario, Detalhes } = await request.json();
        const agendaUpdateData: {
            Titulo?: string;
            Data?: Date;
            Local?: string;
            Horario?: string;
            Detalhes?: string;
        } = {};

        if (Titulo !== undefined) agendaUpdateData.Titulo = Titulo;
        if (Data !== undefined) agendaUpdateData.Data = new Date(Data);
        if (Local !== undefined) agendaUpdateData.Local = Local;
        if (Horario !== undefined) agendaUpdateData.Horario = Horario;
        if (Detalhes !== undefined) agendaUpdateData.Detalhes = Detalhes;

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
    }catch(error){
        console.error("Error editing agenda:", error);
         return NextResponse.json(
      { message: "Erro ao editar um evento na agenda." },
      { status: 500 }
    );
    }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
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