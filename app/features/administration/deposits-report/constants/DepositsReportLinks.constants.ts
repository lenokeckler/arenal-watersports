import { PATHS } from "@/app/constants";
import { DEPOSITS_REPORT_COPY } from "./DepositsReportCopy.constants";

export const DEPOSITS_REPORT_LINKS = [
  {
    href: PATHS.ADMINISTRATION.RESERVATIONS_BY_WORKER,
    key: "reservations-by-worker",
    text: DEPOSITS_REPORT_COPY.RESERVATIONS_BY_WORKER,
  },
  {
    href: PATHS.ADMINISTRATION.MOVEMENT,
    key: "movement",
    text: DEPOSITS_REPORT_COPY.MOVEMENT,
  },
  {
    href: PATHS.ADMINISTRATION.EQUIPMENT_HOURS,
    key: "equipment-hours",
    text: DEPOSITS_REPORT_COPY.EQUIPMENT_HOURS,
  },
  {
    href: PATHS.ADMINISTRATION.MAINTENANCE_COST,
    key: "maintenance-cost",
    text: DEPOSITS_REPORT_COPY.MAINTENANCE_COST,
  },
] as const;
