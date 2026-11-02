import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getCategoryDeposit } from "../services/getCategoryDeposit";
import { CATEGORY_DEPOSIT_ID } from "./CategoryDepositFormValues.constants";
import {
  buildCategoryDepositRow,
  DEFAULT_CATEGORY_DEPOSIT_ROW,
} from "./CategoryDepositRow.constants";

const CATEGORIES_TABLE = "equipment_categories";
const ID_COLUMN = "id";
const DEPOSIT_SELECTION = "id, deposit_usd, deposit_crc";

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

describe("getCategoryDeposit", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockSelect.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("selects only the deposit columns of the category with the given id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_CATEGORY_DEPOSIT_ROW,
      error: null,
    });

    await getCategoryDeposit(CATEGORY_DEPOSIT_ID);

    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
    expect(mockSelect).toHaveBeenCalledWith(
      DEPOSIT_SELECTION
    );
    expect(mockEq).toHaveBeenCalledWith(
      ID_COLUMN,
      CATEGORY_DEPOSIT_ID
    );
  });

  it("returns the row mapped to a deposit", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: buildCategoryDepositRow({ deposit_crc: null }),
      error: null,
    });

    const deposit = await getCategoryDeposit(
      CATEGORY_DEPOSIT_ID
    );

    expect(deposit?.id).toBe(CATEGORY_DEPOSIT_ID);
    expect(deposit?.depositCrc).toBeNull();
    expect(deposit?.depositUsd).toBe(
      DEFAULT_CATEGORY_DEPOSIT_ROW.deposit_usd
    );
  });

  it("returns null when no category matches the id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await getCategoryDeposit(CATEGORY_DEPOSIT_ID)
    ).toBeNull();
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
      await getCategoryDeposit(CATEGORY_DEPOSIT_ID)
    ).toBeNull();
  });

  it("throws instead of returning null when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      getCategoryDeposit(CATEGORY_DEPOSIT_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
