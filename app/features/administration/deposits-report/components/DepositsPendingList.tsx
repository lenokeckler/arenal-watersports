import {
  DepositEmptyNotice,
  UnorderedList,
} from "@/app/components";
import {
  MATERIAL_ICON_NAME,
  UNORDERED_LIST,
} from "@/app/constants";
import PendingDepositRow from "./PendingDepositRow";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import type { DepositsPendingListProps } from "../models/DepositsPendingListProps.interface";

const DepositsPendingList = ({
  deposits,
}: DepositsPendingListProps): React.JSX.Element =>
  deposits.length === 0 ? (
    <DepositEmptyNotice
      icon={MATERIAL_ICON_NAME.LOCK_OPEN}
      title={DEPOSITS_REPORT_COPY.PENDING_EMPTY_TITLE}
      body={DEPOSITS_REPORT_COPY.PENDING_EMPTY_BODY}
    />
  ) : (
    <UnorderedList
      variant={UNORDERED_LIST.VARIANTS.PLAIN}
      ariaLabel={
        DEPOSITS_REPORT_COPY.PENDING_LIST_ARIA_LABEL
      }
      items={deposits.map((deposit) => ({
        id: deposit.id,
        text: <PendingDepositRow deposit={deposit} />,
      }))}
    />
  );

export default DepositsPendingList;
