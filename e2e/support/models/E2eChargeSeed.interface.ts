import type { CurrencyCode } from "@/app/constants";
import type { Database } from "@/app/types";

export interface E2eChargeSeed {
  amount: number;
  currency: CurrencyCode;
  kind?: Database["public"]["Enums"]["charge_kind"];
}
