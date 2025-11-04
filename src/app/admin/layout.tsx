import { redirect } from "next/navigation";
import { AdminSidebar } from "./_components/sidebar-admin";
import { AdminHeader } from "./_components/header-admin";
import { getAuthUser } from "@/lib/auth-server-utils";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="admin-layout">
      <AdminSidebar user={user} />
      <div className="md:pl-64">
        <AdminHeader user={user} />
        <div className="flex-1 p-6 pt-[73px]">{children}</div>
      </div>
    </div>
  );
}
