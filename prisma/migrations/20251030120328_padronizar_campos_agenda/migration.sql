-- Renomear colunas da tabela agenda
ALTER TABLE "agenda" RENAME COLUMN "Titulo" TO "titulo";
ALTER TABLE "agenda" RENAME COLUMN "Data" TO "data";
ALTER TABLE "agenda" RENAME COLUMN "Local" TO "local";
ALTER TABLE "agenda" RENAME COLUMN "Horario" TO "horario";
ALTER TABLE "agenda" RENAME COLUMN "Detalhes" TO "detalhes";