"use client";

import { useState, useEffect } from "react";

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

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true);
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-6">
        <h1 className="admin-title text-3xl font-bold mb-2">Usuários</h1>
        <p className="admin-subtitle text-lg">
          Gerencie os usuários do sistema
        </p>
      </div>

      <div className="">
        <table className="w-full">
          <thead className="bg-gray01">
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
        </table>
        <div className="admin-card">
          <div className="p-4 border-b border-border">
            <h3 className="admin-title text-lg font-semibold">Usuários</h3>
          </div>
          <nav className="p-2">
            {isLoading ? (
              <p className="p-4">Carregando...</p>
            ) : (
              users.map((user) => (
                <button
                  key={user.id}
                  className="admin-button-ghost w-full flex items-center space-x-3 px-3 py-3 text-left rounded-md"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {user.email}
                    </p>
                  </div>
                </button>
              ))
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
