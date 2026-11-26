import { STRING } from "@/app/constants";
import {
  MAINTENANCE_JOB_CURRENCY,
  MAINTENANCE_JOB_LIMITS,
  MAINTENANCE_JOB_PATTERN,
  MAINTENANCE_JOB_WORK_TYPE,
} from "../constants/MaintenanceJob.constants";
import { MAINTENANCE_JOB_COPY } from "../constants/MaintenanceJobCopy.constants";
import type { MaintenanceJobDraft } from "../models/MaintenanceJobDraft.interface";
import type {
  MaintenanceJobCurrency,
  MaintenanceJobWorkType,
} from "../models/MaintenanceJobInput.interface";
import type {
  MaintenanceJobErrors,
  MaintenanceJobFormResult,
} from "../models/MaintenanceJobFormResult.interface";
import type { MaintenanceJobUnit } from "../models/MaintenanceJobUnit.interface";
import { parseMaintenanceAmount } from "./parseMaintenanceAmount";

const WORK_TYPES: readonly string[] = Object.values(
  MAINTENANCE_JOB_WORK_TYPE
);

const CURRENCIES: readonly string[] = Object.values(
  MAINTENANCE_JOB_CURRENCY
);

const isFilled = (text: string): boolean =>
  text.trim() !== STRING.Empty;

export const buildMaintenanceJobForm = (
  draft: MaintenanceJobDraft,
  units: MaintenanceJobUnit[],
  today: string
): MaintenanceJobFormResult => {
  const unit = units.find(
    (item) => item.unitId === draft.unitId
  );
  const isOilChange =
    draft.workType === MAINTENANCE_JOB_WORK_TYPE.OIL_CHANGE;
  const hasCost =
    isFilled(draft.costAmount) ||
    isFilled(draft.costCurrency);
  const costAmount = parseMaintenanceAmount(
    draft.costAmount
  );
  const oilInterval = parseMaintenanceAmount(
    draft.oilInterval
  );

  const errors: MaintenanceJobErrors = {
    cost:
      hasCost && costAmount === null
        ? MAINTENANCE_JOB_COPY.ERROR_COST
        : null,
    currency:
      hasCost && !CURRENCIES.includes(draft.costCurrency)
        ? MAINTENANCE_JOB_COPY.ERROR_CURRENCY
        : null,
    date:
      MAINTENANCE_JOB_PATTERN.DATE.test(
        draft.performedAt
      ) && draft.performedAt <= today
        ? null
        : MAINTENANCE_JOB_COPY.ERROR_DATE,
    description:
      draft.description.length >
        MAINTENANCE_JOB_LIMITS.DESCRIPTION_MAX_LENGTH ||
      (draft.workType === MAINTENANCE_JOB_WORK_TYPE.OTHER &&
        !isFilled(draft.description))
        ? MAINTENANCE_JOB_COPY.ERROR_DESCRIPTION
        : null,
    interval:
      isOilChange && oilInterval === null
        ? MAINTENANCE_JOB_COPY.ERROR_INTERVAL_INVALID
        : null,
    unit: unit ? null : MAINTENANCE_JOB_COPY.ERROR_UNIT,
    workType: WORK_TYPES.includes(draft.workType)
      ? null
      : MAINTENANCE_JOB_COPY.ERROR_WORK_TYPE,
  };
  const hasErrors = Object.values(errors).some(
    (error) => error !== null
  );

  return {
    errors,
    input: hasErrors
      ? null
      : {
          costAmount: hasCost ? costAmount : null,
          costCurrency: hasCost
            ? (draft.costCurrency as MaintenanceJobCurrency)
            : null,
          description: draft.description.trim(),
          isExternal: draft.isExternal,
          oilInterval: isOilChange ? oilInterval : null,
          performedAt: draft.performedAt,
          unitId: draft.unitId,
          workType:
            draft.workType as MaintenanceJobWorkType,
        },
  };
};
