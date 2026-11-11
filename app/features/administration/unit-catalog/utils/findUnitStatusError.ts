import type { NullableUndefined } from "@/app/types";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_EDITABLE_STATUS } from "../constants/UnitStatus.constants";

const EDITABLE_STATUS_VALUES: readonly string[] =
  Object.values(UNIT_EDITABLE_STATUS);

export const findUnitStatusError = (
  status: string
): NullableUndefined<string> =>
  EDITABLE_STATUS_VALUES.includes(status)
    ? undefined
    : UNIT_FORM_ERROR_COPY.STATUS_INVALID;
