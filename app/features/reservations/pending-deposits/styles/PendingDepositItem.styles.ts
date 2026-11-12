import { DEPOSIT_ROW_CARD_CLASS } from "@/app/components/deposit-ledger/styles/DepositRow.styles";
import { DEPOSIT_SKELETON_PULSE_CLASS } from "@/app/components/deposit-ledger/styles/DepositSkeleton.styles";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const DEPOSIT_ITEM_CONTAINER_CLASS = joinClassNames(
  DEPOSIT_ROW_CARD_CLASS,
  "border-l-tertiary"
);

export const DEPOSIT_SKELETON_ITEM_CLASS = joinClassNames(
  DEPOSIT_ITEM_CONTAINER_CLASS,
  DEPOSIT_SKELETON_PULSE_CLASS
);
