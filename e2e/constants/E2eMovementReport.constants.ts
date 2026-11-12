import { PATHS } from "@/app/constants";
import { MOVEMENT_REPORT_COPY } from "@/app/features/administration/movement-report/constants/MovementReportCopy.constants";

export const E2E_MOVEMENT_REPORT = {
  CUSTOMER: "Cliente del movimiento E2E",
  HEADING: MOVEMENT_REPORT_COPY.HEADING,
  MONTH_TITLE: MOVEMENT_REPORT_COPY.MONTH_DEPARTURES_TITLE,
  PATH: PATHS.ADMINISTRATION.MOVEMENT,
  WEEKDAY_TITLE:
    MOVEMENT_REPORT_COPY.WEEKDAY_DEPARTURES_TITLE,
  WEEKDAY_ROWS: 7,
} as const;

export const E2E_MOVEMENT_REPORT_SCREENSHOT_BASENAME = {
  REPORT: "17-movement-report",
} as const;
