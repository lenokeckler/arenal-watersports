import { MOVEMENT_REPORT_FORMAT } from "../constants/MovementReport.constants";

export const formatMovementMonth = (
  month: string
): string =>
  new Intl.DateTimeFormat(
    MOVEMENT_REPORT_FORMAT.locale,
    MOVEMENT_REPORT_FORMAT.monthOptions
  ).format(
    new Date(
      `${month}${MOVEMENT_REPORT_FORMAT.midnightSuffix}`
    )
  );
