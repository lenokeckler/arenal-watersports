import { expect, vi, type Mock } from "vitest";
import {
  INVENTORY_DATA_SOURCE,
  INVENTORY_UNIT_STATUS,
  SUPABASE_RPC,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import type { Database } from "@/app/types";
import {
  INVENTORY_SERVICE_ACTIVE_UNITS,
  INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW,
  INVENTORY_SERVICE_UNIT_SUMMARY_ROW,
  INVENTORY_SERVICE_USER,
} from "./InventoryReadService.constants";

export const getUser = vi.fn();
export const rpc = vi.fn();
export const from = vi.fn();
export const queryBuilder = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  neq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn(),
  maybeSingle: vi.fn(),
};

type InventoryMovementRpcRow =
  Database["public"]["Functions"]["list_operations_stock_movements"]["Returns"][number];
let stockMovementRows: InventoryMovementRpcRow[] = [];

export const setInventoryMovementRows = (
  rows: InventoryMovementRpcRow[]
): void => {
  stockMovementRows = rows;
};

const mockInventoryRpc = (): void => {
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
      return Promise.resolve({
        data: stockMovementRows,
        error: null,
      });
    }

    return Promise.resolve({ data: true, error: null });
  });
};

const mockInventoryQueries = (): void => {
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
};

const mockInventorySupabaseClient = (
  clientMock: Mock
): void => {
  clientMock.mockResolvedValue({
    auth: { getUser },
    rpc,
    from,
  });
};

export const resetInventoryReadServiceMocks = (
  createServerSupabaseClientMock: Mock
): void => {
  vi.clearAllMocks();
  stockMovementRows = [];
  getUser.mockResolvedValue({
    data: { user: INVENTORY_SERVICE_USER },
    error: null,
  });
  mockInventoryRpc();
  mockInventoryQueries();
  mockInventorySupabaseClient(
    createServerSupabaseClientMock
  );
};

export const setQuantityCategory = (): void => {
  queryBuilder.maybeSingle.mockResolvedValue({
    data: INVENTORY_SERVICE_QUANTITY_SUMMARY_ROW,
    error: null,
  });
};

export const expectUnitRowsExcludeDecommissioned =
  (): void => {
    expect(queryBuilder.neq).toHaveBeenCalledWith(
      INVENTORY_DATA_SOURCE.RECORDED_STATUS_COLUMN,
      INVENTORY_UNIT_STATUS.DECOMMISSIONED
    );
  };
