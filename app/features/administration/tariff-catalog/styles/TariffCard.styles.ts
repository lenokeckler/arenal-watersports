import { TARIFF_CARD_TONE } from "../constants/TariffCardTone.constants";
import type { TariffCardTone } from "../models/TariffCardTone.type";

const TARIFF_CARD_BASE_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container/60 p-4";

export const TARIFF_CARD_CONTAINER_CLASS: Record<
  TariffCardTone,
  string
> = {
  [TARIFF_CARD_TONE.MUTED]: `${TARIFF_CARD_BASE_CLASS} opacity-60`,
  [TARIFF_CARD_TONE.STANDARD]: TARIFF_CARD_BASE_CLASS,
};

export const TARIFF_CARD_NAME_CLASS =
  "min-w-0 break-words text-title-md font-medium text-on-surface";

export const TARIFF_CARD_LINE_CLASS =
  "flex min-h-11 flex-wrap items-center justify-between gap-x-3 gap-y-1";

export const TARIFF_CARD_LINE_LABEL_CLASS =
  "text-sm text-on-surface-variant";

export const TARIFF_CARD_LINE_VALUE_CLASS =
  "flex flex-wrap items-baseline justify-end gap-x-2";

export const TARIFF_CARD_LINE_AMOUNTS_CLASS =
  "text-body-base font-medium text-on-surface";

export const TARIFF_CARD_LINE_UNIT_CLASS =
  "text-sm text-on-surface-variant";
