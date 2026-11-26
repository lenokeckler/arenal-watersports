import type { NullableRef } from "@/app/types";

export interface DispatchCandidateUnit {
  code: string;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  isAssigned: boolean;
  lowFuelLines: number;
  unitId: string;
  usageTotal: number;
}
