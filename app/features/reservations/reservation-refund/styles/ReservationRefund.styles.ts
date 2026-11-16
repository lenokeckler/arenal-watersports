export const RESERVATION_REFUND_MAIN_CLASS =
  "min-h-screen bg-background text-on-background";

export const RESERVATION_REFUND_PAGE_CLASS =
  "mx-auto flex w-full max-w-2xl flex-col gap-5 px-gutter py-6 pb-28 md:gap-6 md:py-10 md:pb-10";

export const RESERVATION_REFUND_HEADER_CLASS =
  "flex flex-col gap-3";

export const RESERVATION_REFUND_BACK_CLASS =
  "-ml-3 inline-flex min-h-11 items-center justify-start px-3 text-primary";

export const RESERVATION_REFUND_TITLE_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const RESERVATION_REFUND_CARD_CLASS =
  "rounded-2xl border border-outline-variant/60 bg-surface-container/80 p-4 shadow-xl shadow-black/20 backdrop-blur md:rounded-3xl md:p-8";

export const RESERVATION_REFUND_SUMMARY_CLASS =
  "space-y-4 rounded-xl bg-surface-container-low/70 px-4 py-4";

export const RESERVATION_REFUND_SUMMARY_HEADING_CLASS =
  "text-base font-semibold text-on-surface";

export const RESERVATION_REFUND_CODE_CLASS =
  "font-mono text-sm tabular-nums text-primary";

export const RESERVATION_REFUND_DETAILS_CLASS =
  "grid grid-cols-1 gap-3";

export const RESERVATION_REFUND_TERM_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_REFUND_DEFINITION_CLASS =
  "break-words text-base font-semibold tabular-nums text-on-surface";

export const RESERVATION_REFUND_AVAILABLE_GRID_CLASS =
  "grid grid-cols-1 gap-3 md:grid-cols-2";

export const RESERVATION_REFUND_AVAILABLE_AMOUNT_CLASS =
  "break-words text-lg font-semibold tabular-nums text-on-surface";

export const RESERVATION_REFUND_AVAILABLE_EMPTY_CLASS =
  "text-base text-on-surface-variant";

export const RESERVATION_REFUND_NOTE_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_REFUND_LOCKED_CLASS =
  "space-y-1 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-on-surface";

export const RESERVATION_REFUND_LOCKED_TITLE_CLASS =
  "font-semibold";

export const RESERVATION_REFUND_STACK_CLASS =
  "space-y-4 text-on-surface";

export const RESERVATION_REFUND_DETAIL_LINK_CLASS =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 font-semibold text-on-primary transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-auto md:min-w-56";

export const resolveReservationRefundAvailableClassName = (
  hasAmount: boolean
): string =>
  hasAmount
    ? RESERVATION_REFUND_AVAILABLE_AMOUNT_CLASS
    : RESERVATION_REFUND_AVAILABLE_EMPTY_CLASS;
