import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  POSTGRES_ERROR_CODE,
  SUPABASE_RPC,
} from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import {
  INVENTORY_STOCK_ADJUSTMENT_COPY,
  INVENTORY_STOCK_ADJUSTMENT_REASON,
  INVENTORY_STOCK_ADJUSTMENT_STATUS,
} from "../constants/InventoryStockAdjustment.constants";
import type { InventoryStockAdjustmentInput } from "../models/InventoryStockAdjustmentInput.interface";
import { submitInventoryStockAdjustment } from "../actions/submitInventoryStockAdjustment";

vi.mock(
  "@/app/services/operations/inventory/requireInventoryAccess",
  () => ({
    requireInventoryAccess: vi.fn(),
  })
);

const rpc = vi.fn();
const categoryId = "d7250001-0000-4000-8000-000000000001";
const adjustment: InventoryStockAdjustmentInput = {
  available: 4,
  categoryId,
  damaged: 1,
  expiryDate: null,
  inRepair: 0,
  reason:
    INVENTORY_STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION,
};

describe("submitInventoryStockAdjustment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireInventoryAccess).mockResolvedValue({
      rpc,
    } as never);
    rpc.mockResolvedValue({ error: null });
  });

  it("validates quantities before calling the database", async () => {
    const result = await submitInventoryStockAdjustment({
      ...adjustment,
      available: -1,
    });

    expect(result).toEqual({
      message:
        INVENTORY_STOCK_ADJUSTMENT_COPY.QUANTITY_INVALID_ERROR,
      status: INVENTORY_STOCK_ADJUSTMENT_STATUS.ERROR,
    });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("validates the category ID and calendar date at the server boundary", async () => {
    const invalidCategory =
      await submitInventoryStockAdjustment({
        ...adjustment,
        categoryId: "not-a-uuid",
      });
    const invalidDate =
      await submitInventoryStockAdjustment({
        ...adjustment,
        expiryDate: "2026-02-30",
      });

    expect(invalidCategory.message).toBe(
      INVENTORY_STOCK_ADJUSTMENT_COPY.CATEGORY_NOT_FOUND_ERROR
    );
    expect(invalidDate.message).toBe(
      INVENTORY_STOCK_ADJUSTMENT_COPY.EXPIRY_DATE_INVALID_ERROR
    );
    expect(rpc).not.toHaveBeenCalled();
  });

  it("records a valid adjustment through the authorized RPC", async () => {
    const result =
      await submitInventoryStockAdjustment(adjustment);

    expect(result.status).toBe(
      INVENTORY_STOCK_ADJUSTMENT_STATUS.SUCCESS
    );
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.ADJUST_EQUIPMENT_STOCK,
      {
        p_available: adjustment.available,
        p_category_id: adjustment.categoryId,
        p_damaged: adjustment.damaged,
        p_expiry_date: undefined,
        p_in_repair: adjustment.inRepair,
        p_reason: adjustment.reason,
      }
    );
  });

  it("turns active-mode authorization errors into a safe message", async () => {
    rpc.mockResolvedValue({
      error: {
        code: POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
        message: "private database detail",
      },
    });

    const result =
      await submitInventoryStockAdjustment(adjustment);

    expect(result).toEqual({
      message:
        INVENTORY_STOCK_ADJUSTMENT_COPY.NOT_AUTHORIZED_ERROR,
      status: INVENTORY_STOCK_ADJUSTMENT_STATUS.ERROR,
    });
    expect(JSON.stringify(result)).not.toContain(
      "private database detail"
    );
  });
});
