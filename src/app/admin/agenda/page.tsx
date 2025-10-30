"use client";

import { useEffect, useState } from "react";
import { useAgendaStore } from "@/lib/store";
import { AgendaForm } from "./_components/agenda-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";

export default function AgendaPage() {
  const {
    agendas,
    selectedAgenda,
    loading,
    error,
    fetchAgendas,
    deleteAgenda,
    setSelectedAgenda,
  } = useAgendaStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAgendas();
  }, [fetchAgendas]);

  const handleOpenDialog = (agenda?: (typeof agendas)[0]) => {
    setSelectedAgenda(agenda || {});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedAgenda(null);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteAgenda(id);
      toast.success("Evento excluído com sucesso!");
      setDeleteId(null);
    } catch {
      toast.error("Ocorreu um erro ao excluir o evento.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4">
        <div className="flex md:flex-row flex-col justify-between md:items-center items-start">
          <div>
            <h1 className="admin-title text-3xl font-bold mb-2">
              Agenda de Eventos
            </h1>
            <p className="admin-subtitle text-lg mb-4">
              Gerencie os eventos da sua agenda
            </p>
          </div>
          <Button
            className="admin-button-primary"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="admin-card p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <span className="text-muted-foreground">Carregando eventos...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="admin-card p-6 border-destructive/50 bg-destructive/5">
          <p className="text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* Events Grid */}
      {!loading && !error && (
        <>
          {agendas.length === 0 ? (
            <div className="admin-card p-12">
              <div className="text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="admin-title text-xl font-semibold mb-2">
                  Nenhum evento encontrado
                </h3>
                <p className="admin-subtitle mb-6">
                  Comece criando seu primeiro evento
                </p>
                <Button
                  className="admin-button-primary"
                  onClick={() => handleOpenDialog()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Evento
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agendas.map((agenda) => (
                <div key={agenda.id} className="admin-card p-6 admin-fade-in">
                  <div className="space-y-4">
                    <div>
                      <h2 className="admin-title text-xl font-bold mb-2 line-clamp-2">
                        {agenda.titulo}
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-disco-purple" />
                        <span>{formatDate(agenda.data)}</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-disco-orange" />
                        <span>{agenda.horario}</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-disco-gold" />
                        <span className="line-clamp-1">{agenda.local}</span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                        agenda.ativo
                          ? "bg-green-200 text-green-900"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {agenda.ativo ? "Ativo" : "Inativo"}
                    </span>
                    {agenda.detalhes && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {agenda.detalhes}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="admin-button-ghost"
                        onClick={() => handleOpenDialog(agenda)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        onClick={() => setDeleteId(agenda.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Dialog for Create/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="admin-title text-xl">
              {selectedAgenda?.id ? "Editar Evento" : "Novo Evento"}
            </DialogTitle>
          </DialogHeader>
          <AgendaForm onSuccess={handleCloseDialog} />
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="admin-card max-w-md">
          <DialogHeader>
            <DialogTitle className="admin-title text-xl">
              Confirmar Exclusão
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="admin-subtitle">
              Tem certeza que deseja excluir este evento? Esta ação não pode ser
              desfeita.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              className="admin-button-secondary"
              onClick={() => setDeleteId(null)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
