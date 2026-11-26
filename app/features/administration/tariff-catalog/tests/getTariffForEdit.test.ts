import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { TARIFF_CATEGORY_STATUS } from "../constants/TariffCategoryStatus.constants";
import { getTariffForEdit } from "../services/getTariffForEdit";
import { buildPostgrestError } from "./buildPostgrestError";
import {
  buildTariffRow,
  CATEGORIES_TABLE,
  DEFAULT_CATALOG_ROW,
  FAKE_CATEGORY_ID,
  ID_COLUMN,
  STATUS_COLUMN,
} from "./TariffCatalog.constants";

const mockMaybeSingle = vi.fn();
const mockSecondEq = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockFirstEq = vi.fn(
  (_column: string, _value: string) => ({
    eq: mockSecondEq,
  })
);
const mockSelect = vi.fn((_columns: string) => ({
  eq: mockFirstEq,
}));
const mockFrom = vi.fn((_table: string) => ({
  select: mockSelect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: (table: string) => mockFrom(table),
  }),
}));

describe("getTariffForEdit", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockFirstEq.mockClear();
    mockSecondEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("reads the active category with its tariffs in one query", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: buildTariffRow(),
      error: null,
    });

    const forEdit = await getTariffForEdit(
      FAKE_CATEGORY_ID
    );

    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
    expect(mockFirstEq).toHaveBeenCalledWith(
      ID_COLUMN,
      FAKE_CATEGORY_ID
    );
    expect(mockSecondEq).toHaveBeenCalledWith(
      STATUS_COLUMN,
      TARIFF_CATEGORY_STATUS.ACTIVE
    );
    expect(forEdit).toEqual(DEFAULT_CATALOG_ROW);
  });

  it("returns null when no active category matches", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await getTariffForEdit(FAKE_CATEGORY_ID)
    ).toBeNull();
  });

  it("returns null for an invalid identifier", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
      ),
    });

    expect(
      await getTariffForEdit(FAKE_CATEGORY_ID)
    ).toBeNull();
  });

  it("throws when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.RAISE_EXCEPTION
      ),
    });

    await expect(
      getTariffForEdit(FAKE_CATEGORY_ID)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
