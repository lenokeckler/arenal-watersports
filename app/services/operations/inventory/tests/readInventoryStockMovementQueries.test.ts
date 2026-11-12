import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PAGINATION, SUPABASE_RPC } from "@/app/constants";
import { getInventoryCategoryDetails } from "../readInventory";
import { INVENTORY_SERVICE_QUANTITY_CATEGORY_ID } from "./InventoryReadService.constants";
import {
  EXPECTED_INVENTORY_SERVICE_MOVEMENT_PAGE,
  INVENTORY_SERVICE_MOVEMENT_ROW,
} from "./InventoryMovementReadService.constants";
import {
  queryBuilder,
  rpc,
  resetInventoryReadServiceMocks,
  setInventoryMovementRows,
  setQuantityCategory,
} from "./InventoryReadServiceTestHarness";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));

describe("inventory stock movement read queries", () => {
  beforeEach(() =>
    resetInventoryReadServiceMocks(
      supabaseMocks.createServerSupabaseClient
    )
  );

  it("maps actor data and page metadata for movement history", async () => {
    setInventoryMovementRows([
      INVENTORY_SERVICE_MOVEMENT_ROW,
    ]);
    setQuantityCategory();

    const categoryDetails =
      await getInventoryCategoryDetails(
        INVENTORY_SERVICE_QUANTITY_CATEGORY_ID,
        PAGINATION.ONE_PAGE
      );

    expect(categoryDetails.movements).toEqual(
      EXPECTED_INVENTORY_SERVICE_MOVEMENT_PAGE
    );
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.LIST_OPERATIONS_STOCK_MOVEMENTS,
      {
        p_category_id:
          INVENTORY_SERVICE_QUANTITY_CATEGORY_ID,
        p_page_index: PAGINATION.ONE_PAGE,
        p_page_size: PAGINATION.DEFAULT_PAGE_SIZE,
      }
    );
    expect(queryBuilder.maybeSingle).toHaveBeenCalled();
  });
});
