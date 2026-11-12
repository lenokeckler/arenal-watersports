import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { STOCK_MOVEMENT_ORDER } from "../constants/StockMovementOrder.constants";
import { fetchStockMovements } from "../services/fetchStockMovements";
import {
  DEFAULT_STOCK_MOVEMENT_ROW,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";

const MOVEMENTS_TABLE = "equipment_stock_movements";
const PAGE_RANGE = { from: 0, to: 19 };

const mockRange = vi.fn();
const mockOrder = vi.fn();
const mockEq = vi.fn();
const mockSelect = vi.fn();
const query = {
  eq: mockEq,
  order: mockOrder,
  range: mockRange,
  select: mockSelect,
};
const mockFrom = vi.fn((_table: string) => query);
const supabase = {
  from: (table: string) => mockFrom(table),
} as unknown as ServerSupabaseClient;

describe("fetchStockMovements", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockOrder.mockClear();
    mockRange.mockReset();
    mockSelect.mockReturnValue(query);
    mockEq.mockReturnValue(query);
    mockOrder.mockReturnValue(query);
  });

  it("orders the newest movement first, with the id as tiebreaker", async () => {
    mockRange.mockResolvedValue({
      data: [DEFAULT_STOCK_MOVEMENT_ROW],
      error: null,
    });

    expect(
      await fetchStockMovements(
        supabase,
        FAKE_STOCK_CATEGORY_ID,
        PAGE_RANGE
      )
    ).toEqual([DEFAULT_STOCK_MOVEMENT_ROW]);
    expect(mockFrom).toHaveBeenCalledWith(MOVEMENTS_TABLE);
    expect(mockOrder).toHaveBeenNthCalledWith(
      1,
      STOCK_MOVEMENT_ORDER.CREATED_AT_COLUMN,
      { ascending: false }
    );
    expect(mockOrder).toHaveBeenNthCalledWith(
      2,
      STOCK_MOVEMENT_ORDER.ID_COLUMN,
      { ascending: false }
    );
    expect(mockRange).toHaveBeenCalledWith(
      PAGE_RANGE.from,
      PAGE_RANGE.to
    );
  });

  it("throws when the query fails", async () => {
    mockRange.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      fetchStockMovements(
        supabase,
        FAKE_STOCK_CATEGORY_ID,
        PAGE_RANGE
      )
    ).rejects.toThrow(SupabaseQueryError);
  });
});
