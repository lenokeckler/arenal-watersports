import { UnorderedList } from "@/app/components";
import { UNORDERED_LIST } from "@/app/constants";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";
import type { PendingDepositsListProps } from "../models/PendingDepositsListProps.interface";
import PendingDepositItem from "./PendingDepositItem";

const PendingDepositsList = ({
  deposits,
}: PendingDepositsListProps): React.JSX.Element => (
  <UnorderedList
    variant={UNORDERED_LIST.VARIANTS.PLAIN}
    ariaLabel={PENDING_DEPOSITS_COPY.LIST_ARIA_LABEL}
    items={deposits.map((deposit) => ({
      id: deposit.id,
      text: <PendingDepositItem deposit={deposit} />,
    }))}
  />
);

export default PendingDepositsList;
