"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDemoUser } from "@/lib/auth";
import { getSupplierQuotations } from "@/lib/quotation-store";
import { rfqs, formatSAR } from "@/lib/rfq-data";
import type { Quotation } from "@/types/procurement";
import { ArrowUpRight, Building2, CalendarDays, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const user = getDemoUser();

    if (user) {
      setQuotations(getSupplierQuotations(user.email));
    }

    setLoaded(true);
  }, []);

  return (
    <main className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Submissions
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">My quotations</h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Track the quotations you have submitted.
          </p>
        </div>
        {loaded && quotations.length > 0 && (
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {quotations.length} {quotations.length === 1 ? "submission" : "submissions"}
          </Badge>
        )}
      </div>

      {!loaded ? (
        <div className="rounded-xl border border-border/70 bg-card p-8 text-sm text-muted-foreground shadow-sm">
          Loading your quotations...
        </div>
      ) : quotations.length === 0 ? (
        <Card className="border-border/70 shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileText className="size-6" />
            </div>
            <h2 className="mt-5 text-lg font-semibold">No quotations yet</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              When you respond to an opportunity, your submission and status will appear here.
            </p>
            <Button
              className="mt-5"
              nativeButton={false}
              render={<Link href="/rfqs" />}
            >
              Browse opportunities <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {quotations.map((quotation) => {
            const rfq = rfqs.find((r) => r.id === quotation.rfqId);

            return (
              <Card key={quotation.id} className="border-border/70 shadow-sm">
                <CardContent className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div className="min-w-0 space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {quotation.rfqId}
                      </p>
                      <h2 className="mt-1.5 text-base font-semibold tracking-tight">
                        {rfq?.title ?? "RFQ"}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                      {rfq && (
                        <span className="flex items-center gap-1.5">
                          <Building2 className="size-3.5" /> {rfq.buyer}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" /> {quotation.deliveryDays} day delivery
                      </span>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                      {quotation.notes}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-4 sm:justify-end sm:border-0 sm:pt-0">
                    <div className="sm:text-right">
                      <Badge variant="secondary" className="rounded-full">
                        {quotation.status}
                      </Badge>
                      <p className="mt-2 text-lg font-semibold tracking-tight">
                        {formatSAR(quotation.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">Submitted amount</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={<Link href={`/rfqs/${quotation.rfqId}`} />}
                    >
                      View RFQ <ArrowUpRight className="ml-1.5 size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          </div>
      )}
    </main>
  );
}
