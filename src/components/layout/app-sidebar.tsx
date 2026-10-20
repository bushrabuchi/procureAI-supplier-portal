"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Send,
  Sparkles,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExternalLink, ShieldCheck } from "lucide-react";
const navigation = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "RFQ Invitations", href: "/rfqs", icon: FileText },
  { title: "My Quotations", href: "/quotations", icon: Send },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r border-supplier-panel-border bg-supplier-panel text-slate-300">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
          <Sparkles className="size-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white">
            ProcureAI
          </h2>
          <p className="text-[11px] text-slate-300">SUPPLIER WORKSPACE</p>
        </div>
      </div>

      <div className="px-5 pb-2 pt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
        Workspace
      </div>
      <nav aria-label="Supplier portal" className="flex-1 space-y-1 px-3 py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                "hover:bg-white/5 hover:text-white",
                active
                  ? "bg-emerald-400/10 text-white ring-1 ring-inset ring-emerald-400/20"
                  : "text-slate-300",
              )}
            >
              <Icon
                className={cn(
                  "size-5 transition-colors",
                  active ? "text-supplier-accent" : "group-hover:text-white",
                )}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <LifeBuoy className="size-4 text-supplier-accent" />
            Need a hand?
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
            Your supplier workspace is in demo mode.
          </p>
        </div>
      </div>
    </div>
  );
}
