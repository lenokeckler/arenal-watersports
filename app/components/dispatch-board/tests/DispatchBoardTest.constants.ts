import type { PendingDispatchReservation } from "../models/PendingDispatchReservation.interface";
import {
  DISPATCH_BOARD_MAX_PAGE,
  DISPATCH_BOARD_PAGINATION,
} from "../constants/DispatchBoard.constants";

export const COSTA_RICA_DATE_FIXTURE = {
  EXPECTED_PREVIOUS_DAY_END: "2026-09-05T06:00:00.000Z",
  EXPECTED_PREVIOUS_DAY_START: "2026-09-04T06:00:00.000Z",
  EXPECTED_TODAY_END: "2026-09-06T06:00:00.000Z",
  EXPECTED_TODAY_START: "2026-09-05T06:00:00.000Z",
  PREVIOUS_LOCAL_DAY: new Date("2026-09-05T05:59:59.000Z"),
  TODAY_AT_LOCAL_MIDNIGHT: new Date(
    "2026-09-05T06:00:00.000Z"
  ),
} as const;

export const PENDING_RESERVATION_FIXTURE: PendingDispatchReservation =
  {
    id: "reservation-1",
    code: "R-20260905-0001",
    customer_name: "María Pérez",
    equipment: [
      {
        categoryName: "Jet ski",
        quantity: 2,
        totalQuantity: 2,
      },
      {
        categoryName: "Kayak doble",
        quantity: 1,
        totalQuantity: 1,
      },
    ],
    ends_at: "2026-09-05T16:00:00.000Z",
    dock_notified_at: null,
    starts_at: "2026-09-05T15:00:00.000Z",
    isCombo: false,
    status: "scheduled",
  };

export const COMBO_RESERVATION_FIXTURE: PendingDispatchReservation =
  {
    ...PENDING_RESERVATION_FIXTURE,
    id: "reservation-combo",
    code: "R-20260905-0002",
    customer_name: "Luis Gómez",
    isCombo: true,
  };

export const PARTIAL_RESERVATION_FIXTURE: PendingDispatchReservation =
  {
    ...PENDING_RESERVATION_FIXTURE,
    id: "reservation-partial",
    code: "R-20260905-0003",
    customer_name: "Ana Rojas",
    dock_notified_at: "2026-09-05T15:20:00.000Z",
    equipment: [
      {
        categoryName: "Jet ski",
        quantity: 1,
        totalQuantity: 2,
      },
    ],
  };

export const INVALID_PENDING_DISPATCH_PAGE_FIXTURES = {
  BELOW_FIRST_PAGE:
    DISPATCH_BOARD_PAGINATION.FIRST_PAGE - 1,
  FRACTIONAL_PAGE:
    DISPATCH_BOARD_PAGINATION.FIRST_PAGE + Number.EPSILON,
  OFFSET_OUT_OF_RANGE: DISPATCH_BOARD_MAX_PAGE + 1,
  UNSAFE_INTEGER: Number.MAX_SAFE_INTEGER + 1,
} as const;
