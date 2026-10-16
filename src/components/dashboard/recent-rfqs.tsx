import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentRFQs } from "@/lib/dashboard-data";

const currency = new Intl.NumberFormat("en-SA", {
  style: "currency",
  currency: "SAR",
  maximumFractionDigits: 0,
});

export function RecentRFQs() {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Recent RFQ Invitations</CardTitle>
          <CardDescription>Latest procurement opportunities</CardDescription>
        </div>

        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href="/rfqs" />}
        >
          View All
          <ArrowUpRight className="ml-2 size-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RFQ</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentRFQs.map((rfq) => (
                <TableRow key={rfq.id}>
                  <TableCell>
                    <div className="font-medium">{rfq.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {rfq.id}
                    </div>
                  </TableCell>
                  <TableCell>{rfq.buyer}</TableCell>
                  <TableCell>{rfq.deadline}</TableCell>
                  <TableCell>{currency.format(rfq.budget)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={rfq.status === "Open" ? "default" : "secondary"}
                    >
                      {rfq.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
