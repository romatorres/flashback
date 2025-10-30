"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Calendar, MapPin, FileText, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useAgendaStore } from "@/lib/store";
import { DateTimePicker } from "@/components/ui/datetime-picker";

const formSchema = z.object({
  titulo: z
    .string()
    .min(1, { message: "O título é obrigatório." })
    .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
  dataHora: z
    .date({
      message: "A data e hora são obrigatórias.",
    })
    .refine((date) => date > new Date(), {
      message: "A data e hora não podem ser anteriores a agora.",
    }),
  local: z
    .string()
    .min(1, { message: "O local é obrigatório." })
    .min(3, { message: "O local deve ter pelo menos 3 caracteres." })
    .max(200, { message: "O local deve ter no máximo 200 caracteres." }),
  detalhes: z
    .string()
    .max(500, { message: "Os detalhes devem ter no máximo 500 caracteres." })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AgendaFormProps {
  onSuccess?: () => void;
}

export function AgendaForm({ onSuccess }: AgendaFormProps) {
  const { createAgenda, updateAgenda, selectedAgenda, setSelectedAgenda } =
    useAgendaStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      local: "",
      detalhes: "",
      dataHora: undefined,
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const isEditing = !!selectedAgenda?.id;
  const watchedDetalhes = watch("detalhes");

  useEffect(() => {
    if (isEditing && selectedAgenda?.id) {
      form.reset({
        titulo: selectedAgenda.titulo || "",
        local: selectedAgenda.local || "",
        detalhes: selectedAgenda.detalhes || "",
        dataHora: selectedAgenda.data
          ? new Date(selectedAgenda.data)
          : undefined,
      });
    } else {
      form.reset({
        titulo: "",
        local: "",
        detalhes: "",
        dataHora: undefined,
      });
    }
  }, [selectedAgenda, form, isEditing]);

  const onSubmit = async (values: FormValues) => {
    try {
      const dataToSubmit = {
        titulo: values.titulo,
        local: values.local,
        detalhes: values.detalhes,
        data: values.dataHora,
        horario: values.dataHora.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      if (isEditing) {
        await updateAgenda(selectedAgenda.id!, dataToSubmit);
        toast.success("Evento atualizado com sucesso!");
      } else {
        await createAgenda(dataToSubmit);
        toast.success("Evento criado com sucesso!");
      }

      setSelectedAgenda(null);
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      toast.error("Ocorreu um erro ao salvar o evento.");
    }
  };

  const handleCancel = () => {
    setSelectedAgenda(null);
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-foreground font-medium">
                <Type className="h-4 w-4 mr-2 text-disco-purple" />
                Título do Evento
              </FormLabel>
              <FormControl>
                <Input
                  className="admin-input"
                  placeholder="Ex: Reunião de equipe, Workshop, Apresentação..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs text-muted-foreground">
                {field.value?.length || 0}/100 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataHora"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-foreground font-medium">
                <Calendar className="h-4 w-4 mr-2 text-disco-orange" />
                Data e Horário
              </FormLabel>
              <FormControl>
                <DateTimePicker
                  date={field.value}
                  setDate={field.onChange}
                  className="admin-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="local"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-foreground font-medium">
                <MapPin className="h-4 w-4 mr-2 text-disco-blue" />
                Local
              </FormLabel>
              <FormControl>
                <Input
                  className="admin-input"
                  placeholder="Ex: Sala de reuniões, Auditório, Online..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs text-muted-foreground">
                {field.value?.length || 0}/200 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detalhes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-foreground font-medium">
                <FileText className="h-4 w-4 mr-2 text-disco-green" />
                Detalhes (Opcional)
              </FormLabel>
              <FormControl>
                <Textarea
                  className="admin-textarea min-h-[100px]"
                  placeholder="Adicione informações extras sobre o evento, agenda, participantes, materiais necessários..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs text-muted-foreground">
                {watchedDetalhes?.length || 0}/500 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="secondary"
            className="admin-button-secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="admin-button-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Atualizando..." : "Criando..."}
              </>
            ) : (
              <>{isEditing ? "Atualizar Evento" : "Criar Evento"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
