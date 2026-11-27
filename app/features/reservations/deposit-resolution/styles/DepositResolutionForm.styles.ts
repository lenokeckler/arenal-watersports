import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { DepositResolutionOptionClassState } from "../models/DepositResolutionOptionClassState.interface";

export const DEPOSIT_RESOLUTION_FORM_CLASS = "space-y-6";

export const DEPOSIT_RESOLUTION_AMOUNT_INPUT_CLASS =
  "text-xl font-semibold tabular-nums";

export const DEPOSIT_RESOLUTION_HINT_CLASS =
  "mt-1 text-sm text-on-surface-variant";

export const DEPOSIT_RESOLUTION_KEPT_CLASS =
  "flex min-w-0 items-center justify-between gap-3 rounded-xl border border-outline-variant/50 bg-surface-container-low px-4 py-3";

export const DEPOSIT_RESOLUTION_KEPT_LABEL_CLASS =
  "text-sm text-on-surface-variant";

export const DEPOSIT_RESOLUTION_KEPT_AMOUNT_CLASS =
  "break-words text-lg font-semibold tabular-nums text-on-surface";

export const DEPOSIT_RESOLUTION_ALERT_CLASS =
  "rounded-xl border border-error/50 bg-error-container/30 px-4 py-3 text-error";

export const DEPOSIT_RESOLUTION_ACTIONS_CLASS =
  "sticky bottom-0 z-20 -mx-gutter flex flex-col gap-3 border-t border-outline-variant/50 bg-background/95 px-gutter py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur md:static md:mx-0 md:flex-row-reverse md:items-center md:justify-start md:border-0 md:bg-transparent md:p-0 md:pt-2 md:backdrop-blur-none";

export const DEPOSIT_RESOLUTION_SUBMIT_CLASS =
  "min-h-12 w-full rounded-full md:w-auto md:min-w-56";

export const DEPOSIT_RESOLUTION_SECONDARY_LINK_CLASS =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-auto";

export const DEPOSIT_RESOLUTION_CHOICE_FIELDSET_CLASS =
  "min-w-0 space-y-2";

export const DEPOSIT_RESOLUTION_CHOICE_LEGEND_CLASS =
  "text-sm font-medium text-on-surface";

export const DEPOSIT_RESOLUTION_CHOICE_GRID_CLASS =
  "grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2";

export const DEPOSIT_RESOLUTION_CHOICE_RADIO_CLASS =
  "sr-only";

export const DEPOSIT_RESOLUTION_CHOICE_LABEL_CLASS =
  "text-base font-semibold text-on-surface";

export const DEPOSIT_RESOLUTION_CHOICE_DESCRIPTION_CLASS =
  "text-sm leading-relaxed tabular-nums text-on-surface-variant";

const CHOICE_OPTION_CLASS =
  "flex min-h-16 flex-col justify-center gap-1 rounded-2xl border bg-surface-container-high px-4 py-3 text-left transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

const CHOICE_SELECTED_CLASS =
  "border-2 border-primary bg-primary/10 shadow-lg shadow-primary/5";

const CHOICE_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:border-primary/70";

const CHOICE_ENABLED_CLASS = "cursor-pointer";

const CHOICE_DISABLED_CLASS =
  "cursor-not-allowed opacity-60";

export const resolveDepositResolutionChoiceClassName = ({
  isDisabled,
  isSelected,
}: DepositResolutionOptionClassState): string =>
  joinClassNames(
    CHOICE_OPTION_CLASS,
    isSelected ? CHOICE_SELECTED_CLASS : CHOICE_IDLE_CLASS,
    isDisabled
      ? CHOICE_DISABLED_CLASS
      : CHOICE_ENABLED_CLASS
  );
