import {
  DAMAGE_REPORT_OUTCOME,
  PATHS,
} from "@/app/constants";

export const buildSavedReportPath = (
  detailLater: boolean
): string =>
  PATHS.OPERATIONS.DAMAGE_REPORTS_SAVED(
    detailLater
      ? DAMAGE_REPORT_OUTCOME.LATER
      : DAMAGE_REPORT_OUTCOME.COMPLETE
  );
