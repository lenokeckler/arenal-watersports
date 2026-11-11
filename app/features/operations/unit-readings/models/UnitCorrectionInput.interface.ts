import type { Database } from "@/app/types";

export interface UnitCorrectionInput {
  fuelLevel: number;
  fuelMax: number;
  impactCount: number;
  status: Database["public"]["Enums"]["unit_status"];
  unitId: string;
  usageTotal: number;
}
