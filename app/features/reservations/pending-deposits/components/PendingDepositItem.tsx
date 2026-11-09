import { DepositSummary } from "@/app/components";
import type { PendingDepositItemProps } from "../models/PendingDepositItemProps.interface";
import { DEPOSIT_ITEM_CONTAINER_CLASS } from "../styles/PendingDepositItem.styles";

const PendingDepositItem = ({
  deposit,
}: PendingDepositItemProps): React.JSX.Element => (
  <div className={DEPOSIT_ITEM_CONTAINER_CLASS}>
    <DepositSummary
      customerName={deposit.reservation.customerName}
      code={deposit.reservation.code}
      amount={deposit.amount}
      currency={deposit.currency}
    />
  </div>
);

export default PendingDepositItem;
