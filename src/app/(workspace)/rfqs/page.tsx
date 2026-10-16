"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpRight,
  SlidersHorizontal,
  Building2,
  CalendarDays,
  Wallet,
} from "lucide-react";
import { rfqs, formatSAR } from "@/lib/rfq-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RFQsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("deadline");

  const categories = ["All", ...new Set(rfqs.map((r) => r.category))];

  const filtered = useMemo(() => {
    return rfqs
      .filter((rfq) => {
        const query = search.toLowerCase().trim();

        return (
          (category === "All" || rfq.category === category) &&
          (status === "All" || rfq.status === status) &&
          (rfq.title.toLowerCase().includes(query) ||
            rfq.id.toLowerCase().includes(query) ||
            rfq.buyer.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        if (sort === "budget-high") return b.budget - a.budget;
        if (sort === "budget-low") return a.budget - b.budget;
        return a.deadline.localeCompare(b.deadline);
      });
  }, [search, category, status, sort]);

  return (
    <div className="space-y-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Opportunities
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              RFQ Invitations
            </h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Explore and respond to procurement opportunities.
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {filtered.length}{" "}
            {filtered.length === 1 ? "opportunity" : "opportunities"}
          </Badge>
        </div>

        <Card className="border-border/70 shadow-sm">
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative sm:col-span-2 xl:col-span-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search RFQs"
                placeholder="Search RFQs..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              aria-label="Category"
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              aria-label="RFQ status"
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {["All", "Open", "Closed"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>

            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <select
                aria-label="Sort RFQs"
                className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="deadline">Deadline</option>
                <option value="budget-high">Highest Budget</option>
                <option value="budget-low">Lowest Budget</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5 xl:grid-cols-2">
          {filtered.map((rfq) => (
            <Card
              key={rfq.id}
              className="border-border/70 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {rfq.id}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
                      {rfq.title}
                    </h2>
                  </div>
                  <Badge
                    variant={rfq.status === "Open" ? "default" : "secondary"}
                    className="shrink-0 rounded-full"
                  >
                    <span
                      className={`mr-1.5 size-1.5 rounded-full ${
                        rfq.status === "Open"
                          ? "bg-white"
                          : "bg-muted-foreground"
                      }`}
                    />
                    {rfq.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="size-4" />
                  <span>{rfq.buyer}</span>
                  <span aria-hidden="true" className="mx-1 text-border">
                    ·
                  </span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground">
                    {rfq.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 border-y border-border/70 py-4 text-sm">
                  <div className="space-y-1.5">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Wallet className="size-3.5" /> Estimated budget
                    </p>
                    <strong className="font-semibold">
                      {formatSAR(rfq.budget)}
                    </strong>
                  </div>
                  <div className="space-y-1.5">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" /> Submission deadline
                    </p>
                    <strong className="font-semibold">{rfq.deadline}</strong>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-between"
                  nativeButton={false}
                  render={<Link href={`/rfqs/${rfq.id}`} />}
                >
                  View RFQ
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed bg-card px-6 py-16 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Search className="size-5" />
            </div>
            <h2 className="mt-4 font-semibold">No opportunities found</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
    </div>
  );
}
