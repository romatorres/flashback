"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Image from "next/image";

interface AdminHeaderProps {
  user?: {
    name: string;
    email: string;
  };
}

export function AdminHeader({}: AdminHeaderProps) {
  return (
    <header className="admin-header fixed top-0 left-0 right-0 z-30 md:left-64">
      <div className="flex items-center md:justify-between justify-end h-[57px] px-6">
        {/* Left side */}
        <div className="md:block hidden">
          <Image
            src="/img/logo-icon_gradient.png"
            alt="Logo Icon"
            width={36}
            height={36}
          />
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
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
