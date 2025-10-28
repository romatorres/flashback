"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/search-filter";
import { Plus } from "lucide-react";

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@exemplo.com",
    role: "Admin",
    status: "Ativo",
    lastLogin: "2024-01-15",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@exemplo.com",
    role: "Editor",
    status: "Ativo",
    lastLogin: "2024-01-14",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@exemplo.com",
    role: "Visualizador",
    status: "Inativo",
    lastLogin: "2024-01-10",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar usuários baseado no termo de busca
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="admin-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="admin-title text-3xl font-bold mb-2">Usuários</h1>
            <p className="admin-subtitle text-lg">
              Gerencie os usuários do sistema
            </p>
          </div>
          <Button className="admin-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <SearchFilter
        placeholder="Buscar usuários..."
        onSearch={setSearchTerm}
        onFilter={() => console.log("Abrir filtros")}
      />

      {/* Users table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto admin-scrollbar">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Função
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Último Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {user.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-disco-blue/20 text-disco-blue border border-disco-blue/30">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                          user.status === "Ativo"
                            ? "bg-disco-green/20 text-disco-green border-disco-green/30"
                            : "bg-destructive/20 text-destructive border-destructive/30"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="admin-button-ghost"
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    {searchTerm
                      ? `Nenhum usuário encontrado para "${searchTerm}"`
                      : "Nenhum usuário encontrado"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
