import Link from "next/link";
import { notFound } from "next/navigation";

import { rfqs, formatSAR } from "@/lib/rfq-data";
import { QuotationForm } from "@/components/rfqs/quotation-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function RFQDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rfq = rfqs.find((item) => item.id === id);

  if (!rfq) notFound();

  return (
    <main className="space-y-7">
      <Button
        variant="outline"
        nativeButton={false}
        render={<Link href="/rfqs" />}
      >
        ← Back to RFQs
      </Button>

      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/70 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {rfq.id}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            {rfq.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{rfq.buyer}</p>
        </div>
        <Badge
          variant={rfq.status === "Open" ? "default" : "secondary"}
          className="rounded-full px-3 py-1"
        >
          {rfq.status}
        </Badge>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="border-border/70 shadow-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Request overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="leading-7 text-muted-foreground">
                {rfq.description}
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-muted/70 p-3">
                  <p className="text-xs text-muted-foreground">
                    Estimated budget
                  </p>
                  <strong className="mt-1 block text-sm font-semibold">
                    {formatSAR(rfq.budget)}
                  </strong>
                </div>
                <div className="rounded-lg bg-muted/70 p-3">
                  <p className="text-xs text-muted-foreground">
                    Submission deadline
                  </p>
                  <strong className="mt-1 block text-sm font-semibold">
                    {rfq.deadline}
                  </strong>
                </div>
                <div className="rounded-lg bg-muted/70 p-3">
                  <p className="text-xs text-muted-foreground">Category</p>
                  <strong className="mt-1 block text-sm font-semibold">
                    {rfq.category}
                  </strong>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Requested items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="bg-muted/60 p-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Description
                      </th>
                      <th className="bg-muted/60 p-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Quantity
                      </th>
                      <th className="bg-muted/60 p-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfq.items.map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="p-3">{item.description}</td>
                        <td className="p-3">{item.quantity}</td>
                        <td className="p-3">{item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/70 shadow-sm lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Submit your quotation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rfq.status === "Open" ? (
              <QuotationForm rfqId={rfq.id} />
            ) : (
              <p className="text-sm text-muted-foreground">
                This RFQ is closed for submissions.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
