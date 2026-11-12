import { DAMAGE_REPORTS_DATE_FORMAT } from "../constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageReportEntry } from "../models/DamageReportEntry.interface";

export const getReportDetailText = (
  entry: DamageReportEntry
): string =>
  [
    new Intl.DateTimeFormat(
      DAMAGE_REPORTS_DATE_FORMAT.LOCALE,
      DAMAGE_REPORTS_DATE_FORMAT.OPTIONS
    ).format(new Date(entry.createdAt)),
    `${DAMAGE_REPORTS_COPY.IMPACTS_ADDED_PREFIX}${entry.impactDelta}`,
  ].join(DAMAGE_REPORTS_COPY.PART_SEPARATOR);
