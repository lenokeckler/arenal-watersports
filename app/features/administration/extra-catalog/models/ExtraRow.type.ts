import type { Database } from "@/app/types";
import type { ExtraCompatibilityCountRow } from "./ExtraCompatibilityCountRow.interface";

export type ExtraRow = Pick<
  Database["public"]["Tables"]["extras"]["Row"],
  "id" | "name" | "status" | "price_usd" | "price_crc"
> & {
  extra_compatibility: ExtraCompatibilityCountRow[];
};
