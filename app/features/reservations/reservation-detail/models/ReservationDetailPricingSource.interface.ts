import type { Database } from "@/app/types";

export type ReservationDetailPricingSource = Pick<
  Database["public"]["Tables"]["reservation_pricing"]["Row"],
  | "agreed_amount_crc"
  | "agreed_amount_usd"
  | "list_amount_crc"
  | "list_amount_usd"
>;
