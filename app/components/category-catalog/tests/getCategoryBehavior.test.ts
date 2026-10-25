import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getCategoryBehavior } from "../services/getCategoryBehavior";
import { mapCategoryRowToBehavior } from "../utils/mapCategoryRowToBehavior";
import {
  DEFAULT_EQUIPMENT_CATEGORY_ROW,
  FAKE_CATEGORY_ID,
} from "./EquipmentCategoryRow.constants";

const CATEGORIES_TABLE = "equipment_categories";
const ID_COLUMN = "id";

const mockAssertIsAdminWorker = vi.fn();
const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockSelect = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn((_table: string) => ({
  select: mockSelect,
}));

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (...args: unknown[]): unknown =>
      mockAssertIsAdminWorker(...args),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: (table: string) => mockFrom(table),
  }),
}));

describe("getCategoryBehavior", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockClear();
    mockFrom.mockClear();
    mockSelect.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("queries the categories table filtered by the given id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_EQUIPMENT_CATEGORY_ROW,
      error: null,
    });

    await getCategoryBehavior(FAKE_CATEGORY_ID);

    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
    expect(mockEq).toHaveBeenCalledWith(
      ID_COLUMN,
      FAKE_CATEGORY_ID
    );
  });

  it("returns the category row mapped to its behavior, tracking mode included", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_EQUIPMENT_CATEGORY_ROW,
      error: null,
    });

    const behavior = await getCategoryBehavior(
      FAKE_CATEGORY_ID
    );

    expect(behavior).toEqual(
      mapCategoryRowToBehavior(
        DEFAULT_EQUIPMENT_CATEGORY_ROW
      )
    );
    expect(behavior?.trackingMode).toBe(
      DEFAULT_EQUIPMENT_CATEGORY_ROW.tracking_mode
    );
  });

  it("returns null when no category matches the id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    const behavior = await getCategoryBehavior(
      FAKE_CATEGORY_ID
    );

    expect(behavior).toBeNull();
  });

  it("throws instead of returning null when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      getCategoryBehavior(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });

  it("reads without checking that the caller is an admin", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_EQUIPMENT_CATEGORY_ROW,
      error: null,
    });

    await getCategoryBehavior(FAKE_CATEGORY_ID);

    expect(mockAssertIsAdminWorker).not.toHaveBeenCalled();
  });
});
