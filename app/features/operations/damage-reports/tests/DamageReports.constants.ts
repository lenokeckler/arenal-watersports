import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";
import type { DamageFilters } from "../models/DamageFilters.interface";
import type { DamageOverview } from "../models/DamageOverview.interface";

export const DAMAGE_TODAY = "2026-11-25";

export const DAMAGE_DAY = "2026-11-20";

export const DAMAGE_MONTH = "2026-11";

export const DAMAGE_FILTERS: DamageFilters = {
  cause: null,
  day: DAMAGE_DAY,
  isDayOpen: false,
  month: DAMAGE_MONTH,
  period: "month",
  showPending: false,
  tab: "calendar",
};

const buildReport = (
  id: string,
  overrides: Partial<EquipmentReport> = {}
): EquipmentReport => ({
  cause: "collision",
  createdAt: "2026-11-20T15:00:00Z",
  date: DAMAGE_DAY,
  description: `Detalle ${id}`,
  hasPhotos: true,
  hits: 1,
  id,
  isPending: false,
  isRetired: false,
  reservationId: null,
  unitCode: "JET-01",
  unitId: "unit-1",
  ...overrides,
});

export const PENDING_REPORT = buildReport("pending", {
  cause: null,
  description: null,
  isPending: true,
  unitCode: "JET-04",
  unitId: "unit-4",
});

export const SECOND_PENDING_REPORT = buildReport(
  "second-pending",
  {
    cause: null,
    description: null,
    isPending: true,
    unitCode: "JET-03",
    unitId: "unit-3",
  }
);

export const RETIRED_PENDING_REPORT = buildReport(
  "retired",
  {
    cause: null,
    description: null,
    isPending: true,
    isRetired: true,
    unitCode: "JET-99",
    unitId: "unit-99",
  }
);

const RECENT_REPORTS: EquipmentReport[] = [
  PENDING_REPORT,
  buildReport("one"),
  buildReport("two", { cause: "rollover" }),
  buildReport("three"),
  buildReport("four", {
    hasPhotos: false,
    unitCode: "KD-02",
    unitId: "unit-2",
  }),
  buildReport("old", {
    cause: "other",
    date: "2026-07-02",
  }),
];

export const DAMAGE_OVERVIEW: DamageOverview = {
  calendarMonths: ["2026-10", DAMAGE_MONTH],
  calendarReports: RECENT_REPORTS,
  month: DAMAGE_MONTH,
  pending: [PENDING_REPORT],
  recent: RECENT_REPORTS,
  today: DAMAGE_TODAY,
};
