import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { BoardCategoryUnitRow } from "@/app/services/board";
import { DEFAULT_UNIT_OCCUPANCY } from "./CategoryUnits.constants";

export const DEFAULT_BOARD_UNIT_ROW: BoardCategoryUnitRow =
  {
    category_id: "category-01",
    consumes_fuel: false,
    customer_name: null,
    dispatch_id: null,
    dispatched_at: null,
    effective_status: INVENTORY_UNIT_STATUS.AVAILABLE,
    fuel_level: null,
    fuel_max: 4,
    has_motor: false,
    impact_count: 0,
    low_fuel_lines: 1,
    people_count: null,
    radio_channel: null,
    reservation_code: null,
    reservation_ends_at: null,
    reservation_id: null,
    reservation_starts_at: null,
    returns_at: null,
    unit_code: "JS-01",
    unit_id: "unit-01",
    usage_metric: null,
    usage_total: 0,
  };

export const OCCUPIED_BOARD_UNIT_ROW: BoardCategoryUnitRow =
  {
    ...DEFAULT_BOARD_UNIT_ROW,
    customer_name: DEFAULT_UNIT_OCCUPANCY.customerName,
    dispatch_id: DEFAULT_UNIT_OCCUPANCY.dispatchId,
    dispatched_at: DEFAULT_UNIT_OCCUPANCY.dispatchedAt,
    effective_status: INVENTORY_UNIT_STATUS.OCCUPIED,
    people_count: DEFAULT_UNIT_OCCUPANCY.peopleCount,
    radio_channel: DEFAULT_UNIT_OCCUPANCY.radioChannel,
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
    { dispatch_id: null },
    { dispatched_at: null },
    { people_count: null },
    { reservation_code: null },
    { reservation_ends_at: null },
    { reservation_id: null },
    { reservation_starts_at: null },
    { returns_at: null },
  ];

export const MOTOR_BOARD_UNIT_ROW: BoardCategoryUnitRow = {
  ...DEFAULT_BOARD_UNIT_ROW,
  consumes_fuel: true,
  fuel_level: 3,
  fuel_max: 4,
  has_motor: true,
  usage_metric: "engine_hours",
  usage_total: 97.5,
};

export const KILOMETERS_BOARD_UNIT_ROW: BoardCategoryUnitRow =
  {
    ...MOTOR_BOARD_UNIT_ROW,
    consumes_fuel: false,
    fuel_level: null,
    fuel_max: 6,
    usage_metric: "kilometers",
    usage_total: 1250,
  };
