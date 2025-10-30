import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Agenda {
  id: string;
  titulo: string;
  data: Date;
  local: string;
  horario: string;
  detalhes?: string;
  ativo?: boolean;
}

interface AgendaState {
  agendas: Agenda[];
  publicAgendas: Agenda[]; // Eventos públicos (ativos)
  selectedAgenda: Partial<Agenda> | null;
  loading: boolean;
  publicLoading: boolean; // Loading específico para eventos públicos
  error: string | null;
  publicError: string | null; // Error específico para eventos públicos
  fetchAgendas: () => Promise<void>;
  fetchPublicAgendas: () => Promise<void>; // Nova função para eventos públicos
  createAgenda: (newAgenda: Omit<Agenda, "id">) => Promise<void>;
  updateAgenda: (id: string, updatedAgenda: Partial<Agenda>) => Promise<void>;
  deleteAgenda: (id: string) => Promise<void>;
  setSelectedAgenda: (agenda: Partial<Agenda> | null) => void;
}

export const useAgendaStore = create<AgendaState>()(
  devtools((set, get) => ({
    agendas: [],
    publicAgendas: [],
    selectedAgenda: null,
    loading: false,
    publicLoading: false,
    error: null,
    publicError: null,
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
    fetchPublicAgendas: async () => {
      if (get().publicAgendas.length > 0) {
        return; // Evita a busca se os dados já estiverem carregados
      }
      set({ publicLoading: true, publicError: null });

      try {
        const response = await fetch("/api/agenda/public");

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar eventos públicos: ${response.status}`
          );
        }

        const data = await response.json();
        set({ publicAgendas: data, publicLoading: false });
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ publicError: error.message, publicLoading: false });
        } else {
          set({ publicError: "Erro desconhecido", publicLoading: false });
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
