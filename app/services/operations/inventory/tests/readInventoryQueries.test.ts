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
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import {
  getInventoryCategoryDetails,
  getInventorySummaryPage,
} from "../readInventory";
import {
  INVENTORY_SERVICE_ACTIVE_UNITS,
  INVENTORY_SERVICE_QUANTITY_CATEGORY_ID,
  INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW,
  INVENTORY_SERVICE_SUMMARY_RESULT,
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
  rpc.mockResolvedValue({ data: true, error: null });
  from.mockReturnValue(queryBuilder);
  queryBuilder.range.mockResolvedValue(
    INVENTORY_SERVICE_SUMMARY_RESULT
  );
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

describe("inventory read queries", () => {
  beforeEach(resetMocks);

  it("requests category summaries in a server-paginated range", async () => {
    const requestedPageIndex = PAGINATION.ONE_PAGE;
    const rangeStart =
      requestedPageIndex * PAGINATION.DEFAULT_PAGE_SIZE;
    const rangeEnd =
      rangeStart +
      PAGINATION.DEFAULT_PAGE_SIZE -
      PAGINATION.ONE_PAGE;

    const inventoryPage = await getInventorySummaryPage(
      requestedPageIndex
    );

    expect(from).toHaveBeenCalledWith(
      INVENTORY_DATA_SOURCE.CATEGORY_SUMMARY_VIEW
    );
    expect(queryBuilder.range).toHaveBeenCalledWith(
      rangeStart,
      rangeEnd
    );
    expect(inventoryPage).toMatchObject({
      pageIndex: requestedPageIndex,
      pageCount: PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE,
      totalCount: INVENTORY_SERVICE_SUMMARY_RESULT.count,
    });
  });

  it("reads unit codes and excludes decommissioned equipment", async () => {
    queryBuilder.range.mockResolvedValue({
      data: INVENTORY_SERVICE_ACTIVE_UNITS,
      error: null,
      count: INVENTORY_SERVICE_ACTIVE_UNITS.length,
    });

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
        PAGINATION.DEFAULT_PAGE
      );

    expect(categoryDetails.summary).toEqual(
      INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW
    );
    expect(from).toHaveBeenCalledTimes(PAGINATION.ONE_PAGE);
    expect(categoryDetails.units.totalCount).toBe(
      PAGINATION.ZERO_RESULTS
    );
  });
});
