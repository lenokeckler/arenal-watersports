import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PAGINATION } from "@/app/constants";
import { getInventoryCategoryDetails } from "../readInventory";
import {
  INVENTORY_SERVICE_ACTIVE_UNITS,
  INVENTORY_SERVICE_QUANTITY_CATEGORY_ID,
  INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW,
  INVENTORY_SERVICE_UNIT_CATEGORY_ID,
  INVENTORY_SERVICE_UNIT_SUMMARY_ROW,
} from "./InventoryReadService.constants";
import {
  expectUnitRowsExcludeDecommissioned,
  from,
  resetInventoryReadServiceMocks,
  setQuantityCategory,
} from "./InventoryReadServiceTestHarness";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));

describe("inventory category read queries", () => {
  beforeEach(() =>
    resetInventoryReadServiceMocks(
      supabaseMocks.createServerSupabaseClient
    )
  );

  it("reads unit codes and excludes decommissioned equipment", async () => {
    const categoryDetails =
      await getInventoryCategoryDetails(
        INVENTORY_SERVICE_UNIT_CATEGORY_ID,
        PAGINATION.DEFAULT_PAGE
      );

    expect(categoryDetails.summary).toEqual(
      INVENTORY_SERVICE_UNIT_SUMMARY_ROW
    );
    expectUnitRowsExcludeDecommissioned();
    expect(categoryDetails.units.items).toEqual(
      INVENTORY_SERVICE_ACTIVE_UNITS
    );
  });

  it("does not query units for a quantity-tracked category", async () => {
    setQuantityCategory();

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
