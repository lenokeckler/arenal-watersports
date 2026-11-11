export const WORK_MODE_STACK_CLASS = "flex flex-col gap-md";

export const WORK_MODE_CARDS_CLASS = "flex flex-col gap-sm";

const WORK_MODE_CARD_BASE_CLASS =
  "flex min-h-24 w-full items-center gap-md rounded-xl border p-md text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none aria-disabled:opacity-60";

export const WORK_MODE_CARD_CLASS = `${WORK_MODE_CARD_BASE_CLASS} border-outline bg-surface-container/50 hover:border-primary/60`;

export const WORK_MODE_CURRENT_CARD_CLASS = `${WORK_MODE_CARD_BASE_CLASS} border-primary bg-primary/10`;

export const WORK_MODE_CARD_ICON_CLASS =
  "shrink-0 text-headline-lg text-primary";

export const WORK_MODE_CARD_TEXT_CLASS =
  "flex flex-1 flex-col gap-xs";

export const WORK_MODE_CARD_TITLE_CLASS =
  "text-headline-lg-mobile text-on-surface";

export const WORK_MODE_CARD_DESCRIPTION_CLASS =
  "text-body-base text-on-surface-variant";

export const WORK_MODE_CARD_CURRENT_CLASS =
  "text-label-mono uppercase text-primary";

export const WORK_MODE_ERROR_CLASS =
  "text-body-base text-error";

export const resolveWorkModeCardClassName = (
  isCurrent: boolean
): string =>
  isCurrent
    ? WORK_MODE_CURRENT_CARD_CLASS
    : WORK_MODE_CARD_CLASS;

export const WORK_MODE_SWITCH_CLASS =
  "flex items-center justify-end gap-sm px-sm text-body-base text-on-surface-variant";

export const WORK_MODE_SWITCH_LINK_CLASS =
  "inline-flex min-h-12 items-center rounded-lg px-sm text-button font-semibold text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
