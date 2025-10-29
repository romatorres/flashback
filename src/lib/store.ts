
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Agenda {
  id: string;
  Titulo: string;
  Data: Date;
  Local: string;
  Horario: string;
  Detalhes?: string;
}

interface AgendaState {
  agendas: Agenda[];
  selectedAgenda: Partial<Agenda> | null;
  loading: boolean;
  error: string | null;
  fetchAgendas: () => Promise<void>;
  createAgenda: (newAgenda: Omit<Agenda, "id">) => Promise<void>;
  updateAgenda: (id: string, updatedAgenda: Partial<Agenda>) => Promise<void>;
  deleteAgenda: (id: string) => Promise<void>;
  setSelectedAgenda: (agenda: Partial<Agenda> | null) => void;
}

export const useAgendaStore = create<AgendaState>()(
  devtools((set, get) => ({
    agendas: [],
    selectedAgenda: null,
    loading: false,
    error: null,
    fetchAgendas: async () => {
      if (get().agendas.length > 0) {
        return; // Evita a busca se os dados já estiverem carregados
      }
      set({ loading: true, error: null });
      try {
        const response = await fetch("/api/agenda");
        if (!response.ok) {
          throw new Error("Erro ao buscar a agenda.");
        }
        const data = await response.json();
        set({ agendas: data, loading: false });
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        }
      }
    },
    createAgenda: async (newAgenda) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch("/api/agenda", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAgenda),
        });
        if (!response.ok) {
          throw new Error("Erro ao criar um evento na agenda.");
        }
        const data = await response.json();
        set((state) => ({
          agendas: [...state.agendas, data],
          loading: false,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        }
      }
    },
    updateAgenda: async (id, updatedAgenda) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/agenda/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAgenda),
        });
        if (!response.ok) {
          throw new Error("Erro ao editar um evento na agenda.");
        }
        const data = await response.json();
        set((state) => ({
          agendas: state.agendas.map((agenda) =>
            agenda.id === id ? data : agenda
          ),
          loading: false,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        }
      }
    },
    deleteAgenda: async (id) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/agenda/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Erro ao excluir um evento da agenda.");
        }
        set((state) => ({
          agendas: state.agendas.filter((agenda) => agenda.id !== id),
          loading: false,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        }
      }
    },
    setSelectedAgenda: (agenda) => {
      set({ selectedAgenda: agenda });
    },
  }))
);
