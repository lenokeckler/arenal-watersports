import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { UNIT_EFFECTIVE_STATUS } from "../constants/UnitStatus.constants";
import { listUnits } from "../services/listUnits";
import { FAKE_CATEGORY_ID } from "./Unit.constants";
import {
  buildUnitListRow,
  DEFAULT_UNIT_LIST_ROW,
} from "./UnitList.constants";

const mockFetchUnitCount = vi.fn();
const mockFetchUnits = vi.fn();
const mockFetchUnitViewStatuses = vi.fn();

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({}),
}));

vi.mock("../services/fetchUnitCount", () => ({
  fetchUnitCount: (...args: unknown[]): unknown =>
    mockFetchUnitCount(...args),
}));

vi.mock("../services/fetchUnits", () => ({
  fetchUnits: (...args: unknown[]): unknown =>
    mockFetchUnits(...args),
}));

vi.mock("../services/fetchUnitViewStatuses", () => ({
  fetchUnitViewStatuses: (...args: unknown[]): unknown =>
    mockFetchUnitViewStatuses(...args),
}));

describe("listUnits", () => {
  beforeEach(() => {
    mockFetchUnitCount.mockReset();
    mockFetchUnits.mockReset();
    mockFetchUnitViewStatuses.mockReset();
    mockFetchUnits.mockResolvedValue([
      DEFAULT_UNIT_LIST_ROW,
    ]);
    mockFetchUnitViewStatuses.mockResolvedValue(new Map());
  });

  it("counts the units of the category before reading any page", async () => {
    mockFetchUnitCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE
    );

    await listUnits(FAKE_CATEGORY_ID, 1);

    expect(mockFetchUnitCount).toHaveBeenCalledWith(
      expect.anything(),
      FAKE_CATEGORY_ID
    );
    expect(
      mockFetchUnitCount.mock.invocationCallOrder[0]
    ).toBeLessThan(
      mockFetchUnits.mock.invocationCallOrder[0]
    );
  });

  it("asks for the row range of the requested page", async () => {
    mockFetchUnitCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE * 2
    );

    await listUnits(FAKE_CATEGORY_ID, 2);

    expect(mockFetchUnits).toHaveBeenCalledWith(
      expect.anything(),
      FAKE_CATEGORY_ID,
      {
        from: LIST_PAGINATION.PAGE_SIZE,
        to: LIST_PAGINATION.PAGE_SIZE * 2 - 1,
      }
    );
  });

  it("reads no rows and reports the last page when the page is past the end", async () => {
    mockFetchUnitCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE
    );

    const result = await listUnits(FAKE_CATEGORY_ID, 9);

    expect(result).toEqual({ units: [], pageCount: 1 });
    expect(mockFetchUnits).not.toHaveBeenCalled();
    expect(
      mockFetchUnitViewStatuses
    ).not.toHaveBeenCalled();
  });

  it("asks the view for the ids of the page only and marks the occupied unit", async () => {
    const occupiedRow = buildUnitListRow({
      id: "occupied-id",
    });
    mockFetchUnitCount.mockResolvedValue(2);
    mockFetchUnits.mockResolvedValue([
      DEFAULT_UNIT_LIST_ROW,
      occupiedRow,
    ]);
    mockFetchUnitViewStatuses.mockResolvedValue(
      new Map([
        [occupiedRow.id, UNIT_EFFECTIVE_STATUS.OCCUPIED],
      ])
    );

    const { units } = await listUnits(FAKE_CATEGORY_ID, 1);

    expect(mockFetchUnitViewStatuses).toHaveBeenCalledWith(
      expect.anything(),
      [DEFAULT_UNIT_LIST_ROW.id, occupiedRow.id]
    );
    expect(
      units.map((unit) => unit.effectiveStatus)
    ).toEqual([
      DEFAULT_UNIT_LIST_ROW.status,
      UNIT_EFFECTIVE_STATUS.OCCUPIED,
    ]);
  });

  it("rejects when a read fails instead of returning a partial page", async () => {
    mockFetchUnitCount.mockResolvedValue(1);
    mockFetchUnitViewStatuses.mockRejectedValue(
      new Error("view failed")
    );

    await expect(
      listUnits(FAKE_CATEGORY_ID, 1)
    ).rejects.toThrow("view failed");
  });
});
