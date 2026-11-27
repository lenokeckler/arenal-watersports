import {
  DAMAGE_CAUSE_ORDER,
  DAMAGE_REPORT_LIMITS,
  TYPE_OF,
  UUID_PATTERN,
} from "@/app/constants";
import { isString } from "@/app/utils/type-guards/isString";
import { DAMAGE_REPORT_STATE } from "../constants/DamageReport.constants";
import type { DamageReportInput } from "../models/DamageReportInput.interface";

const isId = (value: unknown): boolean =>
  isString(value) && UUID_PATTERN.test(value);

const isOptionalId = (value: unknown): boolean =>
  value === null || isId(value);

const isOptionalChoice = (
  value: unknown,
  choices: readonly string[]
): boolean =>
  value === null ||
  (isString(value) && choices.includes(value));

const isDescription = (value: unknown): boolean =>
  isString(value) &&
  value.length <= DAMAGE_REPORT_LIMITS.DESCRIPTION_MAX;

const isHitCount = (value: unknown): boolean =>
  Number.isInteger(value) &&
  (value as number) >= DAMAGE_REPORT_LIMITS.HITS_MIN &&
  (value as number) <= DAMAGE_REPORT_LIMITS.HITS_MAX;

export const isDamageReportInput = (
  input: unknown
): input is DamageReportInput => {
  if (typeof input !== TYPE_OF.OBJECT || input === null) {
    return false;
  }

  const candidate = input as Record<
    keyof DamageReportInput,
    unknown
  >;

  return (
    isId(candidate.unitId) &&
    isOptionalId(candidate.reportId) &&
    isOptionalId(candidate.reservationId) &&
    typeof candidate.detailLater === TYPE_OF.BOOLEAN &&
    isDescription(candidate.description) &&
    isHitCount(candidate.hits) &&
    isOptionalChoice(candidate.cause, DAMAGE_CAUSE_ORDER) &&
    isOptionalChoice(candidate.unitStatus, [
      DAMAGE_REPORT_STATE.DAMAGED,
      DAMAGE_REPORT_STATE.MAINTENANCE,
    ])
  );
};
