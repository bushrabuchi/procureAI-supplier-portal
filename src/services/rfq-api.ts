import { rfqs } from "@/lib/rfq-data";
import type { RFQ } from "@/types/procurement";

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchRFQs(): Promise<RFQ[]> {
  await delay(500);

  return [...rfqs];
}

export async function fetchRFQById(id: string): Promise<RFQ | undefined> {
  await delay(350);

  return rfqs.find((rfq) => rfq.id === id);
}
