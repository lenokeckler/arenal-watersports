import { DEPOSIT_SKELETON_PULSE_CLASS } from "@/app/components/deposit-ledger/styles/DepositSkeleton.styles";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const DEPOSIT_ITEM_CONTAINER_CLASS =
  "rounded-xl border border-l-4 border-outline-variant border-l-tertiary bg-card-tint-neutral-bg p-md backdrop-blur-md";

export const DEPOSIT_SKELETON_ITEM_CLASS = joinClassNames(
  DEPOSIT_ITEM_CONTAINER_CLASS,
  DEPOSIT_SKELETON_PULSE_CLASS
);
