import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";
import type { MaintenanceData } from "../models/MaintenanceData.interface";
import { MAINTENANCE_OVERVIEW_FIXTURE } from "./Maintenance.constants";

export const CALENDAR_UNIT_ID =
  "bbbbbbbb-0000-0000-0000-000000000001";

export const OTHER_UNIT_ID =
  "bbbbbbbb-0000-0000-0000-000000000002";

export const MAINTENANCE_JOBS: EquipmentJob[] = [
  {
    costAmount: 145000,
    currency: "CRC",
    date: "2026-11-22",
    description: "Turbina nueva",
    id: "job-1",
    isExternal: true,
    isRetired: false,
    unitCode: "JS-1",
    unitId: CALENDAR_UNIT_ID,
    workType: "part_change",
  },
  {
    costAmount: 62,
    currency: "USD",
    date: "2026-10-09",
    description: null,
    id: "job-2",
    isExternal: false,
    isRetired: false,
    unitCode: "CU-1",
    unitId: OTHER_UNIT_ID,
    workType: "oil_change",
  },
];

export const MAINTENANCE_REPORTS: EquipmentReport[] = [
  {
    cause: null,
    createdAt: "2026-11-25T15:00:00Z",
    date: "2026-11-25",
    description: null,
    hasPhotos: true,
    hits: 1,
    id: "report-1",
    isPending: true,
    isRetired: false,
    reservationId: null,
    unitCode: "CU-1",
    unitId: OTHER_UNIT_ID,
  },
];

export const MAINTENANCE_DATA: MaintenanceData = {
  calendar: {
    jobs: MAINTENANCE_JOBS,
    reports: MAINTENANCE_REPORTS,
  },
  calendarMonths: [
    "2026-06",
    "2026-07",
    "2026-08",
    "2026-09",
    "2026-10",
    "2026-11",
  ],
  jobs: MAINTENANCE_JOBS,
  month: "2026-11",
  machines: [
    { code: "JS-1", id: CALENDAR_UNIT_ID },
    { code: "CU-1", id: OTHER_UNIT_ID },
  ],
  months: [
    "2026-06",
    "2026-07",
    "2026-08",
    "2026-09",
    "2026-10",
    "2026-11",
  ],
  overview: MAINTENANCE_OVERVIEW_FIXTURE,
  today: "2026-11-25",
};
