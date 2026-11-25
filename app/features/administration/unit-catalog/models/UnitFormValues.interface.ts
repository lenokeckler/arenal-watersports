import type { UnitStatus } from "../constants/UnitStatus.constants";

export interface UnitFormValues {
  code: string;
  status: UnitStatus;
  fuelMax: string;
  fuelLevel: string;
  lowFuelLines: string;
  usageTotal: string;
  nextOilChangeAt: string;
}
