import type { UnitStatus } from "../constants/UnitStatus.constants";

export interface UnitFormValues {
  code: string;
  status: UnitStatus;
  fuelMax: string;
  fuelLevel: string;
  usageTotal: string;
  nextOilChangeAt: string;
}
