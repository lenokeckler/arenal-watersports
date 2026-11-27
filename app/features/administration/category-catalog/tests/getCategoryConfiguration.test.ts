import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getCategoryConfiguration } from "../services/getCategoryConfiguration";
import { mapCategoryRowToConfiguration } from "../utils/mapCategoryRowToConfiguration";
import { FAKE_CONFIGURATION_QUANTITY } from "./CategoryConfiguration.constants";
import {
  DEFAULT_EQUIPMENT_CATEGORY_ROW,
  FAKE_CATEGORY_ID,
} from "./EquipmentCategoryRow.constants";

const mockFetchCategoryQuantities = vi.fn();
const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockSelect = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn((_table: string) => ({
  select: mockSelect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: (table: string) => mockFrom(table),
  }),
}));

vi.mock("../services/fetchCategoryQuantities", () => ({
  fetchCategoryQuantities: (...args: unknown[]): unknown =>
    mockFetchCategoryQuantities(...args),
}));

describe("getCategoryConfiguration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMaybeSingle.mockReset();
    mockFetchCategoryQuantities.mockResolvedValue(
      new Map([
        [FAKE_CATEGORY_ID, FAKE_CONFIGURATION_QUANTITY],
      ])
    );
  });

  it("returns the category row and its current quantity mapped together", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_EQUIPMENT_CATEGORY_ROW,
      error: null,
    });

    const configuration = await getCategoryConfiguration(
      FAKE_CATEGORY_ID
    );

    expect(mockEq).toHaveBeenCalledWith(
      "id",
      FAKE_CATEGORY_ID
    );
    expect(configuration).toEqual(
      mapCategoryRowToConfiguration(
        DEFAULT_EQUIPMENT_CATEGORY_ROW,
        FAKE_CONFIGURATION_QUANTITY
      )
    );
  });

  it("returns null without reading the quantity when no category matches", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await getCategoryConfiguration(FAKE_CATEGORY_ID)
    ).toBeNull();
    expect(
      mockFetchCategoryQuantities
    ).not.toHaveBeenCalled();
  });

  it("returns null when the id is not a valid uuid", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: "invalid input syntax for type uuid",
      },
    });

    expect(
      await getCategoryConfiguration(FAKE_CATEGORY_ID)
    ).toBeNull();
  });

  it("throws instead of returning null when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      getCategoryConfiguration(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
