import type { Database } from "@/app/types";
import type { CreateDamageReportInput } from "../models/CreateDamageReportInput.interface";
import { DAMAGE_REPORT_CAUSES } from "../constants/DamageReportCause.constants";

const DAMAGE_REPORT_CAUSE_VALUES: Database["public"]["Enums"]["damage_cause"][] =
  DAMAGE_REPORT_CAUSES.map(({ value }) => value);

export const validateDamageReportInput = (
  input: CreateDamageReportInput
): void => {
  if (!input.unitId.trim()) {
    throw new Error("A unit must be selected");
  }

  if (!DAMAGE_REPORT_CAUSE_VALUES.includes(input.cause)) {
    throw new Error("Invalid damage cause");
  }

  if (!input.description.trim()) {
    throw new Error("Description is required");
  }

  if (
    !Number.isInteger(input.impactDelta) ||
    input.impactDelta < 0
  ) {
    throw new Error(
      "Impact increase must be a non-negative integer"
    );
  }
};
