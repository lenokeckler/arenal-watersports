import type { Database } from "@/app/types";

export interface E2eCustomComboTariffSnapshot {
  categoryIds: string[];
  rows: Database["public"]["Tables"]["tariffs"]["Row"][];
}
