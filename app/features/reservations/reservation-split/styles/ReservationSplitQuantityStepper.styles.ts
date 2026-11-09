export const RESERVATION_SPLIT_STEPPER_WRAPPER_CLASS =
  "space-y-1";

export const RESERVATION_SPLIT_STEPPER_ROW_CLASS =
  "flex min-h-14 items-center justify-between gap-3";

export const RESERVATION_SPLIT_STEPPER_LABEL_CLASS =
  "min-w-0 break-words text-base text-on-surface";

export const RESERVATION_SPLIT_STEPPER_GROUP_CLASS =
  "inline-flex shrink-0 items-center gap-1 rounded-full border border-outline-variant bg-surface-container-high p-1";

const RESERVATION_SPLIT_STEPPER_BUTTON_BASE_CLASS =
  "inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const RESERVATION_SPLIT_STEPPER_BUTTON_CLASS = `${RESERVATION_SPLIT_STEPPER_BUTTON_BASE_CLASS} hover:bg-primary/10 active:bg-primary/20`;

const RESERVATION_SPLIT_STEPPER_BUTTON_BLOCKED_CLASS = `${RESERVATION_SPLIT_STEPPER_BUTTON_BASE_CLASS} opacity-50`;

export const RESERVATION_SPLIT_STEPPER_VALUE_CLASS =
  "min-w-12 px-1 text-center text-lg font-semibold tabular-nums text-on-surface";

export const RESERVATION_SPLIT_STEPPER_SCREEN_READER_CLASS =
  "sr-only";

export const RESERVATION_SPLIT_STEPPER_HELPER_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_SPLIT_STEPPER_ERROR_CLASS =
  "text-sm text-error";

export const resolveReservationSplitStepperButtonClassName =
  (isBlocked: boolean): string =>
    isBlocked
      ? RESERVATION_SPLIT_STEPPER_BUTTON_BLOCKED_CLASS
      : RESERVATION_SPLIT_STEPPER_BUTTON_CLASS;
