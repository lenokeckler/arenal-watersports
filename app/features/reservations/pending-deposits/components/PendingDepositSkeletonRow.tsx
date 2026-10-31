import { DepositSkeletonSummary } from "@/app/components";
import { DEPOSIT_ITEM_CONTAINER_CLASS } from "../styles/PendingDepositItem.styles";

const PendingDepositSkeletonRow = (): React.JSX.Element => (
  <div className={DEPOSIT_ITEM_CONTAINER_CLASS}>
    <DepositSkeletonSummary />
  </div>
);

export default PendingDepositSkeletonRow;
