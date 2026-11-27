import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";

const BASE_JOB: EquipmentJob = {
  costAmount: null,
  currency: null,
  date: "2026-11-02",
  description: null,
  id: "job",
  isExternal: false,
  isRetired: false,
  unitCode: "JET-01",
  unitId: "unit",
  workType: "other",
};

export const STATS_JOBS: EquipmentJob[] = [
  {
    ...BASE_JOB,
    costAmount: 10,
    currency: "CRC",
    date: "2026-10-02",
  },
  { ...BASE_JOB, costAmount: 20, currency: "CRC" },
  { ...BASE_JOB, costAmount: 0.1, currency: "USD" },
  { ...BASE_JOB, costAmount: 0.2, currency: "USD" },
  BASE_JOB,
];

const BASE_REPORT: EquipmentReport = {
  cause: "collision",
  createdAt: "2026-11-02T15:00:00Z",
  date: "2026-11-02",
  description: "Golpe",
  hasPhotos: true,
  hits: 1,
  id: "report",
  isPending: false,
  isRetired: false,
  reservationId: null,
  unitCode: "JET-01",
  unitId: "unit",
};

export const STATS_REPORTS: EquipmentReport[] = [
  BASE_REPORT,
  BASE_REPORT,
  { ...BASE_REPORT, cause: "rollover" },
  { ...BASE_REPORT, cause: "other", isPending: true },
  { ...BASE_REPORT, cause: null, isPending: true },
];
