export const RESERVATION_FORM_PAGE_CLASS =
  "mx-auto flex w-full max-w-4xl flex-col gap-5 px-gutter py-6 pb-28 md:gap-6 md:py-10 md:pb-10";

export const RESERVATION_FORM_MAIN_CLASS =
  "min-h-screen bg-background text-on-background";

export const RESERVATION_FORM_HEADER_CLASS =
  "flex flex-col gap-3";

export const RESERVATION_FORM_BACK_CLASS =
  "-ml-3 min-h-11 justify-start px-3 text-primary";

export const RESERVATION_FORM_INPUT_CLASS = "!min-h-12";

export const RESERVATION_FORM_TITLE_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const RESERVATION_FORM_DESCRIPTION_CLASS =
  "max-w-2xl text-on-surface-variant";

export const RESERVATION_FORM_CARD_CLASS =
  "rounded-2xl border border-outline-variant/60 bg-surface-container/80 p-4 shadow-xl shadow-black/20 backdrop-blur md:rounded-3xl md:p-8";

export const RESERVATION_FORM_GRID_CLASS =
  "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5";

export const RESERVATION_FORM_FIELD_CLASS = "min-w-0";

export const RESERVATION_FORM_FIELD_WIDE_CLASS =
  "min-w-0 md:col-span-2";

export const RESERVATION_FORM_TIME_HINT_CLASS =
  "mt-2 text-sm text-primary";

export const RESERVATION_FORM_DURATION_GRID_CLASS =
  "grid grid-cols-2 gap-2 sm:grid-cols-3";

export const RESERVATION_FORM_DURATION_BUTTON_CLASS =
  "min-h-12 w-full rounded-lg border border-outline-variant bg-surface-container-high px-3 text-sm text-on-surface transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:min-h-11";

export const RESERVATION_FORM_DURATION_SELECTED_CLASS =
  "border-primary bg-primary/15 font-semibold text-primary";

export const RESERVATION_FORM_CUSTOM_DURATION_CLASS =
  "mt-4 w-full min-w-full";

export const RESERVATION_FORM_EQUIPMENT_NOTE_CLASS =
  "rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm text-on-surface-variant md:col-span-2";

export const RESERVATION_FORM_SUBMIT_CLASS =
  "min-h-12 w-full rounded-full md:w-auto md:min-w-56";

export const RESERVATION_FORM_ACTIONS_CLASS =
  "sticky bottom-0 z-20 -mx-4 mt-6 flex flex-col gap-3 border-t border-outline-variant/50 bg-background/95 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur md:static md:mx-0 md:flex-row md:items-center md:justify-end md:border-0 md:bg-transparent md:p-0 md:pt-2 md:backdrop-blur-none";

export const RESERVATION_FORM_STATUS_CLASS =
  "rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-on-surface";

export const RESERVATION_FORM_ERROR_CLASS =
  "rounded-xl border border-error/50 bg-error-container/30 px-4 py-3 text-error";

export const resolveReservationDurationButtonClassName = (
  isSelected: boolean
): string =>
  isSelected
    ? `${RESERVATION_FORM_DURATION_BUTTON_CLASS} ${RESERVATION_FORM_DURATION_SELECTED_CLASS}`
    : RESERVATION_FORM_DURATION_BUTTON_CLASS;
