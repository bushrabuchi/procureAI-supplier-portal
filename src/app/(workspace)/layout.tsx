"use client";

import { useState, type ReactNode } from "react";
import { AuthGate } from "@/components/auth/auth-provider";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export default function PortalLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AuthGate>
      <div className="min-h-screen bg-muted/30">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
          <AppSidebar />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-64 border-0 p-0">
            <SheetTitle className="sr-only">Supplier Navigation</SheetTitle>
            <AppSidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="min-w-0 lg:pl-64">
          <AppHeader onMenuClick={() => setMobileOpen(true)} />

          <main id="main-content" className="mx-auto max-w-7xl p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGate>
  );
}
