import { CATEGORY_CONFIGURE_TONE } from "../constants/CategoryConfigureTone.constants";
import type { CategoryConfigureTone } from "../models/CategoryConfigureTone.type";

export const CATEGORY_CONFIGURE_CHIP_BASE_CLASS =
  "inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-sm font-medium";

export const CATEGORY_CONFIGURE_CHIP_DOT_BASE_CLASS =
  "h-2 w-2 rounded-full";

export const CATEGORY_CONFIGURE_CHIP_CLASS: Record<
  CategoryConfigureTone,
  string
> = {
  [CATEGORY_CONFIGURE_TONE.ERROR]: `${CATEGORY_CONFIGURE_CHIP_BASE_CLASS} bg-error-container/40 text-error`,
  [CATEGORY_CONFIGURE_TONE.INFO]: `${CATEGORY_CONFIGURE_CHIP_BASE_CLASS} bg-tertiary-container/20 text-tertiary`,
  [CATEGORY_CONFIGURE_TONE.NEUTRAL]: `${CATEGORY_CONFIGURE_CHIP_BASE_CLASS} bg-surface-container-highest text-on-surface-variant`,
  [CATEGORY_CONFIGURE_TONE.SUCCESS]: `${CATEGORY_CONFIGURE_CHIP_BASE_CLASS} bg-primary/10 text-primary`,
  [CATEGORY_CONFIGURE_TONE.WARNING]: `${CATEGORY_CONFIGURE_CHIP_BASE_CLASS} bg-warning/15 text-warning`,
};

export const CATEGORY_CONFIGURE_CHIP_DOT_CLASS: Record<
  CategoryConfigureTone,
  string
> = {
  [CATEGORY_CONFIGURE_TONE.ERROR]: `${CATEGORY_CONFIGURE_CHIP_DOT_BASE_CLASS} bg-error`,
  [CATEGORY_CONFIGURE_TONE.INFO]: `${CATEGORY_CONFIGURE_CHIP_DOT_BASE_CLASS} bg-tertiary`,
  [CATEGORY_CONFIGURE_TONE.NEUTRAL]: `${CATEGORY_CONFIGURE_CHIP_DOT_BASE_CLASS} bg-on-surface-variant`,
  [CATEGORY_CONFIGURE_TONE.SUCCESS]: `${CATEGORY_CONFIGURE_CHIP_DOT_BASE_CLASS} bg-primary`,
  [CATEGORY_CONFIGURE_TONE.WARNING]: `${CATEGORY_CONFIGURE_CHIP_DOT_BASE_CLASS} bg-warning`,
};
