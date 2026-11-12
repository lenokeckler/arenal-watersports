import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE } from "../constants/ReservationCategoryAvailabilityPanelState.constants";
import type { ReservationCategoryAvailabilityPanelState } from "../models/ReservationCategoryAvailabilityPanelState.type";

const RESERVATION_CATEGORY_AVAILABILITY_BASE_CLASS =
  "flex min-w-0 flex-col gap-4 rounded-2xl border p-4 backdrop-blur md:col-span-2 md:flex-row md:items-center md:justify-between md:p-5";

export const RESERVATION_CATEGORY_AVAILABILITY_PANEL_CLASS = `${RESERVATION_CATEGORY_AVAILABILITY_BASE_CLASS} border-outline-variant/60 bg-surface-container-low/80 shadow-lg shadow-black/10`;

export const RESERVATION_CATEGORY_AVAILABILITY_CONTEXT_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_CATEGORY_AVAILABILITY_STATUS_CLASS =
  "mt-1 break-words text-base text-on-surface";

export const RESERVATION_CATEGORY_AVAILABILITY_COUNT_CLASS =
  "text-lg text-primary";

export const RESERVATION_CATEGORY_AVAILABILITY_RETRY_CLASS =
  "mt-2 min-h-11 w-full md:w-auto";

const RESERVATION_CATEGORY_AVAILABILITY_STATUS_BASE_CLASS =
  "flex min-w-0 flex-col gap-1 rounded-xl border px-3 py-2 text-sm md:min-w-48";

const RESERVATION_CATEGORY_AVAILABILITY_STATE_CLASS: Record<
  ReservationCategoryAvailabilityPanelState,
  string
> = {
  [RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.AVAILABLE]: `${RESERVATION_CATEGORY_AVAILABILITY_STATUS_BASE_CLASS} border-primary/30 bg-primary/5 text-on-surface-variant`,
  [RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.ERROR]: `${RESERVATION_CATEGORY_AVAILABILITY_STATUS_BASE_CLASS} border-error/50 bg-error-container/30 text-error`,
  [RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.INACTIVE]:
    RESERVATION_CATEGORY_AVAILABILITY_STATUS_BASE_CLASS,
  [RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.LOADING]: `${RESERVATION_CATEGORY_AVAILABILITY_STATUS_BASE_CLASS} border-outline-variant bg-surface-container-high text-on-surface-variant`,
  [RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.OVERCOMMITTED]: `${RESERVATION_CATEGORY_AVAILABILITY_STATUS_BASE_CLASS} border-secondary/50 bg-secondary-container/20 text-on-surface`,
  [RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.UNAVAILABLE]: `${RESERVATION_CATEGORY_AVAILABILITY_STATUS_BASE_CLASS} border-outline-variant bg-surface-container-high text-on-surface-variant`,
};

export const resolveAvailabilityPanelStatusClass = (
  state: ReservationCategoryAvailabilityPanelState
): string =>
  RESERVATION_CATEGORY_AVAILABILITY_STATE_CLASS[state];
