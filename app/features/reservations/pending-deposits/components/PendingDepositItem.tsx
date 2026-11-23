import { DepositSummary, Link } from "@/app/components";
import { resolveDepositResolutionPath } from "@/app/utils/reservations/resolveDepositResolutionPath";
import { PENDING_DEPOSITS_COPY as COPY } from "../constants/PendingDepositsCopy.constants";
import type { PendingDepositItemProps } from "../models/PendingDepositItemProps.interface";
import {
  PENDING_DEPOSIT_ITEM_CLASS,
  PENDING_DEPOSIT_RESOLVE_LINK_CLASS,
} from "../styles/PendingDepositItem.styles";

const PendingDepositItem = ({
  deposit,
}: PendingDepositItemProps): React.JSX.Element => (
  <div className={PENDING_DEPOSIT_ITEM_CLASS}>
    <DepositSummary
      customerName={deposit.reservation.customerName}
      code={deposit.reservation.code}
      amount={deposit.amount}
      currency={deposit.currency}
    />
    <Link
      href={resolveDepositResolutionPath(deposit.id)}
      ariaLabel={COPY.RESOLVE_LABEL(
        deposit.reservation.code
      )}
      className={PENDING_DEPOSIT_RESOLVE_LINK_CLASS}
    >
      {COPY.RESOLVE}
    </Link>
  </div>
);

export default PendingDepositItem;
