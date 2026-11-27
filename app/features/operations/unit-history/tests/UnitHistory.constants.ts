import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { UnitHistoryData } from "../models/UnitHistoryData.interface";

export const HISTORY_UNIT_ID =
  "eeeeeeee-0000-0000-0000-000000000001";

export const PENDING_REPORT_ID =
  "eeeeeeee-0000-0000-0000-000000000009";

const buildJob = (
  id: string,
  overrides: Partial<EquipmentJob>
): EquipmentJob => ({
  costAmount: null,
  currency: null,
  date: "2026-11-02",
  description: null,
  id,
  isExternal: false,
  isRetired: false,
  unitCode: "JET-01",
  unitId: HISTORY_UNIT_ID,
  workType: "other",
  ...overrides,
});

export const HISTORY_DATA: UnitHistoryData = {
  jobs: [
    buildJob("a", {
      costAmount: 145000,
      currency: "CRC",
      date: "2026-11-22",
      description: "Turbina nueva",
      isExternal: true,
    }),
    buildJob("b", { costAmount: 62, currency: "USD" }),
    buildJob("c", { date: "2026-10-30" }),
  ],
  reports: [
    {
      cause: null,
      createdAt: "2026-11-25T15:00:00Z",
      date: "2026-11-25",
      description: null,
      hasPhotos: true,
      hits: 1,
      id: PENDING_REPORT_ID,
      isPending: true,
      isRetired: false,
      reservationId: null,
      unitCode: "JET-01",
      unitId: HISTORY_UNIT_ID,
    },
  ],
  unit: {
    categoryName: "Jet Ski",
    code: "JET-01",
    hasPhotos: true,
    id: HISTORY_UNIT_ID,
    impactCount: 2,
    nextOilChangeAt: 140,
    status: "in_maintenance",
    usageMetric: "engine_hours",
    usageTotal: 133,
  },
};

const PAGED_JOB_COUNT = 23;

export const PAGED_JOBS = Array.from(
  { length: PAGED_JOB_COUNT },
  (_, index) =>
    buildJob(`paged-${index}`, {
      description: `Trabajo ${index + 1}`,
    })
);
