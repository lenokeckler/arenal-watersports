import type { NullableUndefined } from "@/app/types";
import type { UnitFormMode } from "../constants/UnitFormMode.constants";
import type { UnitFormValues } from "./UnitFormValues.interface";

export interface SaveUnitOptions {
  mode: UnitFormMode;
  categoryId: string;
  unitId?: NullableUndefined<string>;
  hasMotor: boolean;
  values: UnitFormValues;
}
