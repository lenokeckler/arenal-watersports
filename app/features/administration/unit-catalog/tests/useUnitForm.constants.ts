import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { UnitFieldHandlers } from "../models/UnitFieldHandlers.interface";
import type { UnitFormErrors } from "../models/UnitFormErrors.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";
import type { UnitMutationResult } from "../models/UnitMutationResult.interface";
import { FAKE_UNIT_ID } from "./Unit.constants";

export const SUCCESS_RESULT: UnitMutationResult = {
  status: UNIT_MUTATION_STATUS.SUCCESS,
  unitId: FAKE_UNIT_ID,
};

export const FAKE_ACTION_FAILURE_MESSAGE =
  "fake-unit-action-failure";
export const FAKE_CONTROL_FLOW_SIGNAL_MESSAGE =
  "fake-control-flow-signal";
export const FAKE_SERVER_MESSAGE =
  "fake-unit-server-message";
export const FAKE_CODE_ERROR = "fake-unit-code-error";
export const SUBMISSIONS_AFTER_RELEASE = 2;
export const EDITED_TEXT = "7";
export const EDITED_CODE = "JET-02";

export const ALL_FIELD_ERRORS: Required<UnitFormErrors> = {
  code: UNIT_FORM_ERROR_COPY.CODE_REQUIRED,
  status: "fake-status-error",
  fuelMax: UNIT_FORM_ERROR_COPY.FUEL_MAX_INVALID,
  fuelLevel: UNIT_FORM_ERROR_COPY.FUEL_LEVEL_INVALID,
  usageTotal: UNIT_FORM_ERROR_COPY.DECIMAL_INVALID,
  nextOilChangeAt: UNIT_FORM_ERROR_COPY.DECIMAL_INVALID,
};

export const FIELD_CASES: Array<{
  field: keyof UnitFormValues;
  change: keyof UnitFieldHandlers;
  value: string;
}> = [
  {
    field: "code",
    change: "onCodeChange",
    value: EDITED_CODE,
  },
  {
    field: "status",
    change: "onStatusChange",
    value: UNIT_STATUS.IN_REPAIR,
  },
  {
    field: "fuelMax",
    change: "onFuelMaxChange",
    value: EDITED_TEXT,
  },
  {
    field: "fuelLevel",
    change: "onFuelLevelChange",
    value: EDITED_TEXT,
  },
  {
    field: "usageTotal",
    change: "onUsageTotalChange",
    value: EDITED_TEXT,
  },
  {
    field: "nextOilChangeAt",
    change: "onNextOilChangeAtChange",
    value: EDITED_TEXT,
  },
];

export const errorsWithout = (
  field: keyof UnitFormErrors
): UnitFormErrors => {
  const remainingErrors = { ...ALL_FIELD_ERRORS };
  delete remainingErrors[field];
  return remainingErrors;
};
