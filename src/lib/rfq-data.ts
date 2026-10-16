import type { RFQ } from "@/types/procurement";

export const rfqs: RFQ[] = [
  {
    id: "RFQ-2026-001",
    title: "Enterprise Laptop Procurement",
    buyer: "Gulf Digital Solutions",
    category: "IT Equipment",
    description: "Supply business laptops for the company's office expansion.",
    deadline: "2026-11-05",
    budget: 125000,
    status: "Open",
    items: [
      { description: "Business laptops", quantity: 40, unit: "pcs" },
      { description: "Laptop docking stations", quantity: 20, unit: "pcs" },
    ],
  },
  {
    id: "RFQ-2026-002",
    title: "Office Furniture Supply",
    buyer: "Eastern Business Group",
    category: "Office Supplies",
    description: "Furniture for a new regional office.",
    deadline: "2026-11-12",
    budget: 85000,
    status: "Open",
    items: [
      { description: "Office desks", quantity: 30, unit: "pcs" },
      { description: "Ergonomic chairs", quantity: 30, unit: "pcs" },
    ],
  },
  {
    id: "RFQ-2026-003",
    title: "Network Infrastructure",
    buyer: "Saudi Tech Services",
    category: "IT Equipment",
    description: "Networking hardware for an infrastructure upgrade.",
    deadline: "2026-11-20",
    budget: 220000,
    status: "Open",
    items: [
      { description: "Network switches", quantity: 12, unit: "pcs" },
      { description: "Wireless access points", quantity: 35, unit: "pcs" },
    ],
  },
  {
    id: "RFQ-2026-004",
    title: "Annual Maintenance Contract",
    buyer: "Regional Facilities Co.",
    category: "Maintenance",
    description: "Annual preventive maintenance services.",
    deadline: "2026-10-10",
    budget: 65000,
    status: "Closed",
    items: [
      { description: "Maintenance services", quantity: 12, unit: "months" },
    ],
  },
];

export const formatSAR = (amount: number) =>
  new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 2,
  }).format(amount);
