import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const UNIT_CARD_CONTAINER_CLASS =
  "flex flex-col gap-3 rounded-2xl border border-outline-variant bg-surface-container p-4 md:flex-row md:flex-wrap md:items-center";

export const UNIT_CARD_DIMMED_CLASS = "opacity-70";

export const resolveUnitCardContainerClassName = (
  isDimmed: boolean
): string =>
  joinClassNames(
    UNIT_CARD_CONTAINER_CLASS,
    isDimmed && UNIT_CARD_DIMMED_CLASS
  );

export const UNIT_CARD_HEADING_ROW_CLASS =
  "flex items-start justify-between gap-3 md:contents";

export const UNIT_CARD_CODE_CLASS =
  "text-title-md font-medium text-on-surface md:order-1";

export const UNIT_CARD_STATUS_CHIP_CLASS =
  "rounded-full border border-outline px-2 py-0.5 font-mono text-label-mono uppercase text-on-surface-variant md:order-2";

export const UNIT_CARD_DETAILS_CLASS =
  "flex flex-col gap-1 md:order-3";

export const UNIT_CARD_DETAIL_CLASS =
  "text-sm text-on-surface-variant";

export const UNIT_CARD_ACTIONS_CLASS =
  "md:order-4 md:ml-auto";
