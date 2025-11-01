"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserType } from "@/app/admin/users/page";
import { authClient } from "@/lib/auth-client";

const userFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional(),
    // Campos para alteração de senha (apenas para edição)
    currentPassword: z.string().optional().or(z.literal("")),
    newPassword: z
      .string()
      .min(8, { message: "A nova senha deve ter pelo menos 8 caracteres" })
      .optional()
      .or(z.literal("")),
    confirmNewPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Validação para criação de usuário
      if (!data.currentPassword && data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      // Validação para alteração de senha
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword", "confirmNewPassword"],
    }
  )
  .refine(
    (data) => {
      // Se preencheu nova senha, deve preencher senha atual
      if (data.newPassword && data.newPassword.length > 0) {
        return data.currentPassword && data.currentPassword.length > 0;
      }
      return true;
    },
    {
      message: "Senha atual é obrigatória para alterar a senha",
      path: ["currentPassword"],
    }
  );

type UserFormValues = z.infer<typeof userFormSchema>;

export function UserForm({
  user,
  onSuccess,
}: {
  user?: UserType | null;
  onSuccess?: (shouldReload: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [user, form]);

  async function createUser(formData: UserFormValues) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao criar usuário.");
    }
  }

  async function updateUser(formData: UserFormValues) {
    // Atualizar dados básicos (nome e email)
    const response = await fetch(`/api/users/${user!.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Falha ao atualizar usuário.");
    }

    // Se há nova senha, alterar senha usando Better Auth
    if (formData.newPassword && formData.currentPassword) {
      const { error } = await authClient.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (error) {
        throw new Error(error.message || "Falha ao alterar senha.");
      }
    }
  }

  async function onSubmit(formData: UserFormValues) {
    try {
      if (user) {
        await updateUser(formData);
      } else {
        await createUser(formData);
      }

      toast.success(
        user ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!"
      );
      if (onSuccess) {
        onSuccess(true);
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro desconhecido");
    }
  }

  const {
    formState: { isSubmitting },
  } = form;

  const handleCancel = () => {
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    setIsChangingPassword(false);
    form.reset();
    onSuccess?.(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-title">Nome</FormLabel>
              <FormControl>
                <Input
                  className="admin-input"
                  placeholder="Seu nome completo"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-title">Email</FormLabel>
              <FormControl>
                <Input
                  className="admin-input"
                  placeholder="seu@email.com"
                  type="email"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!user && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="admin-title">Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="admin-input"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={form.formState.isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="admin-title">Confirmar Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="admin-input"
                        placeholder="••••••••"
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={form.formState.isSubmitting}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {user && (
          <>
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="admin-title text-lg font-semibold">
                  Alterar Senha
                </h3>
                <Button
                  type="button"
                  size="sm"
                  className="admin-button-secondary"
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                >
                  {isChangingPassword ? "Cancelar" : "Alterar Senha"}
                </Button>
              </div>

              {isChangingPassword && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="admin-title">
                          Senha Atual
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="admin-input"
                              placeholder="••••••••"
                              type={showCurrentPassword ? "text" : "password"}
                              {...field}
                              disabled={form.formState.isSubmitting}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              disabled={form.formState.isSubmitting}
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="admin-title">
                          Nova Senha
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="admin-input"
                              placeholder="••••••••"
                              type={showNewPassword ? "text" : "password"}
                              {...field}
                              disabled={form.formState.isSubmitting}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              disabled={form.formState.isSubmitting}
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="admin-title">
                          Confirmar Nova Senha
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="admin-input"
                              placeholder="••••••••"
                              type={
                                showConfirmNewPassword ? "text" : "password"
                              }
                              {...field}
                              disabled={form.formState.isSubmitting}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setShowConfirmNewPassword(
                                  !showConfirmNewPassword
                                )
                              }
                              disabled={form.formState.isSubmitting}
                            >
                              {showConfirmNewPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </>
        )}
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
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {user ? "Salvando..." : "Cadastrando..."}
              </>
            ) : user ? (
              "Salvar Alterações"
            ) : (
              "Cadastrar Usuário"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
