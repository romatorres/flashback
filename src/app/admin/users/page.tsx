"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Loader2, Mail, Plus, Trash2, User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import {
  UserForm,
  UserFormSuccessData,
} from "@/app/admin/users/_components/user-form";
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

  const handleCloseDialog = (data?: UserFormSuccessData) => {
    setIsDialogOpen(false);
    setSelectedUser(null);

    if (data) {
      if (data.operation === "create") {
        setUsers((prevUsers) => [data.user, ...prevUsers]);
      } else if (data.operation === "update") {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === data.user.id ? data.user : user))
        );
      }
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
    <div className="space-y-6 sm:p-4 p-1">
      {/* Header */}
      <div>
        <div className="flex md:flex-row flex-col justify-between md:items-center items-start">
          <div>
            <h1 className="admin-title text-3xl font-bold mb-2">Usuários</h1>
            <p className="admin-subtitle text-lg mb-4">
              Gerencie os usuários do sistema
            </p>
          </div>
          <Button
            className="admin-button-primary sm:w-auto w-full"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col w-full h-full overflow-hidden py-2">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <span className="text-muted-foreground">
              Carregando usuários...
            </span>
          </div>
        ) : (
          <div className="w-full text-left flex flex-col gap-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 admin-card">
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 justify-start">
                    <User className="text-disco-purple" />
                    <span className="text-xl">{user.name}</span>
                  </p>
                  <p className="flex gap-2 items-center antialiased leading-normal">
                    <Mail className="w-4 h-4 text-disco-orange" />
                    <span className="text-sm text-muted-foreground">
                      {user.email}
                    </span>
                  </p>
                </div>

                <div className="flex gap-5 justify-end mt-4">
                  <button
                    className="flex text-sm text-foreground hover:text-foreground/70 antialiased font-normal leading-normal cursor-pointer"
                    onClick={() => handleOpenDialog(user)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </button>
                  <button
                    className="flex text-sm text-destructive hover:text-destructive/70 antialiased font-normal leading-normal cursor-pointer"
                    onClick={() => setDeleteId(user.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
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
