import type { Database } from "@/app/types";

export type ExtraPriceColumns = Pick<
  Database["public"]["Tables"]["extras"]["Update"],
  "price_usd" | "price_crc"
>;
