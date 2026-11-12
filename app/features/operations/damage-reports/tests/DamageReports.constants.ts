import type { DamageReportEntry } from "../models/DamageReportEntry.interface";
import type { DamageReportsUnit } from "../models/DamageReportsUnit.interface";

export const UNIT_ID =
  "dddddddd-0000-0000-0000-000000000001";

export const UNIT_ROW = {
  category: { name: "Jet ski" },
  code: "JS-1",
  id: UNIT_ID,
  impact_count: 3,
};

export const UNIT: DamageReportsUnit = {
  categoryName: "Jet ski",
  code: "JS-1",
  id: UNIT_ID,
  impactCount: 3,
};

export const REPORT_ROW = {
  cause: "collision",
  created_at: "2026-11-10T20:30:00+00:00",
  description: "Golpe contra el muelle",
  id: "dddddddd-0000-0000-0000-000000000002",
  impact_delta: 2,
};

export const REPORT_ENTRY: DamageReportEntry = {
  cause: "collision",
  createdAt: "2026-11-10T20:30:00+00:00",
  description: "Golpe contra el muelle",
  id: "dddddddd-0000-0000-0000-000000000002",
  impactDelta: 2,
};

export const REPORT_DETAIL_TEXT =
  "10 de noviembre de 2026 · Golpes sumados: 2";

export const PAGE_CASES: {
  expected: number;
  param: string | string[] | undefined;
}[] = [
  { expected: 1, param: undefined },
  { expected: 1, param: "0" },
  { expected: 1, param: "abc" },
  { expected: 1, param: ["2"] },
  { expected: 1, param: "100001" },
  { expected: 4, param: "4" },
];
