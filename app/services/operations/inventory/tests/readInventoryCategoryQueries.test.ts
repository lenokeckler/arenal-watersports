import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  INVENTORY_DATA_SOURCE,
  INVENTORY_UNIT_STATUS,
  PAGINATION,
  SUPABASE_RPC,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { getInventoryCategoryDetails } from "../readInventory";
import {
  INVENTORY_SERVICE_ACTIVE_UNITS,
  INVENTORY_SERVICE_QUANTITY_CATEGORY_ID,
  INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW,
  INVENTORY_SERVICE_UNIT_CATEGORY_ID,
  INVENTORY_SERVICE_UNIT_SUMMARY_ROW,
  INVENTORY_SERVICE_USER,
} from "./InventoryReadService.constants";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));

const getUser = vi.fn();
const rpc = vi.fn();
const from = vi.fn();
const queryBuilder = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  neq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn(),
  maybeSingle: vi.fn(),
};

const resetMocks = (): void => {
  vi.clearAllMocks();
  getUser.mockResolvedValue({
    data: { user: INVENTORY_SERVICE_USER },
    error: null,
  });
  rpc.mockImplementation((rpcName: string) => {
    if (rpcName === SUPABASE_RPC.CURRENT_WORK_AREA) {
      return Promise.resolve({
        data: SUPABASE_WORK_AREA.OPERATIONS,
        error: null,
      });
    }

    if (
      rpcName ===
      SUPABASE_RPC.LIST_OPERATIONS_STOCK_MOVEMENTS
    ) {
      return Promise.resolve({ data: [], error: null });
    }

    return Promise.resolve({ data: true, error: null });
  });
  from.mockReturnValue(queryBuilder);
  queryBuilder.range.mockResolvedValue({
    data: INVENTORY_SERVICE_ACTIVE_UNITS,
    error: null,
    count: INVENTORY_SERVICE_ACTIVE_UNITS.length,
  });
  queryBuilder.maybeSingle.mockResolvedValue({
    data: INVENTORY_SERVICE_UNIT_SUMMARY_ROW,
    error: null,
  });
  supabaseMocks.createServerSupabaseClient.mockResolvedValue(
    {
      auth: { getUser },
      rpc,
      from,
    } as unknown as Awaited<
      ReturnType<typeof createServerSupabaseClient>
    >
  );
};

describe("inventory category read queries", () => {
  beforeEach(resetMocks);

  it("reads unit codes and excludes decommissioned equipment", async () => {
    const categoryDetails =
      await getInventoryCategoryDetails(
        INVENTORY_SERVICE_UNIT_CATEGORY_ID,
        PAGINATION.DEFAULT_PAGE
      );

    expect(categoryDetails.summary).toEqual(
      INVENTORY_SERVICE_UNIT_SUMMARY_ROW
    );
    expect(queryBuilder.neq).toHaveBeenCalledWith(
      INVENTORY_DATA_SOURCE.RECORDED_STATUS_COLUMN,
      INVENTORY_UNIT_STATUS.DECOMMISSIONED
    );
    expect(categoryDetails.units.items).toEqual(
      INVENTORY_SERVICE_ACTIVE_UNITS
    );
  });

  it("does not query units for a quantity-tracked category", async () => {
    queryBuilder.maybeSingle.mockResolvedValue({
      data: INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW,
      error: null,
    });

    const categoryDetails =
      await getInventoryCategoryDetails(
        INVENTORY_SERVICE_QUANTITY_CATEGORY_ID,
        PAGINATION.DEFAULT_PAGE + PAGINATION.ONE_PAGE
      );

    expect(categoryDetails.summary).toEqual(
      INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW
    );
    expect(from).toHaveBeenCalledTimes(PAGINATION.ONE_PAGE);
    expect(categoryDetails.units.totalCount).toBe(
      PAGINATION.ZERO_RESULTS
    );
    expect(categoryDetails.movements?.items).toEqual([]);
    expect(categoryDetails.movements?.pageIndex).toBe(
      PAGINATION.DEFAULT_PAGE
    );
  });
});
