import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { STOCK_CATEGORY_TRACKING_MODE } from "../constants/StockCategoryTrackingMode.constants";
import { STOCK_DATABASE_MESSAGE } from "../constants/StockDatabaseMessage.constants";
import { STOCK_MUTATION_STATUS } from "../constants/StockMutationStatus.constants";
import { adjustStockAction } from "../services/adjustStockAction";
import {
  DEFAULT_ADJUST_STOCK_INPUT,
  DEFAULT_STOCK_CATEGORY,
  DEFAULT_STOCK_LEVELS,
  FAKE_STOCK_ADMIN_WORKER_ID,
} from "./Stock.constants";

const RPC_NAME = "adjust_equipment_stock";

const mockAssertIsAdminWorker = vi.fn();
const mockGetStockCategory = vi.fn();
const mockGetStockLevels = vi.fn();
const mockRpc = vi.fn();

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (...args: unknown[]): unknown =>
      mockAssertIsAdminWorker(...args),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    rpc: (...args: unknown[]): unknown => mockRpc(...args),
  }),
}));

vi.mock("../services/getStockCategory", () => ({
  getStockCategory: (...args: unknown[]): unknown =>
    mockGetStockCategory(...args),
}));

vi.mock("../services/getStockLevels", () => ({
  getStockLevels: (...args: unknown[]): unknown =>
    mockGetStockLevels(...args),
}));

describe("adjustStockAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockGetStockCategory.mockReset();
    mockGetStockLevels.mockReset();
    mockRpc.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_STOCK_ADMIN_WORKER_ID
    );
    mockGetStockCategory.mockResolvedValue(
      DEFAULT_STOCK_CATEGORY
    );
    mockGetStockLevels.mockResolvedValue(
      DEFAULT_STOCK_LEVELS
    );
    mockRpc.mockResolvedValue({ error: null });
  });

  it("rejects a caller who is not an admin before any read or write", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      adjustStockAction(DEFAULT_ADJUST_STOCK_INPUT)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockGetStockCategory).not.toHaveBeenCalled();
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("refuses a category that does not exist", async () => {
    mockGetStockCategory.mockResolvedValue(null);

    expect(
      await adjustStockAction(DEFAULT_ADJUST_STOCK_INPUT)
    ).toEqual({
      message: STOCK_CATALOG_COPY.CATEGORY_NOT_FOUND_ERROR,
      status: STOCK_MUTATION_STATUS.ERROR,
    });
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("refuses a category counted by unit", async () => {
    mockGetStockCategory.mockResolvedValue({
      ...DEFAULT_STOCK_CATEGORY,
      trackingMode: STOCK_CATEGORY_TRACKING_MODE.BY_UNIT,
    });

    expect(
      await adjustStockAction(DEFAULT_ADJUST_STOCK_INPUT)
    ).toEqual({
      message:
        STOCK_CATALOG_COPY.CATEGORY_NOT_BY_QUANTITY_ERROR,
      status: STOCK_MUTATION_STATUS.ERROR,
    });
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("refuses an invalid adjustment without calling the database", async () => {
    expect(
      await adjustStockAction({
        ...DEFAULT_ADJUST_STOCK_INPUT,
        available: -1,
      })
    ).toEqual({
      message: STOCK_CATALOG_COPY.QUANTITY_INVALID_ERROR,
      status: STOCK_MUTATION_STATUS.ERROR,
    });
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("refuses an adjustment that changes nothing", async () => {
    expect(
      await adjustStockAction({
        ...DEFAULT_ADJUST_STOCK_INPUT,
        available: DEFAULT_STOCK_LEVELS.available,
      })
    ).toEqual({
      message:
        STOCK_CATALOG_COPY.ADJUSTMENT_UNCHANGED_ERROR,
      status: STOCK_MUTATION_STATUS.ERROR,
    });
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("calls the adjustment function with the mapped arguments", async () => {
    expect(
      await adjustStockAction(DEFAULT_ADJUST_STOCK_INPUT)
    ).toEqual({ status: STOCK_MUTATION_STATUS.SUCCESS });
    expect(mockRpc).toHaveBeenCalledWith(
      RPC_NAME,
      expect.objectContaining({
        p_available: DEFAULT_ADJUST_STOCK_INPUT.available,
        p_category_id:
          DEFAULT_ADJUST_STOCK_INPUT.categoryId,
        p_reason: DEFAULT_ADJUST_STOCK_INPUT.reason,
      })
    );
  });

  it("turns a database rejection into Spanish copy", async () => {
    mockRpc.mockResolvedValue({
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE,
        message:
          STOCK_DATABASE_MESSAGE.REMOVAL_MUST_LOWER_TOTAL,
      },
    });

    expect(
      await adjustStockAction(DEFAULT_ADJUST_STOCK_INPUT)
    ).toEqual({
      message:
        STOCK_CATALOG_COPY.REMOVAL_MUST_LOWER_TOTAL_ERROR,
      status: STOCK_MUTATION_STATUS.ERROR,
    });
  });

  it("throws on an unexpected database error", async () => {
    mockRpc.mockResolvedValue({
      error: { code: "500", message: "boom" },
    });

    await expect(
      adjustStockAction(DEFAULT_ADJUST_STOCK_INPUT)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
