import {
  FileText,
  Send,
  CircleCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const icons: Record<string, LucideIcon> = {
  file: FileText,
  send: Send,
  check: CircleCheck,
  wallet: Wallet,
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: keyof typeof icons;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  const Icon = icons[icon];

  return (
    <Card className="group border-border/70 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardContent className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{value}</h3>
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            {change}
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/15">
          <Icon className="size-6" />
        </div>
      </CardContent>
    </Card>
  );
}
