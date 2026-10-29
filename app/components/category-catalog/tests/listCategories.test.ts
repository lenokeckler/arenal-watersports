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

const mockFetchCategories = vi.fn();
const mockFetchCategoryCount = vi.fn();
const mockFetchCategoryIdsWithRecords = vi.fn();

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

describe("listCategories", () => {
  beforeEach(() => {
    mockFetchCategories.mockReset();
    mockFetchCategoryCount.mockReset();
    mockFetchCategoryIdsWithRecords.mockReset();
  });

  it("asks for the row range of the requested page", async () => {
    mockFetchCategoryCount.mockResolvedValue(
      CATEGORY_LIST_PAGINATION.PAGE_SIZE * 2
    );
    mockFetchCategories.mockResolvedValue([]);
    mockFetchCategoryIdsWithRecords.mockResolvedValue(
      new Set()
    );

    await listCategories(2);

    expect(mockFetchCategories).toHaveBeenCalledWith(
      expect.anything(),
      {
        from: CATEGORY_LIST_PAGINATION.PAGE_SIZE,
        to: CATEGORY_LIST_PAGINATION.PAGE_SIZE * 2 - 1,
      }
    );
  });

  it("looks up records only for the categories of the page and flags them", async () => {
    mockFetchCategoryCount.mockResolvedValue(
      CATEGORY_LIST_PAGINATION.PAGE_SIZE + 1
    );
    mockFetchCategories.mockResolvedValue([
      DEFAULT_EQUIPMENT_CATEGORY_ROW,
    ]);
    mockFetchCategoryIdsWithRecords.mockResolvedValue(
      new Set([DEFAULT_EQUIPMENT_CATEGORY_ROW.id])
    );

    const result = await listCategories(1);

    expect(
      mockFetchCategoryIdsWithRecords
    ).toHaveBeenCalledWith(expect.anything(), [
      DEFAULT_EQUIPMENT_CATEGORY_ROW.id,
    ]);
    expect(result.categories[0].hasRecords).toBe(true);
    expect(result.pageCount).toBe(2);
  });

  it("returns no categories and reads no rows when the page is past the last one", async () => {
    mockFetchCategoryCount.mockResolvedValue(
      CATEGORY_LIST_PAGINATION.PAGE_SIZE
    );

    const result = await listCategories(9);

    expect(result).toEqual({
      categories: [],
      pageCount: 1,
    });
    expect(mockFetchCategories).not.toHaveBeenCalled();
  });
});
