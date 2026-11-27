import { CATEGORY_CONFIGURE_NEXT_STEP_STATE } from "../constants/CategoryConfigureNextStepState.constants";
import type { CategoryConfigureNextStepState } from "../models/CategoryConfigureNextStepState.type";

export const CATEGORY_CONFIGURE_NEXT_STEPS_CLASS =
  "flex flex-col gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4";

export const CATEGORY_CONFIGURE_NEXT_STEPS_HEADER_CLASS =
  "flex items-center justify-between gap-3";

export const CATEGORY_CONFIGURE_NEXT_STEPS_TITLE_CLASS =
  "m-0 text-body-base font-semibold text-on-surface";

export const CATEGORY_CONFIGURE_NEXT_STEPS_PROGRESS_CLASS =
  "text-sm font-semibold text-primary";

export const CATEGORY_CONFIGURE_NEXT_STEPS_BODY_CLASS =
  "text-sm text-on-surface-variant";

export const CATEGORY_CONFIGURE_NEXT_STEP_CLASS =
  "flex min-h-11 items-center gap-3 border-t border-outline-variant pt-3";

export const CATEGORY_CONFIGURE_NEXT_STEP_TEXT_CLASS =
  "flex min-w-0 flex-1 flex-col gap-1";

export const CATEGORY_CONFIGURE_NEXT_STEP_TITLE_CLASS =
  "flex flex-wrap items-center gap-2 text-body-base font-semibold text-on-surface";

export const CATEGORY_CONFIGURE_NEXT_STEP_HELP_CLASS =
  "text-sm text-on-surface-variant";

export const CATEGORY_CONFIGURE_NEXT_STEP_OPTIONAL_CLASS =
  "rounded-full bg-surface-container-highest px-2 text-xs font-medium text-on-surface-variant";

export const CATEGORY_CONFIGURE_NEXT_STEP_BUTTON_CLASS =
  "min-h-11 shrink-0 rounded-full border border-primary px-4 text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const CATEGORY_CONFIGURE_NEXT_STEP_ICON_CLASS: Record<
  CategoryConfigureNextStepState,
  string
> = {
  [CATEGORY_CONFIGURE_NEXT_STEP_STATE.DONE]:
    "shrink-0 text-primary",
  [CATEGORY_CONFIGURE_NEXT_STEP_STATE.OPTIONAL]:
    "shrink-0 text-on-surface-variant",
  [CATEGORY_CONFIGURE_NEXT_STEP_STATE.PENDING]:
    "shrink-0 text-on-surface-variant",
};
