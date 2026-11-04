import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import { getStockCategory } from "../services/getStockCategory";
import { getStockLevels } from "../services/getStockLevels";
import {
  DEFAULT_STOCK_CATEGORY,
  DEFAULT_STOCK_CATEGORY_ROW,
  DEFAULT_STOCK_LEVELS,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";

const CATEGORIES_TABLE = "equipment_categories";
const STOCK_TABLE = "equipment_stock";
const CATEGORY_ID_COLUMN = "category_id";

const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockSelect = vi.fn((_columns: string) => ({
  eq: mockEq,
}));
const mockFrom = vi.fn((_table: string) => ({
  select: mockSelect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: (table: string) => mockFrom(table),
  }),
}));

describe("getStockCategory", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("returns the category with its expiry alert flag", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_STOCK_CATEGORY_ROW,
      error: null,
    });

    expect(
      await getStockCategory(FAKE_STOCK_CATEGORY_ID)
    ).toEqual(DEFAULT_STOCK_CATEGORY);
    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
  });

  it.each([
    ["no category matches", null],
    [
      "the id is not a valid uuid",
      {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: "invalid input syntax for type uuid",
      },
    ],
  ])("returns null when %s", async (_name, error) => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error,
    });

    expect(
      await getStockCategory(FAKE_STOCK_CATEGORY_ID)
    ).toBeNull();
  });

  it("throws when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      getStockCategory(FAKE_STOCK_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});

describe("getStockLevels", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("returns the recorded levels of the category", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: {
        expiry_date: null,
        quantity_available: 10,
        quantity_damaged: 2,
        quantity_in_repair: 1,
      },
      error: null,
    });

    expect(
      await getStockLevels(FAKE_STOCK_CATEGORY_ID)
    ).toEqual(DEFAULT_STOCK_LEVELS);
    expect(mockFrom).toHaveBeenCalledWith(STOCK_TABLE);
    expect(mockEq).toHaveBeenCalledWith(
      CATEGORY_ID_COLUMN,
      FAKE_STOCK_CATEGORY_ID
    );
  });

  it("returns zero levels when the category was never counted", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await getStockLevels(FAKE_STOCK_CATEGORY_ID)
    ).toEqual(STOCK_EMPTY_LEVELS);
  });

  it("throws when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      getStockLevels(FAKE_STOCK_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
