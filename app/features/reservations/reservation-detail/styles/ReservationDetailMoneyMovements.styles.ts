import {
  RESERVATION_DETAIL_MOVEMENT_TYPE,
  type ReservationDetailMovementType,
} from "../constants/ReservationDetail.constants";

export const RESERVATION_DETAIL_MOVEMENTS_BLOCK_CLASS =
  "flex min-w-0 flex-col gap-2";
export const RESERVATION_DETAIL_MOVEMENTS_TOGGLE_CLASS =
  "w-full justify-between gap-2 rounded-full border border-primary/40 px-5 text-sm font-semibold text-primary hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-fit sm:justify-center";
export const RESERVATION_DETAIL_MOVEMENTS_CHEVRON_CLASS =
  "shrink-0 transition-transform duration-200 motion-reduce:transition-none";
export const RESERVATION_DETAIL_MOVEMENTS_CHEVRON_OPEN_CLASS =
  "shrink-0 rotate-180 transition-transform duration-200 motion-reduce:transition-none";
export const RESERVATION_DETAIL_MOVEMENTS_PANEL_CLASS =
  "mt-3 min-w-0";
export const RESERVATION_DETAIL_MOVEMENT_ROW_CLASS =
  "flex min-w-0 flex-col gap-3 rounded-xl border border-white/5 bg-surface-container-low p-4";
export const RESERVATION_DETAIL_MOVEMENT_HEAD_CLASS =
  "flex min-w-0 flex-wrap items-center justify-between gap-2";
export const RESERVATION_DETAIL_MOVEMENT_AMOUNT_GROUP_CLASS =
  "flex min-w-0 items-baseline gap-2";
export const RESERVATION_DETAIL_MOVEMENT_AMOUNT_CLASS =
  "break-words font-mono text-lg font-semibold tabular-nums text-on-surface";
export const RESERVATION_DETAIL_MOVEMENT_CURRENCY_CLASS =
  "font-mono text-xs font-medium uppercase tracking-wider text-on-surface-variant";
export const RESERVATION_DETAIL_MOVEMENT_TYPE_BASE_CLASS =
  "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold";
export const RESERVATION_DETAIL_MOVEMENT_FIELDS_CLASS =
  "grid grid-cols-1 gap-3 border-t border-white/10 pt-3 sm:grid-cols-3 sm:gap-4";
export const RESERVATION_DETAIL_MOVEMENT_FIELD_CLASS =
  "flex min-w-0 flex-col gap-1";
export const RESERVATION_DETAIL_MOVEMENT_FIELD_VALUE_CLASS =
  "break-words text-sm text-on-surface";

export const RESERVATION_DETAIL_MOVEMENT_TYPE_CLASS: Record<
  ReservationDetailMovementType,
  string
> = {
  [RESERVATION_DETAIL_MOVEMENT_TYPE.CHARGE]:
    "border-primary/30 bg-primary/10 text-primary",
  [RESERVATION_DETAIL_MOVEMENT_TYPE.REFUND]:
    "border-warning/30 bg-warning/10 text-warning",
};

export const resolveReservationDetailMovementTypeClassName =
  (type: ReservationDetailMovementType): string =>
    `${RESERVATION_DETAIL_MOVEMENT_TYPE_BASE_CLASS} ${RESERVATION_DETAIL_MOVEMENT_TYPE_CLASS[type]}`;
