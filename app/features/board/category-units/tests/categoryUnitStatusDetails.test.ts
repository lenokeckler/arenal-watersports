import { describe, expect, it } from "vitest";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { CATEGORY_UNIT_ROW_KIND } from "../constants/CategoryUnits.constants";
import { attachUnitStatusDetails } from "../utils/attachUnitStatusDetails";
import { buildUnitStatusDetails } from "../utils/buildUnitStatusDetails";
import { hasStatusSheet } from "../utils/hasStatusSheet";
import { resolveCategoryUnitRowKind } from "../utils/resolveCategoryUnitRowKind";
import { DEFAULT_CATEGORY_UNIT } from "./CategoryUnits.constants";
import { DAMAGE_ROW } from "./CategoryUnitDamageRow.constants";

const JOB_ROW = {
  cost_amount: 12000,
  cost_currency: "CRC" as const,
  description: "Pastillas",
  is_external: false,
  performed_at: "2026-11-18",
  unit_id: "unit-1",
  work_type: "part_change",
};

const INTERACTION = {
  isEditing: false,
  onOpenInfo: () => undefined,
  onOpenModify: () => undefined,
  onOpenStatus: () => undefined,
};

describe("hasStatusSheet", () => {
  it.each([
    [INVENTORY_UNIT_STATUS.IN_MAINTENANCE, true],
    [INVENTORY_UNIT_STATUS.IN_REPAIR, true],
    [INVENTORY_UNIT_STATUS.DAMAGED, true],
    [INVENTORY_UNIT_STATUS.AVAILABLE, false],
    [INVENTORY_UNIT_STATUS.OCCUPIED, false],
  ])("answers for %s", (status, expected) => {
    expect(hasStatusSheet(status)).toBe(expected);
  });
});

describe("buildUnitStatusDetails", () => {
  it("keeps the jobs and the latest damage of the unit only", () => {
    const details = buildUnitStatusDetails(
      "unit-1",
      [JOB_ROW, { ...JOB_ROW, unit_id: "unit-2" }],
      [DAMAGE_ROW, { ...DAMAGE_ROW, unit_id: "unit-2" }]
    );

    expect(details.jobs).toHaveLength(1);
    expect(details.jobs[0].cost).toMatch(/^₡\s12\s000$/);
    expect(details.damage?.cause).toBe("rollover");
    expect(details.pendingReportId).toBeNull();
  });

  it("keeps the five most recent jobs", () => {
    const rows = Array.from({ length: 8 }, () => JOB_ROW);

    expect(
      buildUnitStatusDetails("unit-1", rows, []).jobs
    ).toHaveLength(5);
  });

  it("has no damage and no cost when none was recorded", () => {
    const details = buildUnitStatusDetails(
      "unit-1",
      [
        {
          ...JOB_ROW,
          cost_amount: null,
          cost_currency: null,
        },
      ],
      []
    );

    expect(details.damage).toBeNull();
    expect(details.jobs[0].cost).toBeNull();
  });
});

describe("attachUnitStatusDetails", () => {
  it("fills the details of units with a status sheet only", () => {
    const [maintenance, available] =
      attachUnitStatusDetails(
        [
          {
            ...DEFAULT_CATEGORY_UNIT,
            id: "unit-1",
            status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
          },
          { ...DEFAULT_CATEGORY_UNIT, id: "unit-3" },
        ],
        { damages: [], jobs: [JOB_ROW] }
      );

    expect(maintenance.statusDetails?.jobs).toHaveLength(1);
    expect(available.statusDetails).toBeNull();
  });
});

describe("resolveCategoryUnitRowKind for gray units", () => {
  it("opens the status sheet of a unit in maintenance outside edit mode", () => {
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: true,
        interaction: INTERACTION,
        unit: {
          ...DEFAULT_CATEGORY_UNIT,
          status: INVENTORY_UNIT_STATUS.IN_REPAIR,
        },
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.STATUS);
  });

  it("keeps the edit panel for the same unit in edit mode", () => {
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: true,
        interaction: { ...INTERACTION, isEditing: true },
        unit: {
          ...DEFAULT_CATEGORY_UNIT,
          status: INVENTORY_UNIT_STATUS.DAMAGED,
        },
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.MODIFY);
  });

  it("stays plain for a read-only viewer", () => {
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: false,
        interaction: undefined,
        unit: {
          ...DEFAULT_CATEGORY_UNIT,
          status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
        },
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.PLAIN);
  });
});
