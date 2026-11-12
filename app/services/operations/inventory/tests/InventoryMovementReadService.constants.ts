import { PAGINATION } from "@/app/constants";
import type { Database } from "@/app/types";
import type { InventoryStockMovementPage } from "../models/InventoryStockMovementPage.interface";

type InventoryMovementRpcRow =
  Database["public"]["Functions"]["list_operations_stock_movements"]["Returns"][number];

export const INVENTORY_SERVICE_MOVEMENT_ROW: InventoryMovementRpcRow =
  {
    actor_name: "Operations User",
    from_available: PAGINATION.DEFAULT_PAGE_SIZE,
    from_damaged: PAGINATION.ONE_PAGE,
    from_in_repair: PAGINATION.ZERO_RESULTS,
    moved_at: "2026-11-07T15:00:00.000Z",
    movement_id: "d7250002-0000-4000-8000-000000000001",
    page_index: PAGINATION.ONE_PAGE,
    reason: "count_correction",
    to_available:
      PAGINATION.DEFAULT_PAGE_SIZE - PAGINATION.ONE_PAGE,
    to_damaged: PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE,
    to_in_repair: PAGINATION.ZERO_RESULTS,
    total_count:
      PAGINATION.DEFAULT_PAGE_SIZE + PAGINATION.ONE_PAGE,
  };

export const EXPECTED_INVENTORY_SERVICE_MOVEMENT_PAGE: InventoryStockMovementPage =
  {
    items: [
      {
        actorName:
          INVENTORY_SERVICE_MOVEMENT_ROW.actor_name,
        availableFrom:
          INVENTORY_SERVICE_MOVEMENT_ROW.from_available,
        availableTo:
          INVENTORY_SERVICE_MOVEMENT_ROW.to_available,
        createdAt: INVENTORY_SERVICE_MOVEMENT_ROW.moved_at,
        damagedFrom:
          INVENTORY_SERVICE_MOVEMENT_ROW.from_damaged,
        damagedTo:
          INVENTORY_SERVICE_MOVEMENT_ROW.to_damaged,
        id: INVENTORY_SERVICE_MOVEMENT_ROW.movement_id,
        inRepairFrom:
          INVENTORY_SERVICE_MOVEMENT_ROW.from_in_repair,
        inRepairTo:
          INVENTORY_SERVICE_MOVEMENT_ROW.to_in_repair,
        reason: INVENTORY_SERVICE_MOVEMENT_ROW.reason,
      },
    ],
    pageIndex: PAGINATION.ONE_PAGE,
    pageCount: PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE,
    totalCount:
      PAGINATION.DEFAULT_PAGE_SIZE + PAGINATION.ONE_PAGE,
  };
