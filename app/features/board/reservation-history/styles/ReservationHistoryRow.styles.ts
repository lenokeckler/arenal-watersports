import { RESERVATION_HISTORY_STATUS } from "@/app/constants";
import type { ReservationHistoryStatus } from "@/app/services/board/reservation-history/models/ReservationHistoryStatus.type";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

const RESERVATION_HISTORY_ROW_BASE_CLASS =
  "flex min-h-12 items-center justify-between gap-sm rounded-xl border border-l-4 border-outline-variant bg-card-tint-neutral-bg p-md backdrop-blur-md transition-colors hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

export const RESERVATION_HISTORY_ROW_CLASS: Record<
  ReservationHistoryStatus,
  string
> = {
  [RESERVATION_HISTORY_STATUS.CANCELLED]: joinClassNames(
    RESERVATION_HISTORY_ROW_BASE_CLASS,
    "border-l-secondary"
  ),
  [RESERVATION_HISTORY_STATUS.CLOSED]: joinClassNames(
    RESERVATION_HISTORY_ROW_BASE_CLASS,
    "border-l-primary"
  ),
};

export const RESERVATION_HISTORY_ROW_DETAILS_CLASS =
  "flex min-w-0 flex-1 flex-col gap-xs";

export const RESERVATION_HISTORY_ROW_TOP_CLASS =
  "flex items-center justify-between gap-sm";

export const RESERVATION_HISTORY_ROW_DATE_CLASS =
  "font-mono text-label-mono text-on-surface-variant";

export const RESERVATION_HISTORY_ROW_CUSTOMER_CLASS =
  "line-clamp-2 break-words text-body-base font-semibold text-on-surface";

export const RESERVATION_HISTORY_ROW_MARKER_CLASS =
  "rounded-full border border-secondary px-2 py-0.5 font-mono text-label-mono uppercase text-secondary";

export const RESERVATION_HISTORY_ROW_LINES_CLASS =
  "flex flex-col gap-xs";

export const RESERVATION_HISTORY_ROW_LINE_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_HISTORY_ROW_LINE_LABEL_CLASS =
  "font-mono text-label-mono uppercase";

export const RESERVATION_HISTORY_ROW_VALUE_CLASS =
  "break-words text-on-surface";

export const RESERVATION_HISTORY_ROW_CLAMPED_VALUE_CLASS =
  joinClassNames(
    RESERVATION_HISTORY_ROW_VALUE_CLASS,
    "line-clamp-2"
  );

export const RESERVATION_HISTORY_ROW_CHEVRON_CLASS =
  "shrink-0 text-on-surface-variant";
