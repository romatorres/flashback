"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Menu,
  X,
  User,
  ChevronUp,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonSignOut } from "./button-signout";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Agenda", href: "/admin/agenda", icon: Calendar },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  user: {
    name: string;
    email: string;
  };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="admin-mobile-overlay fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 admin-sidebar shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="admin-sidebar-header flex items-center justify-between h-16 px-4">
          <h2 className="text-lg font-semibold">FLASHBACK ADMIN</h2>
          <Button
            variant="ghost"
            size="sm"
            className="admin-button-ghost"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <SidebarContent pathname={pathname} user={user} />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow admin-sidebar admin-scrollbar">
          <div className="admin-sidebar-header flex items-center h-16 px-4">
            <h2 className="text-lg font-semibold">PAINEL</h2>
          </div>
          <SidebarContent pathname={pathname} user={user} />
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="admin-button-primary fixed top-4 left-4 z-40"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}

function UserMenu({ user }: { user: { name: string; email: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-user-menu">
      {/* User button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="admin-user-button w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center space-x-3">
          <div className="admin-user-avatar h-8 w-8 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-foreground truncate">
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="admin-user-dropdown">
          <div className="py-2">
            <div className="border-t border-border mt-2 pt-2">
              <div className="px-4 py-2 admin-button-ghost">
                <ButtonSignOut variant="menu" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  pathname,
  user,
}: {
  pathname: string;
  user: { name: string; email: string };
}) {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "admin-nav-item group flex items-center px-3 py-3 text-sm font-medium transition-all duration-300",
                isActive && "active"
              )}
            >
              <item.icon
                className={cn(
                  "admin-nav-icon mr-3 h-5 w-5 flex-shrink-0 transition-all duration-300"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User menu at bottom */}
      <UserMenu user={user} />
    </div>
  );
}
