# Sistema de Proteção com Roles - Better Auth

Este documento explica como funciona o sistema de roles e proteção de rotas implementado com Better Auth no projeto Flashback.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Roles](#estrutura-de-roles)
3. [Configuração do Better Auth](#configuração-do-better-auth)
4. [Proteção de Rotas](#proteção-de-rotas)
5. [Utilitários de Autenticação](#utilitários-de-autenticação)
6. [APIs Protegidas](#apis-protegidas)
7. [Gerenciamento de Usuários](#gerenciamento-de-usuários)
8. [Exemplos Práticos](#exemplos-práticos)
9. [Boas Práticas](#boas-práticas)

## 🎯 Visão Geral

O sistema implementa um controle de acesso baseado em roles (RBAC - Role-Based Access Control) usando Better Auth com três níveis de permissão:

- **ADMIN**: Acesso total ao sistema
- **EDITOR**: Pode gerenciar conteúdo (agenda, posts, etc.)
- **USER**: Acesso básico (apenas visualização)

## 🏗️ Estrutura de Roles

### Schema do Banco (Prisma)

```prisma
enum UserRole {
  ADMIN
  EDITOR
  USER
}

model User {
  id            String    @id @default(cuid())
  name          String
  email         String
  role          UserRole  @default(USER)
  banned        Boolean   @default(false)
  // ... outros campos
}
```

### Tipos TypeScript

```typescript
// src/lib/types.ts
export type UserRole = PrismaUserRole;
export const userRoles = ["ADMIN", "EDITOR", "USER"] as const;
```

## ⚙️ Configuração do Better Auth

### Configuração Principal

```typescript
// src/lib/auth.ts
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
  },
  plugins: [
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
    }),
    customSession(async ({ user }) => {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });

        return {
          user: {
            ...user,
            role: dbUser?.role || "USER",
          },
        };
      }
      return {};
    }),
  ],
});
```

### Cliente de Autenticação

```typescript
// src/lib/auth-client.ts
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});
```

## 🛡️ Proteção de Rotas

### Layout Protegido (Admin)

```typescript
// src/app/admin/layout.tsx
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="admin-layout">
      <AdminSidebar user={session.user} />
      <div className="md:pl-64">
        <AdminHeader />
        <div className="flex-1 p-6 pt-[73px]">{children}</div>
      </div>
    </div>
  );
}
```

### Middleware de Proteção (Opcional)

```typescript
// middleware.ts (se necessário)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Lógica de proteção adicional se necessário
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
```

## 🔧 Utilitários de Autenticação

### Servidor (Server Actions)

```typescript
// src/lib/auth-server-utils.ts

// Obter usuário autenticado
export async function getAuthUser(): Promise<AuthUser | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session?.user) return null;
  
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: (session.user.role as UserRole) || "USER",
  };
}

// Requer autenticação
export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

// Requer role de Admin
export async function requireAdmin() {
  const user = await getAuthUser();
  if (user?.role !== 'ADMIN') {
    throw new Error("Unauthorized");
  }
  return user;
}

// Requer role de Editor ou Admin
export async function requireEditorOrAdmin() {
  const user = await getAuthUser();
  if (user?.role !== 'ADMIN' && user?.role !== 'EDITOR') {
    throw new Error("Unauthorized");
  }
  return user;
}
```

### Cliente (Componentes React)

```typescript
// src/lib/auth-utils.ts

export function isAdmin(role: UserRole): boolean {
  return role === "ADMIN";
}

export function isEditor(role: UserRole): boolean {
  return role === "EDITOR";
}

export function canManageUsers(role: UserRole): boolean {
  return role === "ADMIN";
}

export function canManageContent(role: UserRole): boolean {
  return role === "ADMIN" || role === "EDITOR";
}
```

## 🔌 APIs Protegidas

### Exemplo de API Protegida

```typescript
// src/app/api/users/route.ts
import { requireAdmin } from "@/lib/auth-server-utils";

export async function GET() {
  try {
    // Verifica se o usuário é admin
    await requireAdmin();
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Acesso negado" },
      { status: 403 }
    );
  }
}
```

### API para Atualizar Roles

```typescript
// src/app/api/users/[id]/role/route.ts
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { role } = body;

    const resolvedParams = await params;
    const user = await updateUserRole(resolvedParams.id, role);
    return NextResponse.json(user);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Erro ao atualizar role do usuário.";
    return NextResponse.json(
      { message: errorMessage },
      { status: errorMessage.includes("Apenas administradores") ? 403 : 500 }
    );
  }
}
```

## 👥 Gerenciamento de Usuários

### Server Actions

```typescript
// src/actions/users.ts

// Criar usuário (apenas Admin)
export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}) {
  await requireAdmin();

  const result = await auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
    },
  });

  // Atualizar o role se fornecido
  if (data.role && result.user) {
    await prisma.user.update({
      where: { id: result.user.id },
      data: { role: data.role },
    });
  }

  return result;
}

// Atualizar role do usuário (apenas Admin)
export async function updateUserRole(userId: string, role: UserRole) {
  const currentUser = await requireAdmin();

  // Não pode alterar o próprio role
  if (currentUser.id === userId) {
    throw new Error("Você não pode alterar seu próprio role");
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return user;
}
```

### Store Zustand

```typescript
// src/stores/usersStore.ts
export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    // ... outros métodos
    
    updateUserRole: async (id, role) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/users/${id}/role`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        });
        
        if (!response.ok) {
          throw new Error("Erro ao atualizar role do usuário.");
        }
        
        const data = await response.json();
        set((state) => ({
          users: state.users.map((user) => 
            user.id === id ? data : user
          ),
          loading: false,
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      }
    },
  }))
);
```

## 💡 Exemplos Práticos

### 1. Componente com Proteção de Role

```typescript
// Componente que só aparece para Admins
function AdminOnlyComponent() {
  const { data: session } = useSession();
  
  if (!session?.user || !isAdmin(session.user.role)) {
    return null;
  }
  
  return (
    <div>
      <h2>Painel Administrativo</h2>
      {/* Conteúdo apenas para admins */}
    </div>
  );
}
```

### 2. Botão Condicional por Role

```typescript
function ActionButton({ user }: { user: User }) {
  const canEdit = canManageContent(user.role);
  const canDelete = isAdmin(user.role);
  
  return (
    <div className="flex gap-2">
      {canEdit && (
        <Button onClick={handleEdit}>
          Editar
        </Button>
      )}
      {canDelete && (
        <Button variant="destructive" onClick={handleDelete}>
          Excluir
        </Button>
      )}
    </div>
  );
}
```

### 3. Hook Personalizado para Roles

```typescript
// src/hooks/useAuth.ts
export function useAuth() {
  const { data: session, isLoading } = useSession();
  
  return {
    user: session?.user,
    isLoading,
    isAuthenticated: !!session?.user,
    isAdmin: session?.user ? isAdmin(session.user.role) : false,
    isEditor: session?.user ? isEditor(session.user.role) : false,
    canManageUsers: session?.user ? canManageUsers(session.user.role) : false,
    canManageContent: session?.user ? canManageContent(session.user.role) : false,
  };
}
```

### 4. Proteção de Página Completa

```typescript
// src/app/admin/users/page.tsx
export default function UsersPage() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!user || !canManageUsers(user.role)) {
    return <AccessDenied />;
  }
  
  return (
    <div>
      {/* Conteúdo da página */}
    </div>
  );
}
```

## ✅ Boas Práticas

### 1. Sempre Validar no Servidor
```typescript
// ❌ Não confie apenas na validação do cliente
if (userRole === 'ADMIN') {
  // Ação sensível
}

// ✅ Sempre valide no servidor
export async function sensitiveAction() {
  await requireAdmin(); // Valida no servidor
  // Ação sensível
}
```

### 2. Use Tipos TypeScript
```typescript
// ✅ Use tipos para evitar erros
function checkPermission(role: UserRole) {
  return isAdmin(role);
}
```

### 3. Centralize a Lógica de Permissões
```typescript
// ✅ Centralize em utilitários
export const permissions = {
  canCreateUser: (role: UserRole) => isAdmin(role),
  canEditContent: (role: UserRole) => canManageContent(role),
  canViewAnalytics: (role: UserRole) => role !== 'USER',
};
```

### 4. Trate Erros Adequadamente
```typescript
// ✅ Trate erros de autorização
try {
  await requireAdmin();
  // Ação protegida
} catch (error) {
  if (error.message === 'Unauthorized') {
    return NextResponse.json(
      { message: 'Acesso negado' },
      { status: 403 }
    );
  }
  throw error;
}
```

### 5. Use Middleware para Rotas Sensíveis
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin')) {
    // Verificações adicionais se necessário
  }
  
  return NextResponse.next();
}
```

## 🔄 Fluxo de Autenticação

1. **Login**: Usuário faz login via Better Auth
2. **Sessão**: Better Auth cria sessão com role do usuário
3. **Proteção**: Layout/páginas verificam sessão e role
4. **APIs**: Server actions validam permissões
5. **UI**: Componentes mostram/escondem baseado em roles

## 🚀 Como Usar

### Para Proteger uma Nova Rota:

1. **Crie o layout protegido** ou use o existente
2. **Adicione validação de role** se necessário
3. **Implemente server actions** com `requireAdmin()` ou `requireEditorOrAdmin()`
4. **Use utilitários** nos componentes para mostrar/esconder elementos

### Para Adicionar Nova Role:

1. **Atualize o enum** no schema Prisma
2. **Execute migração** do banco
3. **Atualize tipos** TypeScript
4. **Adicione utilitários** de validação
5. **Atualize configuração** do Better Auth se necessário

Este sistema fornece uma base sólida e escalável para controle de acesso baseado em roles usando Better Auth.