export type RFQStatus = "Open" | "Submitted" | "Closed";

export interface RFQ {
  id: string;
  title: string;
  buyer: string;
  deadline: string;
  budget: number;
  status: RFQStatus;
}

export const dashboardStats = [
  {
    title: "Active RFQs",
    value: "12",
    change: "+3 this month",
    icon: "file",
  },
  {
    title: "Submitted Quotations",
    value: "28",
    change: "+8 this month",
    icon: "send",
  },
  {
    title: "Approved Quotations",
    value: "9",
    change: "+2 this month",
    icon: "check",
  },
  {
    title: "Total Quotation Value",
    value: "SAR 845K",
    change: "+12.5% this month",
    icon: "wallet",
  },
] as const;

export const monthlyPerformance = [
  { month: "Jan", submitted: 6, approved: 2 },
  { month: "Feb", submitted: 9, approved: 4 },
  { month: "Mar", submitted: 8, approved: 3 },
  { month: "Apr", submitted: 13, approved: 6 },
  { month: "May", submitted: 17, approved: 7 },
  { month: "Jun", submitted: 22, approved: 9 },
];

export const recentRFQs: RFQ[] = [
  {
    id: "RFQ-2026-001",
    title: "Enterprise Laptop Procurement",
    buyer: "Gulf Digital Solutions",
    deadline: "2026-11-05",
    budget: 125000,
    status: "Open",
  },
  {
    id: "RFQ-2026-002",
    title: "Office Furniture Supply",
    buyer: "Eastern Business Group",
    deadline: "2026-11-12",
    budget: 85000,
    status: "Submitted",
  },
  {
    id: "RFQ-2026-003",
    title: "Network Infrastructure",
    buyer: "Saudi Tech Services",
    deadline: "2026-11-20",
    budget: 220000,
    status: "Open",
  },
  {
    id: "RFQ-2026-004",
    title: "Annual Maintenance Contract",
    buyer: "Regional Facilities Co.",
    deadline: "2026-10-28",
    budget: 65000,
    status: "Closed",
  },
];
