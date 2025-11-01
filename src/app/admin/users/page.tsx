"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { UserForm } from "@/app/admin/users/_components/user-form";
import { toast } from "sonner";

export interface UserType {
  id: string;
  name: string;
  email: string;
}

async function getUsers(): Promise<UserType[]> {
  const res = await fetch("/api/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await res.json();
  return data;
}

async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao carregar usuários.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleOpenDialog = (user: UserType | null = null) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (shouldReload = false) => {
    setSelectedUser(null);
    setIsDialogOpen(false);
    if (shouldReload) {
      loadUsers();
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteUser(id);
      toast.success("Usuário excluído com sucesso!");
      setDeleteId(null);
      loadUsers();
    } catch {
      toast.error("Ocorreu um erro ao excluir o usuário.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4">
        <div className="flex md:flex-row flex-col justify-between md:items-center items-start">
          <div>
            <h1 className="admin-title text-3xl font-bold mb-2">Usuários</h1>
            <p className="admin-subtitle text-lg mb-4">
              Gerencie os usuários do sistema
            </p>
          </div>
          <Button
            className="admin-button-primary"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col w-full h-full shadow-md bg-clip-border border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <span className="text-muted-foreground">
              Carregando usuários...
            </span>
          </div>
        ) : (
          <table className="w-full text-left table-auto min-w-max">
            <thead className="bg-background">
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70">
                    Nome
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70">
                    E-mail
                  </p>
                </th>
                <th className="p-4 border-b">
                  <p className="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70">
                    Ações
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block text-sm antialiased font-normal leading-normal">
                      {user.name}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block text-sm antialiased font-normal leading-normal">
                      {user.email}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex gap-6">
                      <button
                        className="text-sm text-foreground hover:text-foreground/70 antialiased font-normal leading-normal cursor-pointer"
                        onClick={() => handleOpenDialog(user)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-sm text-destructive hover:text-destructive/70 antialiased font-normal leading-normal cursor-pointer"
                        onClick={() => setDeleteId(user.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Dialog for Create/Edit */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null);
          }
          setIsDialogOpen(open);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="admin-title text-xl">
              {selectedUser ? "Editar Usuário" : "Novo Usuário"}
            </DialogTitle>
          </DialogHeader>
          <UserForm user={selectedUser} onSuccess={handleCloseDialog} />
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
              Tem certeza que deseja excluir este usuário? Esta ação não pode
              ser desfeita.
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
