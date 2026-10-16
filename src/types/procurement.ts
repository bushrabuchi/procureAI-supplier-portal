export type RFQStatus = "Open" | "Closed";

export interface RFQItem {
  description: string;
  quantity: number;
  unit: string;
}

export interface RFQ {
  id: string;
  title: string;
  buyer: string;
  category: string;
  description: string;
  deadline: string;
  budget: number;
  status: RFQStatus;
  items: RFQItem[];
}

export interface Quotation {
  id: string;
  rfqId: string;
  supplierEmail: string;
  amount: number;
  deliveryDays: number;
  notes: string;
  status: "Submitted";
  submittedAt: string;
}
