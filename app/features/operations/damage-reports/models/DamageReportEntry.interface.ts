import type { Database } from "@/app/types";

export interface DamageReportEntry {
  cause: Database["public"]["Enums"]["damage_cause"];
  createdAt: string;
  description: string;
  id: string;
  impactDelta: number;
}
