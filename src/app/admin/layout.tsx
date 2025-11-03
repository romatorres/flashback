import { redirect } from "next/navigation";
import { AdminSidebar } from "./_components/sidebar-admin";
import { AdminHeader } from "./_components/header-admin";
import { requireEditorOrAdmin } from "@/lib/auth-middleware";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const user = await requireEditorOrAdmin();

    return (
      <div className="admin-layout">
        <AdminSidebar user={user} />
        <div className="md:pl-64">
          <AdminHeader user={user} />
          <div className="flex-1 p-6 pt-[73px]">{children}</div>
        </div>
      </div>
    );
  } catch {
    redirect("/login");
  }
}
