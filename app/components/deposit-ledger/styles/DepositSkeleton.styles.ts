import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import { DEPOSIT_SUMMARY_CLASS } from "./DepositSummary.styles";

export const DEPOSIT_SKELETON_SUMMARY_CLASS =
  joinClassNames(
    DEPOSIT_SUMMARY_CLASS,
    "animate-pulse motion-reduce:animate-none"
  );

export const DEPOSIT_SKELETON_DETAILS_CLASS =
  "flex w-full flex-col gap-xs";

export const DEPOSIT_SKELETON_BAR_CLASS =
  "h-4 rounded bg-surface-container-high";

export const DEPOSIT_SKELETON_CUSTOMER_CLASS =
  joinClassNames(DEPOSIT_SKELETON_BAR_CLASS, "w-3/5");

export const DEPOSIT_SKELETON_CODE_CLASS = joinClassNames(
  DEPOSIT_SKELETON_BAR_CLASS,
  "w-1/3"
);

export const DEPOSIT_SKELETON_AMOUNT_CLASS = joinClassNames(
  DEPOSIT_SKELETON_BAR_CLASS,
  "w-1/4 shrink-0"
);
