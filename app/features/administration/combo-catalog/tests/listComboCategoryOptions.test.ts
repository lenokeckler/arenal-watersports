import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { COMBO_CATEGORY_OPTIONS_FILTER } from "../constants/ComboCategoryOptionsFilter.constants";
import { listComboCategoryOptions } from "../services/listComboCategoryOptions";
import { buildComboCategoryOptionsFilter } from "../utils/buildComboCategoryOptionsFilter";
import { buildPostgrestError } from "./buildPostgrestError";
import {
  CATEGORIES_TABLE,
  FAKE_CATEGORY_ID,
  NAME_COLUMN,
  SECOND_CATEGORY_ID,
} from "./ComboForm.constants";
import { FAKE_CATEGORY_NAME } from "./Combo.constants";

const mockOrder = vi.fn();
const mockOr = vi.fn((_filter: string) => ({
  order: mockOrder,
}));
const mockSelect = vi.fn((_columns: string) => ({
  or: mockOr,
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
    mockOr.mockClear();
    mockOrder.mockReset();
  });

  it("lists the active reservable categories ordered by name", async () => {
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
    expect(mockOr).toHaveBeenCalledWith(
      COMBO_CATEGORY_OPTIONS_FILTER.RESERVABLE_ACTIVE
    );
    expect(mockOrder).toHaveBeenCalledWith(NAME_COLUMN, {
      ascending: true,
    });
  });

  it("also lists the categories the edited combo already holds", async () => {
    mockOrder.mockResolvedValue({ data: [], error: null });

    await listComboCategoryOptions([
      FAKE_CATEGORY_ID,
      SECOND_CATEGORY_ID,
    ]);

    expect(mockOr).toHaveBeenCalledWith(
      buildComboCategoryOptionsFilter([
        FAKE_CATEGORY_ID,
        SECOND_CATEGORY_ID,
      ])
    );
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
