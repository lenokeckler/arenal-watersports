import type { NullableRef } from "@/app/types";

export interface MaintenanceHistoryEntry {
  categoryName: string;
  costAmount: NullableRef<number>;
  costCurrency: NullableRef<string>;
  description: NullableRef<string>;
  id: string;
  isExternal: boolean;
  performedAt: string;
  unitCode: string;
  workType: string;
}
