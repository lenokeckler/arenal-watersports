import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getUnitCategory } from "../services/getUnitCategory";
import { FAKE_CATEGORY_ID } from "./Unit.constants";
import {
  DEFAULT_UNIT_CATEGORY,
  DEFAULT_UNIT_CATEGORY_ROW,
} from "./UnitList.constants";

const CATEGORIES_TABLE = "equipment_categories";
const ID_COLUMN = "id";

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

describe("getUnitCategory", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("returns the category with the fields the list needs", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_UNIT_CATEGORY_ROW,
      error: null,
    });

    expect(await getUnitCategory(FAKE_CATEGORY_ID)).toEqual(
      DEFAULT_UNIT_CATEGORY
    );
    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
    expect(mockEq).toHaveBeenCalledWith(
      ID_COLUMN,
      FAKE_CATEGORY_ID
    );
  });

  it.each([
    ["no category matches the id", null],
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
      await getUnitCategory(FAKE_CATEGORY_ID)
    ).toBeNull();
  });

  it("throws instead of returning null when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      getUnitCategory(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
