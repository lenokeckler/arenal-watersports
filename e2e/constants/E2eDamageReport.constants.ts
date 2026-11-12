import { DAMAGE_REPORT_CAUSES } from "@/app/features/operations/damage-report/constants/DamageReportCause.constants";

export const E2E_DAMAGE_REPORT_CAUSES =
  DAMAGE_REPORT_CAUSES;

export const E2E_DAMAGE_REPORT_FORM_INPUT = {
  DESCRIPTION:
    "Impact to the machine noted during inspection.",
  IMPACT_DELTA: "3",
} as const;

export const E2E_DAMAGE_REPORT_SCREENSHOT_BASENAME = {
  EMPTY_FORM: "01-damage-report-empty-form",
  CAUSE_REQUIRED: "02-damage-report-cause-required",
} as const;
