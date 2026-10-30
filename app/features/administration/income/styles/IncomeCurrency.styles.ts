import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const INCOME_CURRENCY_CLASS =
  "flex flex-col gap-md rounded-xl border border-l-4 border-outline-variant border-l-primary bg-card-tint-neutral-bg p-md backdrop-blur-md";

export const INCOME_CURRENCY_HEADER_CLASS =
  "flex items-baseline justify-between gap-sm";

export const INCOME_CURRENCY_NAME_CLASS =
  "text-title-md text-on-surface";

export const INCOME_CURRENCY_CODE_CLASS =
  "font-mono text-label-mono text-on-surface-variant";

export const INCOME_TALLY_CLASS = "flex flex-col gap-sm";

export const INCOME_TALLY_ROW_CLASS =
  "flex items-baseline justify-between gap-sm";

export const INCOME_TALLY_LABEL_CLASS =
  "text-body-base text-on-surface-variant";

export const INCOME_TALLY_AMOUNT_CLASS =
  "whitespace-nowrap text-title-md font-semibold tabular-nums text-on-surface";

export const INCOME_NET_BLOCK_CLASS =
  "flex flex-col gap-xs border-t border-outline-variant pt-md";

export const INCOME_NET_LABEL_CLASS =
  "text-label-mono uppercase text-on-surface-variant";

export const INCOME_NET_AMOUNT_CLASS =
  "whitespace-nowrap text-headline-lg-mobile font-semibold tabular-nums text-on-surface md:text-headline-lg";

export const INCOME_NET_NEGATIVE_AMOUNT_CLASS =
  joinClassNames(INCOME_NET_AMOUNT_CLASS, "text-error");

export const resolveIncomeNetAmountClassName = (
  isNegative: boolean
): string =>
  isNegative
    ? INCOME_NET_NEGATIVE_AMOUNT_CLASS
    : INCOME_NET_AMOUNT_CLASS;

export const INCOME_NET_HELP_CLASS =
  "text-label-mono text-on-surface-variant";

export const INCOME_NET_NOTE_CLASS =
  "flex items-start gap-xs text-body-base text-on-surface";

export const INCOME_NET_NOTE_ICON_CLASS =
  "shrink-0 text-xl text-error";

export const INCOME_SIGN_CLASS = "select-none";
