import type { NullableRef } from "@/app/types";
import type { UnitUsageMetric } from "../constants/UnitUsageMetric.constants";
import type { UnitFieldHandlers } from "./UnitFieldHandlers.interface";
import type { UnitFormErrors } from "./UnitFormErrors.interface";
import type { UnitFormValues } from "./UnitFormValues.interface";

export interface UnitFormMotorFieldsProps extends Pick<
  UnitFieldHandlers,
  | "onFuelMaxChange"
  | "onFuelLevelChange"
  | "onUsageTotalChange"
  | "onNextOilChangeAtChange"
> {
  values: UnitFormValues;
  errors: UnitFormErrors;
  usageMetric: NullableRef<UnitUsageMetric>;
  disabled: boolean;
}
