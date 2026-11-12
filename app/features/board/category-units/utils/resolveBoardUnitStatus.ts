import type { ActiveInventoryUnitStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CATEGORY_UNITS_ERROR } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNIT_STATUS_LABEL } from "../constants/CategoryUnitsCopy.constants";

const ACTIVE_STATUSES: readonly string[] = Object.keys(
  CATEGORY_UNIT_STATUS_LABEL
);

const isActiveStatus = (
  value: string
): value is ActiveInventoryUnitStatus =>
  ACTIVE_STATUSES.includes(value);

export const resolveBoardUnitStatus = (
  effectiveStatus: NullableRef<string>
): ActiveInventoryUnitStatus => {
  if (
    effectiveStatus === null ||
    !isActiveStatus(effectiveStatus)
  ) {
    throw new Error(CATEGORY_UNITS_ERROR.UNKNOWN_STATUS, {
      cause: effectiveStatus,
    });
  }

  return effectiveStatus;
};
