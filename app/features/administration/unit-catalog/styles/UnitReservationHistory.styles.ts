import { UNIT_CARD_STATUS_CHIP_BASE_CLASS } from "./UnitCard.styles";

export const UNIT_RESERVATION_HISTORY_SECTION_CLASS =
  "flex flex-col gap-gutter";

export const UNIT_RESERVATION_HISTORY_TITLE_CLASS =
  "text-title-md font-medium text-on-surface";

export const UNIT_RESERVATION_HISTORY_ROW_CLASS =
  "flex min-h-11 flex-col gap-1 rounded-2xl border border-outline-variant bg-surface-container p-4 md:flex-row md:items-center md:gap-4";

export const UNIT_RESERVATION_HISTORY_HEADING_CLASS =
  "flex items-start justify-between gap-3 md:contents";

export const UNIT_RESERVATION_HISTORY_CODE_CLASS =
  "font-mono text-label-mono text-on-surface md:order-1";

export const UNIT_RESERVATION_HISTORY_CUSTOMER_CLASS =
  "text-body-base text-on-surface md:order-2 md:flex-1";

export const UNIT_RESERVATION_HISTORY_START_CLASS =
  "text-sm text-on-surface-variant md:order-3";

export const UNIT_RESERVATION_HISTORY_STATUS_CHIP_CLASS = `${UNIT_CARD_STATUS_CHIP_BASE_CLASS} md:order-4`;
