import type { NullableRef } from "@/app/types";

export interface DispatchCandidateUnit {
  code: string;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  isAssigned: boolean;
  unitId: string;
  usageTotal: number;
}
