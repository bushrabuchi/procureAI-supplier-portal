import type { Quotation } from "@/types/procurement";

const KEY = "procureai_demo_quotations";

export function getQuotations(): Quotation[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? (parsed as Quotation[]) : [];
  } catch {
    return [];
  }
}

export function getSupplierQuotations(email: string): Quotation[] {
  return getQuotations().filter(
    (q) => q.supplierEmail.toLowerCase() === email.toLowerCase(),
  );
}

export function submitQuotation(
  data: Omit<Quotation, "id" | "status" | "submittedAt">,
): boolean {
  const quotations = getQuotations();

  const alreadySubmitted = quotations.some(
    (q) =>
      q.rfqId === data.rfqId &&
      q.supplierEmail.toLowerCase() === data.supplierEmail.toLowerCase(),
  );

  if (alreadySubmitted) return false;

  const quotation: Quotation = {
    ...data,
    id: crypto.randomUUID(),
    status: "Submitted",
    submittedAt: new Date().toISOString(),
  };

  localStorage.setItem(KEY, JSON.stringify([quotation, ...quotations]));

  return true;
}
