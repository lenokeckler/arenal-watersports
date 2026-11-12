import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  INVENTORY_DATA_SOURCE,
  PAGINATION,
  SUPABASE_RPC,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { getInventorySummaryPage } from "../readInventory";
import {
  INVENTORY_SERVICE_SUMMARY_RESULT,
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
  rpc.mockImplementation((rpcName: string) =>
    Promise.resolve({
      data:
        rpcName === SUPABASE_RPC.CURRENT_WORK_AREA
          ? SUPABASE_WORK_AREA.OPERATIONS
          : true,
      error: null,
    })
  );
  from.mockReturnValue(queryBuilder);
  queryBuilder.range.mockResolvedValue(
    INVENTORY_SERVICE_SUMMARY_RESULT
  );
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
});
