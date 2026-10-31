import { DEPOSIT_ROW_CARD_CLASS } from "@/app/components/deposit-ledger/styles/DepositRow.styles";
import { DEPOSIT_SKELETON_PULSE_CLASS } from "@/app/components/deposit-ledger/styles/DepositSkeleton.styles";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const DEPOSITS_REPORT_STACK_CLASS =
  "flex flex-col gap-md";

export const DEPOSITS_REPORT_SECTION_CLASS =
  "flex flex-col gap-sm";

export const DEPOSITS_REPORT_HEADING_CLASS =
  "text-title-md font-semibold text-on-surface";

export const DEPOSITS_REPORT_HELP_CLASS =
  "text-body-base text-on-surface-variant";

export const PENDING_DEPOSIT_ROW_CLASS = joinClassNames(
  DEPOSIT_ROW_CARD_CLASS,
  "border-l-tertiary"
);

export const RETAINED_DEPOSIT_ROW_CLASS = joinClassNames(
  DEPOSIT_ROW_CARD_CLASS,
  "flex flex-col gap-sm border-l-error"
);

export const RETAINED_REASON_CLASS =
  "flex flex-col gap-xs rounded-lg border border-card-tint-damaged-border bg-card-tint-damaged-bg p-sm";

export const RETAINED_REASON_LABEL_CLASS =
  "text-label-mono uppercase text-on-surface-variant";

export const RETAINED_REASON_TEXT_CLASS =
  "whitespace-pre-line break-words text-body-base text-on-surface";

export const PENDING_DEPOSIT_SKELETON_ROW_CLASS =
  joinClassNames(
    PENDING_DEPOSIT_ROW_CLASS,
    DEPOSIT_SKELETON_PULSE_CLASS
  );

export const RETAINED_DEPOSIT_SKELETON_ROW_CLASS =
  joinClassNames(
    RETAINED_DEPOSIT_ROW_CLASS,
    DEPOSIT_SKELETON_PULSE_CLASS
  );

export const RETAINED_SKELETON_REASON_CLASS =
  "h-12 rounded-lg bg-surface-container-high";
