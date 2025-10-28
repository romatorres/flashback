-- CreateTable
CREATE TABLE "agenda" (
    "id" TEXT NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Data" TIMESTAMP(3) NOT NULL,
    "Local" TEXT NOT NULL,
    "Horario" TEXT NOT NULL,
    "Detalhes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id")
);
