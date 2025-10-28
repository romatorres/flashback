import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./_components/sidebar-admin";
import { AdminHeader } from "./_components/header-admin";

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
      <div className="lg:pl-64">
      <AdminHeader />
      <div className="flex-1 p-6 pt-[73px]">{children}</div>
    </div>
    </div>
  );
}
