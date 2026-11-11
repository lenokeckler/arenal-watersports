import type { NullableRef } from "@/app/types";
import {
  MAINTENANCE_JOB_LIMITS,
  MAINTENANCE_JOB_PATTERN,
} from "../constants/MaintenanceJob.constants";

export const parseMaintenanceAmount = (
  text: string
): NullableRef<number> => {
  const trimmed = text.trim();

  if (!MAINTENANCE_JOB_PATTERN.AMOUNT.test(trimmed)) {
    return null;
  }

  const amount = Number(trimmed.replace(",", "."));

  return amount > 0 &&
    amount <= MAINTENANCE_JOB_LIMITS.MAX_AMOUNT
    ? amount
    : null;
};
