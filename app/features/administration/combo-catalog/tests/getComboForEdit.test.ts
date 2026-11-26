import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import { getComboForEdit } from "../services/getComboForEdit";
import { buildPostgrestError } from "./buildPostgrestError";
import {
  FAKE_COMBO_ID,
  FOREIGN_PRICE,
} from "./Combo.constants";
import {
  COMBO_ID_COLUMN,
  COMBOS_TABLE,
  DEFAULT_COMBO_FOR_EDIT,
  FAKE_CATEGORY_ID,
  FAKE_COMBO_NAME,
  FIRST_ITEM_QUANTITY,
} from "./ComboForm.constants";

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

const COMBO_ROW = {
  audience: COMBO_AUDIENCE.FOREIGN,
  combo_items: [
    {
      category_id: FAKE_CATEGORY_ID,
      quantity: FIRST_ITEM_QUANTITY,
    },
  ],
  id: FAKE_COMBO_ID,
  name: FAKE_COMBO_NAME,
  package_price_crc: null,
  package_price_usd: FOREIGN_PRICE,
};

describe("getComboForEdit", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("reads the combo with its items in one query and maps it", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: COMBO_ROW,
      error: null,
    });

    const combo = await getComboForEdit(FAKE_COMBO_ID);

    expect(mockFrom).toHaveBeenCalledWith(COMBOS_TABLE);
    expect(mockEq).toHaveBeenCalledWith(
      COMBO_ID_COLUMN,
      FAKE_COMBO_ID
    );
    expect(combo).toEqual(DEFAULT_COMBO_FOR_EDIT);
  });

  it("returns null when no combo matches", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(await getComboForEdit(FAKE_COMBO_ID)).toBeNull();
  });

  it("returns null when the id is not a valid uuid", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
      ),
    });

    expect(await getComboForEdit(FAKE_COMBO_ID)).toBeNull();
  });

  it("throws when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.RAISE_EXCEPTION
      ),
    });

    await expect(
      getComboForEdit(FAKE_COMBO_ID)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
