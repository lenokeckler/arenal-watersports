import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { BoardCategoryUnitRow } from "@/app/services/board";
import { DEFAULT_UNIT_OCCUPANCY } from "./CategoryUnits.constants";

export const DEFAULT_BOARD_UNIT_ROW: BoardCategoryUnitRow =
  {
    category_id: "category-01",
    customer_name: null,
    effective_status: INVENTORY_UNIT_STATUS.AVAILABLE,
    reservation_code: null,
    reservation_ends_at: null,
    reservation_id: null,
    reservation_starts_at: null,
    returns_at: null,
    unit_code: "JS-01",
    unit_id: "unit-01",
  };

export const OCCUPIED_BOARD_UNIT_ROW: BoardCategoryUnitRow =
  {
    ...DEFAULT_BOARD_UNIT_ROW,
    customer_name: DEFAULT_UNIT_OCCUPANCY.customerName,
    effective_status: INVENTORY_UNIT_STATUS.OCCUPIED,
    reservation_code:
      DEFAULT_UNIT_OCCUPANCY.reservationCode,
    reservation_ends_at:
      DEFAULT_UNIT_OCCUPANCY.reservationEndsAt,
    reservation_id: DEFAULT_UNIT_OCCUPANCY.reservationId,
    reservation_starts_at:
      DEFAULT_UNIT_OCCUPANCY.reservationStartsAt,
    returns_at: DEFAULT_UNIT_OCCUPANCY.returnsAt,
    unit_code: "JS-02",
    unit_id: "unit-02",
  };

export const INCOMPLETE_OCCUPIED_ROW_OVERRIDES: Partial<BoardCategoryUnitRow>[] =
  [
    { customer_name: null },
    { reservation_code: null },
    { reservation_ends_at: null },
    { reservation_id: null },
    { reservation_starts_at: null },
    { returns_at: null },
  ];
