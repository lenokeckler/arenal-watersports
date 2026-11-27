import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  INVENTORY_TRACKING_MODE,
  POSTGRES_ERROR_CODE,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  EXTRA_COMPATIBILITY_CATEGORY_COLUMNS,
  EXTRA_COMPATIBILITY_UNITS_ORDER_OPTIONS,
} from "../constants/ExtraCompatibilityQuery.constants";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import { fetchExtraCompatibilityCategories } from "../services/fetchExtraCompatibilityCategories";
import { fetchExtraCompatibilityCategory } from "../services/fetchExtraCompatibilityCategory";
import { fetchExtraCompatibilityExtra } from "../services/fetchExtraCompatibilityExtra";
import { fetchExtraLinkedUnitIds } from "../services/fetchExtraLinkedUnitIds";
import { EXTRA_ID_COLUMN } from "./ExtraActions.constants";
import {
  CATEGORY_NAME_COLUMN,
  CATEGORY_STATUS_COLUMN,
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_CATEGORY_ROW,
  COMPATIBILITY_EXTRA,
  COMPATIBILITY_EXTRA_ID,
  EQUIPMENT_CATEGORIES_TABLE,
  EXTRA_COMPATIBILITY_TABLE,
  EXTRA_ID_FOREIGN_COLUMN,
  LINKED_UNIT_ID,
  TRACKING_MODE_COLUMN,
  UNIT_CODE_COLUMN,
} from "./ExtraCompatibility.constants";
import { buildPostgrestError } from "./buildPostgrestError";

const MALFORMED_ID = "not-a-uuid";

const mockMaybeSingle = vi.fn();
const mockChain = {
  select: vi.fn(),
  eq: vi.fn(),
  order: vi.fn(),
  maybeSingle: (): unknown => mockMaybeSingle(),
};
const mockFrom = vi.fn((_table: string) => mockChain);
const supabase = {
  from: mockFrom,
} as unknown as ServerSupabaseClient;

const malformedIdResult = {
  data: null,
  error: buildPostgrestError(
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ),
};

describe("extra compatibility queries", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockMaybeSingle.mockReset();
    mockChain.select.mockReset().mockReturnValue(mockChain);
    mockChain.eq.mockReset().mockReturnValue(mockChain);
    mockChain.order.mockReset().mockReturnValue(mockChain);
  });

  it("reads the id and name of the extra", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: COMPATIBILITY_EXTRA,
      error: null,
    });

    expect(
      await fetchExtraCompatibilityExtra(
        supabase,
        COMPATIBILITY_EXTRA_ID
      )
    ).toEqual(COMPATIBILITY_EXTRA);
    expect(mockChain.eq).toHaveBeenCalledWith(
      EXTRA_ID_COLUMN,
      COMPATIBILITY_EXTRA_ID
    );
  });

  it("gives null for a malformed extra id", async () => {
    mockMaybeSingle.mockResolvedValue(malformedIdResult);

    expect(
      await fetchExtraCompatibilityExtra(
        supabase,
        MALFORMED_ID
      )
    ).toBeNull();
  });

  it("reads the unit ids linked to the extra", async () => {
    mockChain.eq.mockResolvedValue({
      data: [{ unit_id: LINKED_UNIT_ID }],
      error: null,
    });

    expect(
      await fetchExtraLinkedUnitIds(
        supabase,
        COMPATIBILITY_EXTRA_ID
      )
    ).toEqual([LINKED_UNIT_ID]);
    expect(mockFrom).toHaveBeenCalledWith(
      EXTRA_COMPATIBILITY_TABLE
    );
    expect(mockChain.eq).toHaveBeenCalledWith(
      EXTRA_ID_FOREIGN_COLUMN,
      COMPATIBILITY_EXTRA_ID
    );
  });

  it("throws when the linked units cannot be read", async () => {
    mockChain.eq.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.RAISE_EXCEPTION
      ),
    });

    await expect(
      fetchExtraLinkedUnitIds(
        supabase,
        COMPATIBILITY_EXTRA_ID
      )
    ).rejects.toThrow(SupabaseQueryError);
  });

  it("reads the active by-unit categories ordered by name with their units ordered by code", async () => {
    mockChain.order
      .mockReturnValueOnce(mockChain)
      .mockResolvedValueOnce({
        data: [COMPATIBILITY_CATEGORY_ROW],
        error: null,
      });

    expect(
      await fetchExtraCompatibilityCategories(supabase)
    ).toEqual([COMPATIBILITY_CATEGORY_ROW]);
    expect(mockFrom).toHaveBeenCalledWith(
      EQUIPMENT_CATEGORIES_TABLE
    );
    expect(mockChain.select).toHaveBeenCalledWith(
      EXTRA_COMPATIBILITY_CATEGORY_COLUMNS
    );
    expect(mockChain.eq).toHaveBeenCalledWith(
      TRACKING_MODE_COLUMN,
      INVENTORY_TRACKING_MODE.BY_UNIT
    );
    expect(mockChain.eq).toHaveBeenCalledWith(
      CATEGORY_STATUS_COLUMN,
      EXTRA_STATUS.ACTIVE
    );
    expect(mockChain.order).toHaveBeenCalledWith(
      CATEGORY_NAME_COLUMN,
      { ascending: true }
    );
    expect(mockChain.order).toHaveBeenCalledWith(
      UNIT_CODE_COLUMN,
      EXTRA_COMPATIBILITY_UNITS_ORDER_OPTIONS
    );
  });

  it("reads one by-unit category by id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: COMPATIBILITY_CATEGORY_ROW,
      error: null,
    });

    expect(
      await fetchExtraCompatibilityCategory(
        supabase,
        COMPATIBILITY_CATEGORY_ID
      )
    ).toEqual(COMPATIBILITY_CATEGORY_ROW);
    expect(mockChain.eq).toHaveBeenCalledWith(
      TRACKING_MODE_COLUMN,
      INVENTORY_TRACKING_MODE.BY_UNIT
    );
  });

  it("gives null for a malformed category id", async () => {
    mockMaybeSingle.mockResolvedValue(malformedIdResult);

    expect(
      await fetchExtraCompatibilityCategory(
        supabase,
        MALFORMED_ID
      )
    ).toBeNull();
  });
});
