"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Calendar, Clock, MapPin, FileText, Type } from "lucide-react";

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

const formSchema = z.object({
  Titulo: z
    .string()
    .min(1, { message: "O título é obrigatório." })
    .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
  Data: z
    .string()
    .min(1, { message: "A data é obrigatória." })
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "A data não pode ser anterior a hoje." }
    ),
  Local: z
    .string()
    .min(1, { message: "O local é obrigatório." })
    .min(3, { message: "O local deve ter pelo menos 3 caracteres." })
    .max(200, { message: "O local deve ter no máximo 200 caracteres." }),
  Horario: z
    .string()
    .min(1, { message: "O horário é obrigatório." })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Formato de horário inválido. Use HH:MM (ex: 14:30)",
    }),
  Detalhes: z
    .string()
    .max(500, { message: "Os detalhes devem ter no máximo 500 caracteres." })
    .optional(),
});

interface AgendaFormProps {
  onSuccess?: () => void;
}

export function AgendaForm({ onSuccess }: AgendaFormProps) {
  const { createAgenda, updateAgenda, selectedAgenda, setSelectedAgenda } =
    useAgendaStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Titulo: "",
      Data: "",
      Local: "",
      Horario: "",
      Detalhes: "",
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const isEditing = !!selectedAgenda?.id;
  const watchedDetalhes = watch("Detalhes");

  useEffect(() => {
    if (selectedAgenda?.id && selectedAgenda.Data) {
      form.reset({
        ...selectedAgenda,
        Data: new Date(selectedAgenda.Data).toISOString().split("T")[0],
        Detalhes: selectedAgenda.Detalhes || "",
      });
    } else {
      form.reset({
        Titulo: "",
        Data: "",
        Local: "",
        Horario: "",
        Detalhes: "",
      });
    }
  }, [selectedAgenda, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing) {
        await updateAgenda(selectedAgenda.id!, {
          ...values,
          Data: new Date(values.Data),
        });
        toast.success("Evento atualizado com sucesso!");
      } else {
        await createAgenda({
          ...values,
          Data: new Date(values.Data),
          Detalhes: values.Detalhes || undefined,
        });
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
          name="Titulo"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="Data"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-foreground font-medium">
                  <Calendar className="h-4 w-4 mr-2 text-disco-orange" />
                  Data
                </FormLabel>
                <FormControl>
                  <Input className="admin-input" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Horario"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-foreground font-medium">
                  <Clock className="h-4 w-4 mr-2 text-disco-gold" />
                  Horário
                </FormLabel>
                <FormControl>
                  <Input
                    className="admin-input"
                    type="time"
                    placeholder="14:30"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  Formato: HH:MM (24 horas)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="Local"
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
          name="Detalhes"
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
