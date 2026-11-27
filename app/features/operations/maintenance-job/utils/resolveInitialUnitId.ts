import { LENGTH } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import type { MaintenanceJobProps } from "../models/MaintenanceJobProps.interface";

export const resolveInitialUnitId = (
  unitParam: MaintenanceJobProps["unitParam"]
): NullableUndefined<string> =>
  Array.isArray(unitParam)
    ? unitParam[LENGTH.ZERO]
    : unitParam;
