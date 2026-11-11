import type { NullableRef } from "@/app/types";
import type {
  UnitEffectiveStatus,
  UnitStatus,
} from "../constants/UnitStatus.constants";

export interface UnitListItem {
  id: string;
  code: string;
  recordedStatus: UnitStatus;
  effectiveStatus: UnitEffectiveStatus;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  usageTotal: number;
  nextOilChangeAt: NullableRef<number>;
  decommissioned: boolean;
}
