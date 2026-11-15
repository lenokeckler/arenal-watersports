import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCY,
} from "@/app/features/reservations/reservation-detail/constants/ReservationDetail.constants";
import {
  RESERVATION_DETAIL_MOVEMENTS_COPY,
  RESERVATION_DETAIL_MOVEMENTS_PANEL_ID,
} from "@/app/features/reservations/reservation-detail/constants/ReservationDetailMovementsCopy.constants";
import { formatReservationDetailAmount } from "@/app/features/reservations/reservation-detail/utils/formatReservationDetailAmount";

const TARIFF_AMOUNT_USD = 40;
const EXTRA_TIME_AMOUNT_CRC = 15000;
const REFUND_AMOUNT_USD = 5;

export const E2E_RESERVATION_MONEY_MOVEMENTS_FIXTURE = {
  CASH: "Efectivo",
  CARD: "Tarjeta",
  EXTRA_TIME_AMOUNT_CRC,
  EXTRA_TIME_AMOUNT_DISPLAY: formatReservationDetailAmount(
    EXTRA_TIME_AMOUNT_CRC,
    RESERVATION_DETAIL_CURRENCY.CRC
  ),
  REFUND_AMOUNT_DISPLAY: formatReservationDetailAmount(
    REFUND_AMOUNT_USD,
    RESERVATION_DETAIL_CURRENCY.USD
  ),
  REFUND_AMOUNT_USD,
  REFUND_REASON: "E2E money movements refund",
  TARIFF_AMOUNT_DISPLAY: formatReservationDetailAmount(
    TARIFF_AMOUNT_USD,
    RESERVATION_DETAIL_CURRENCY.USD
  ),
  TARIFF_AMOUNT_USD,
  MOVEMENT_COUNT: 3,
  CREATED_AT_FAILURE:
    "Reservation money movements E2E fixture row was not returned",
  CREATED_BY_FAILURE:
    "Reservation money movements E2E fixture has no creator",
} as const;

export const E2E_RESERVATION_MONEY_MOVEMENTS_ARIA = {
  COLLAPSED: "false",
  EXPANDED: "true",
  EXPANDED_ATTRIBUTE: "aria-expanded",
} as const;

export const E2E_RESERVATION_MONEY_MOVEMENTS_VALUES = {
  CHARGE_KIND: RESERVATION_DETAIL_CHARGE_KIND,
  CURRENCY: RESERVATION_DETAIL_CURRENCY,
} as const;

export const E2E_RESERVATION_MONEY_MOVEMENTS_COPY = {
  ...RESERVATION_DETAIL_MOVEMENTS_COPY,
  PANEL_ID: RESERVATION_DETAIL_MOVEMENTS_PANEL_ID,
} as const;
