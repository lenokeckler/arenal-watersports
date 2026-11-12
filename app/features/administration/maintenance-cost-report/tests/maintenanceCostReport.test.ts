import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  COST_CATEGORY_NAMES,
  COST_CATEGORY_ROWS,
  COST_ROWS,
  COST_SERVICE_ROWS,
} from "./MaintenanceCostReport.constants";
import { formatCostTotal } from "../utils/formatCostTotal";
import { formatLastJobDate } from "../utils/formatLastJobDate";
import { groupCostsByUnit } from "../utils/groupCostsByUnit";

const { createClientMock, isAdministratorMock } =
  vi.hoisted(() => ({
    createClientMock: vi.fn(),
    isAdministratorMock: vi.fn(),
  }));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: createClientMock,
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: isAdministratorMock,
}));

const {
  getMaintenanceCostByUnit,
  MaintenanceCostAccessError,
} = await import("../services/getMaintenanceCostByUnit");

const queueTables = (
  costs: unknown,
  categories: unknown = COST_CATEGORY_ROWS
) => {
  const costsLimit = vi
    .fn()
    .mockResolvedValue({ data: costs, error: null });
  const from = vi.fn((table: string) =>
    table === "maintenance_cost_by_unit"
      ? { select: () => ({ limit: costsLimit }) }
      : {
          select: () =>
            Promise.resolve({
              data: categories,
              error: null,
            }),
        }
  );
  createClientMock.mockResolvedValue({ from });

  return { from };
};

describe("groupCostsByUnit", () => {
  it("gathers the totals of each unit apart by currency", () => {
    const grouped = groupCostsByUnit(
      COST_ROWS,
      COST_CATEGORY_NAMES
    );
    const jetSki = grouped.find(
      (unit) => unit.unitCode === "JS-2"
    );

    expect(jetSki?.totals).toEqual([
      { currency: "CRC", total: 35000 },
      { currency: "USD", total: 120 },
    ]);
    expect(jetSki?.jobsCount).toBe(3);
    expect(jetSki?.lastPerformedAt).toBe("2026-09-06");
    expect(jetSki?.categoryName).toBe("Jet ski");
  });

  it("orders the units by code", () => {
    expect(
      groupCostsByUnit(COST_ROWS, COST_CATEGORY_NAMES).map(
        (unit) => unit.unitCode
      )
    ).toEqual(["CU-1", "JS-2"]);
  });

  it("answers nothing when no job had a cost", () => {
    expect(
      groupCostsByUnit([], COST_CATEGORY_NAMES)
    ).toEqual([]);
  });
});

describe("formatCostTotal and formatLastJobDate", () => {
  it("writes every currency total with its symbol", () => {
    const [unit] = groupCostsByUnit(
      COST_ROWS.slice(0, 2),
      COST_CATEGORY_NAMES
    );

    expect(formatCostTotal(unit)).toBe(
      "Total: ₡35,000 · Total: $120"
    );
  });

  it("writes the date of the last job day first", () => {
    expect(formatLastJobDate("2026-09-06")).toBe(
      "06/09/2026"
    );
  });
});

describe("getMaintenanceCostByUnit", () => {
  beforeEach(() => {
    createClientMock.mockReset();
    isAdministratorMock.mockReset();
    isAdministratorMock.mockResolvedValue(true);
  });

  it("builds the cost of each machine from the maintenance records", async () => {
    queueTables(COST_SERVICE_ROWS);

    const units = await getMaintenanceCostByUnit();

    expect(units.map((unit) => unit.unitCode)).toEqual([
      "CU-1",
      "JS-2",
    ]);
    expect(units[0].totals).toEqual([
      { currency: "CRC", total: 8000.5 },
    ]);
  });

  it("answers an empty list when no job had a cost", async () => {
    queueTables(null);

    await expect(
      getMaintenanceCostByUnit()
    ).resolves.toEqual([]);
  });

  it("refuses whoever is not an administrator before reading anything", async () => {
    isAdministratorMock.mockResolvedValue(false);

    await expect(
      getMaintenanceCostByUnit()
    ).rejects.toBeInstanceOf(MaintenanceCostAccessError);
    expect(createClientMock).not.toHaveBeenCalled();
  });
});
