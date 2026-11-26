import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { COMBO_STATUS } from "../constants/ComboStatus.constants";
import { listComboCategoryOptions } from "../services/listComboCategoryOptions";
import { buildPostgrestError } from "./buildPostgrestError";
import {
  CATEGORIES_TABLE,
  FAKE_CATEGORY_ID,
  NAME_COLUMN,
  STATUS_COLUMN,
} from "./ComboForm.constants";
import { FAKE_CATEGORY_NAME } from "./Combo.constants";

const mockOrder = vi.fn();
const mockEq = vi.fn(() => ({ order: mockOrder }));
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

describe("listComboCategoryOptions", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockEq.mockClear();
    mockOrder.mockReset();
  });

  it("lists the active categories ordered by name", async () => {
    const options = [
      { id: FAKE_CATEGORY_ID, name: FAKE_CATEGORY_NAME },
    ];
    mockOrder.mockResolvedValue({
      data: options,
      error: null,
    });

    expect(await listComboCategoryOptions()).toEqual(
      options
    );
    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
    expect(mockEq).toHaveBeenCalledWith(
      STATUS_COLUMN,
      COMBO_STATUS.ACTIVE
    );
    expect(mockOrder).toHaveBeenCalledWith(NAME_COLUMN, {
      ascending: true,
    });
  });

  it("returns an empty list when there are no categories", async () => {
    mockOrder.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(await listComboCategoryOptions()).toEqual([]);
  });

  it("throws when the query fails", async () => {
    mockOrder.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.RAISE_EXCEPTION
      ),
    });

    await expect(
      listComboCategoryOptions()
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
