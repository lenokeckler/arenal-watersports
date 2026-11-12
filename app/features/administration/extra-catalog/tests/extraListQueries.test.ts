import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { fetchExtraCount } from "../services/fetchExtraCount";
import { fetchExtras } from "../services/fetchExtras";
import { DEFAULT_EXTRA_ROW } from "./Extra.constants";
import {
  EXTRA_ID_COLUMN,
  EXTRA_NAME_COLUMN,
  EXTRAS_TABLE,
  SERVER_ERROR_CODE,
} from "./ExtraActions.constants";

const PAGE_RANGE = resolveListPageRange(2);
const TOTAL_COUNT = 3;

const mockRange = vi.fn();
const mockOrderById = vi.fn(() => ({ range: mockRange }));
const mockOrderByName = vi.fn(() => ({
  order: mockOrderById,
}));
const mockSelect = vi.fn(
  (_columns: string, _options?: object) => ({
    order: mockOrderByName,
  })
);
const mockFrom = vi.fn((_table: string) => ({
  select: mockSelect,
}));

const supabase = {
  from: (table: string) => mockFrom(table),
} as unknown as ServerSupabaseClient;

describe("fetchExtras", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockOrderByName.mockClear();
    mockOrderById.mockClear();
    mockRange.mockReset();
  });

  it("reads the page ordered by name and then by id", async () => {
    mockRange.mockResolvedValue({
      data: [DEFAULT_EXTRA_ROW],
      error: null,
    });

    const extraRows = await fetchExtras(
      supabase,
      PAGE_RANGE
    );

    expect(mockFrom).toHaveBeenCalledWith(EXTRAS_TABLE);
    expect(mockOrderByName).toHaveBeenCalledWith(
      EXTRA_NAME_COLUMN,
      { ascending: true }
    );
    expect(mockOrderById).toHaveBeenCalledWith(
      EXTRA_ID_COLUMN,
      { ascending: true }
    );
    expect(mockRange).toHaveBeenCalledWith(
      PAGE_RANGE.from,
      PAGE_RANGE.to
    );
    expect(extraRows).toEqual([DEFAULT_EXTRA_ROW]);
  });

  it("throws instead of returning rows when the read fails", async () => {
    mockRange.mockResolvedValue({
      data: null,
      error: { code: SERVER_ERROR_CODE, message: "boom" },
    });

    await expect(
      fetchExtras(supabase, PAGE_RANGE)
    ).rejects.toThrow(SupabaseQueryError);
  });
});

describe("fetchExtraCount", () => {
  const mockCountSelect = vi.fn(
    (_columns: string, _options: object) =>
      Promise.resolve({ count: TOTAL_COUNT, error: null })
  );
  const countSupabase = {
    from: () => ({ select: mockCountSelect }),
  } as unknown as ServerSupabaseClient;

  it("asks for an exact head count of the extras", async () => {
    const totalCount = await fetchExtraCount(countSupabase);

    expect(mockCountSelect).toHaveBeenCalledWith("*", {
      count: "exact",
      head: true,
    });
    expect(totalCount).toBe(TOTAL_COUNT);
  });

  it("throws when the count fails", async () => {
    mockCountSelect.mockResolvedValueOnce({
      count: null,
      error: { code: SERVER_ERROR_CODE, message: "boom" },
    } as never);

    await expect(
      fetchExtraCount(countSupabase)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
