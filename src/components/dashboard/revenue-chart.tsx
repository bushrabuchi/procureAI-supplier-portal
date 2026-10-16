"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { monthlyPerformance } from "@/lib/dashboard-data";

export function RevenueChart() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Quotation Performance</CardTitle>
        <CardDescription>
          Submitted and approved quotations over six months
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyPerformance}>
              <defs>
                <linearGradient
                  id="submittedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0f9f78" stopOpacity={0.24} />
                  <stop offset="100%" stopColor="#0f9f78" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  color: "var(--card-foreground)",
                }}
              />

              <Legend />

              <Area
                type="monotone"
                dataKey="submitted"
                name="Submitted"
                stroke="#0f9f78"
                strokeWidth={3}
                fill="url(#submittedGradient)"
              />

              <Area
                type="monotone"
                dataKey="approved"
                name="Approved"
                stroke="#6687a8"
                strokeWidth={3}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
