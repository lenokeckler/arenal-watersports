import type { Database } from "@/app/types";

export interface CreateDamageReportInput {
  unitId: string;
  cause: Database["public"]["Enums"]["damage_cause"];
  description: string;
  impactDelta: number;
}
