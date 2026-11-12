import { DepositSkeletonSummary } from "@/app/components";
import { DEPOSIT_SKELETON_ITEM_CLASS } from "../styles/PendingDepositItem.styles";

const PendingDepositSkeletonRow = (): React.JSX.Element => (
  <div className={DEPOSIT_SKELETON_ITEM_CLASS}>
    <DepositSkeletonSummary />
  </div>
);

export default PendingDepositSkeletonRow;
