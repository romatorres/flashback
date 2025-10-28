"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface AdminHeaderProps {
  user?: {
    name: string;
    email: string;
  };
}

export function AdminHeader({}: AdminHeaderProps) {
  return (
    <header className="admin-header fixed top-0 right-0 z-50 lg:w-[calc(100%-16rem)]">
      <div className="flex items-center justify-between h-[57px] px-6">
        {/* Left side */}
        <div>
          <h3 className="admin-header-logo text-xl font-bold">FLASHBACK</h3>
        </div>
        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="admin-button-ghost relative"
          >
            <Bell className="h-5 w-5" />
            <span className="admin-notification-badge absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
