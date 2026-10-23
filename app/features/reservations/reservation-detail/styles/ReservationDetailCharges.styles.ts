import {
  RESERVATION_DETAIL_CHARGE_STATUS,
  type ReservationDetailChargeStatus,
} from "../constants/ReservationDetail.constants";

export const RESERVATION_DETAIL_CHARGE_BADGE_BASE_CLASS =
  "inline-flex min-h-11 w-fit items-center rounded-full border px-4 py-2 text-sm font-semibold";
export const RESERVATION_DETAIL_MONEY_CLASS =
  "break-words font-mono text-sm font-medium tabular-nums text-on-surface";

export const RESERVATION_DETAIL_CHARGE_BADGE_CLASS: Record<
  ReservationDetailChargeStatus,
  string
> = {
  [RESERVATION_DETAIL_CHARGE_STATUS.PAID]:
    "border-primary/30 bg-primary/10 text-primary",
  [RESERVATION_DETAIL_CHARGE_STATUS.PARENT]:
    "border-tertiary/30 bg-tertiary/10 text-tertiary",
  [RESERVATION_DETAIL_CHARGE_STATUS.PARTIAL]:
    "border-warning/30 bg-warning/10 text-warning",
  [RESERVATION_DETAIL_CHARGE_STATUS.PENDING]:
    "border-secondary/30 bg-secondary/10 text-secondary",
  [RESERVATION_DETAIL_CHARGE_STATUS.UNPRICED]:
    "border-outline-variant/50 bg-surface-variant text-on-surface-variant",
};

export const resolveReservationDetailChargeBadgeClassName =
  (chargeStatus: ReservationDetailChargeStatus): string =>
    `${RESERVATION_DETAIL_CHARGE_BADGE_BASE_CLASS} ${RESERVATION_DETAIL_CHARGE_BADGE_CLASS[chargeStatus]}`;
