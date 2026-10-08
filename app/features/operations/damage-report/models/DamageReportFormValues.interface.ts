import type { Database } from "@/app/types";

export interface DamageReportFormValues {
  unitId: string;
  cause: Database["public"]["Enums"]["damage_cause"] | null;
  description: string;
  impactDelta: number;
}
