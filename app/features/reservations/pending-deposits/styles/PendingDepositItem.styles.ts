import { DEPOSIT_ROW_CARD_CLASS } from "@/app/components/deposit-ledger/styles/DepositRow.styles";
import { DEPOSIT_SKELETON_PULSE_CLASS } from "@/app/components/deposit-ledger/styles/DepositSkeleton.styles";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const DEPOSIT_ITEM_CONTAINER_CLASS = joinClassNames(
  DEPOSIT_ROW_CARD_CLASS,
  "border-l-tertiary"
);

const PENDING_DEPOSIT_ITEM_LAYOUT_CLASS =
  "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";

export const PENDING_DEPOSIT_ITEM_CLASS = joinClassNames(
  DEPOSIT_ITEM_CONTAINER_CLASS,
  PENDING_DEPOSIT_ITEM_LAYOUT_CLASS
);

export const PENDING_DEPOSIT_SUMMARY_SLOT_CLASS =
  "min-w-0 flex-1";

export const PENDING_DEPOSIT_RESOLVE_LINK_CLASS =
  "inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-full border border-primary/40 px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit";

export const DEPOSIT_SKELETON_ITEM_CLASS = joinClassNames(
  DEPOSIT_ITEM_CONTAINER_CLASS,
  DEPOSIT_SKELETON_PULSE_CLASS
);
