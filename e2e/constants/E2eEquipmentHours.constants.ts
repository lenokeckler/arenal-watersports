import { PATHS } from "@/app/constants";
import { EQUIPMENT_HOURS_COPY } from "@/app/features/administration/equipment-hours-report/constants/EquipmentHoursReportCopy.constants";

export const E2E_EQUIPMENT_HOURS = {
  CUSTOMER: "Cliente de las horas E2E",
  HEADING: EQUIPMENT_HOURS_COPY.HEADING,
  HOURS: 3,
  PATH: PATHS.ADMINISTRATION.EQUIPMENT_HOURS,
  ROW_VALUE: EQUIPMENT_HOURS_COPY.ROW_VALUE("3", 1),
  UNIT_CODE: "JET-01",
} as const;

export const E2E_EQUIPMENT_HOURS_SCREENSHOT_BASENAME = {
  REPORT: "18-equipment-hours-report",
} as const;
