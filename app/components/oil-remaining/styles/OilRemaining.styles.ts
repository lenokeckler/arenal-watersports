import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const OIL_REMAINING_CLASS =
  "inline-flex shrink-0 items-center gap-1 text-xs tabular-nums text-on-surface-variant";

const OIL_REMAINING_NEON_RED_CLASS =
  "text-[#ff1744] drop-shadow-[0_0_5px_#ff1744]";

const OIL_REMAINING_NEON_AMBER_CLASS =
  "text-[#ffb000] drop-shadow-[0_0_5px_#ffb000]";

const OIL_REMAINING_ICON_BASE_CLASS = "size-4 shrink-0";

export const resolveOilRemainingIconClass = (
  isPast: boolean
): string =>
  joinClassNames(
    OIL_REMAINING_ICON_BASE_CLASS,
    isPast
      ? OIL_REMAINING_NEON_RED_CLASS
      : OIL_REMAINING_NEON_AMBER_CLASS
  );
