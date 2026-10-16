import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentRFQs } from "@/components/dashboard/recent-rfqs";
import { dashboardStats } from "@/lib/dashboard-data";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Supplier overview
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Welcome back, Supplier!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Here&apos;s what&apos;s happening with your quotations.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full border border-border/80 bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm">
          <span className="size-2 rounded-full bg-emerald-500" />
          Demo workspace
        </div>
      </section>

      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/[0.08] via-card to-card p-5 sm:flex-row sm:items-center md:p-6">
        <div className="max-w-xl">
          <p className="font-semibold">Find your next opportunity</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Browse open requests and submit a quotation before the deadline.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/rfqs" />}
          className="shrink-0"
        >
          Browse RFQs <ArrowUpRight className="ml-2 size-4" />
        </Button>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="grid gap-5">
        <RevenueChart />
      </section>

      <section>
        <RecentRFQs />
      </section>

      <footer className="flex items-center gap-2 border-t pt-5 text-xs text-muted-foreground">
        <ArrowUpRight className="size-4" />
        Dashboard values are demonstration data and are not linked to a live
        account.
      </footer>
    </div>
  );
}
