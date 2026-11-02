import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";
import { listCategories } from "../services/listCategories";
import { DEFAULT_EQUIPMENT_CATEGORY_ROW } from "./EquipmentCategoryRow.constants";

const PAGE_SIZE = CATEGORY_LIST_PAGINATION.PAGE_SIZE;
const FAKE_QUANTITY = 24;

const mockFetchCategories = vi.fn();
const mockFetchCategoryCount = vi.fn();
const mockFetchCategoryIdsWithRecords = vi.fn();
const mockFetchCategoryQuantities = vi.fn();

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({}),
}));

vi.mock("../services/fetchCategories", () => ({
  fetchCategories: (...args: unknown[]): unknown =>
    mockFetchCategories(...args),
}));

vi.mock("../services/fetchCategoryCount", () => ({
  fetchCategoryCount: (...args: unknown[]): unknown =>
    mockFetchCategoryCount(...args),
}));

vi.mock("../services/fetchCategoryIdsWithRecords", () => ({
  fetchCategoryIdsWithRecords: (
    ...args: unknown[]
  ): unknown => mockFetchCategoryIdsWithRecords(...args),
}));

vi.mock("../services/fetchCategoryQuantities", () => ({
  fetchCategoryQuantities: (...args: unknown[]): unknown =>
    mockFetchCategoryQuantities(...args),
}));

describe("listCategories", () => {
  beforeEach(() => {
    mockFetchCategories.mockReset();
    mockFetchCategoryCount.mockReset();
    mockFetchCategoryIdsWithRecords.mockReset();
    mockFetchCategoryQuantities.mockReset();
    mockFetchCategoryIdsWithRecords.mockResolvedValue(
      new Set()
    );
    mockFetchCategoryQuantities.mockResolvedValue(
      new Map()
    );
  });

  it("asks for the row range of the requested page with the page size of the list", async () => {
    mockFetchCategoryCount.mockResolvedValue(PAGE_SIZE * 2);
    mockFetchCategories.mockResolvedValue([]);

    await listCategories(2);

    expect(mockFetchCategories).toHaveBeenCalledWith(
      expect.anything(),
      {
        from: PAGE_SIZE,
        to: PAGE_SIZE * 2 - 1,
      }
    );
  });

  it("looks up records and quantities only for the categories of the page", async () => {
    mockFetchCategoryCount.mockResolvedValue(PAGE_SIZE + 1);
    mockFetchCategories.mockResolvedValue([
      DEFAULT_EQUIPMENT_CATEGORY_ROW,
    ]);
    mockFetchCategoryIdsWithRecords.mockResolvedValue(
      new Set([DEFAULT_EQUIPMENT_CATEGORY_ROW.id])
    );
    mockFetchCategoryQuantities.mockResolvedValue(
      new Map([
        [DEFAULT_EQUIPMENT_CATEGORY_ROW.id, FAKE_QUANTITY],
      ])
    );

    const result = await listCategories(1);

    expect(
      mockFetchCategoryIdsWithRecords
    ).toHaveBeenCalledWith(expect.anything(), [
      DEFAULT_EQUIPMENT_CATEGORY_ROW.id,
    ]);
    expect(
      mockFetchCategoryQuantities
    ).toHaveBeenCalledWith(expect.anything(), [
      DEFAULT_EQUIPMENT_CATEGORY_ROW.id,
    ]);
    expect(result.categories[0].hasRecords).toBe(true);
    expect(result.categories[0].currentQuantity).toBe(
      FAKE_QUANTITY
    );
    expect(result.pageCount).toBe(2);
    expect(result.totalCount).toBe(PAGE_SIZE + 1);
  });

  it("returns no categories and reads no rows when the page is past the last one", async () => {
    mockFetchCategoryCount.mockResolvedValue(PAGE_SIZE);

    const result = await listCategories(9);

    expect(result).toEqual({
      categories: [],
      pageCount: 1,
      totalCount: PAGE_SIZE,
    });
    expect(mockFetchCategories).not.toHaveBeenCalled();
  });
});
