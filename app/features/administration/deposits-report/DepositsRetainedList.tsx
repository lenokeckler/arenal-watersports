import {
  DepositEmptyNotice,
  UnorderedList,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { UNORDERED_LIST } from "@/app/constants";
import RetainedDepositRow from "./components/RetainedDepositRow";
import { DEPOSITS_REPORT_COPY } from "./constants/DepositsReportCopy.constants";
import type { DepositsRetainedListProps } from "./models/DepositsRetainedListProps.interface";

const DepositsRetainedList = ({
  deposits,
}: DepositsRetainedListProps): React.JSX.Element =>
  deposits.length === 0 ? (
    <DepositEmptyNotice
      icon={MATERIAL_ICON_NAME.LOCK_OPEN}
      title={DEPOSITS_REPORT_COPY.RETAINED_EMPTY_TITLE}
      body={DEPOSITS_REPORT_COPY.RETAINED_EMPTY_BODY}
    />
  ) : (
    <UnorderedList
      variant={UNORDERED_LIST.VARIANTS.PLAIN}
      ariaLabel={
        DEPOSITS_REPORT_COPY.RETAINED_LIST_ARIA_LABEL
      }
      items={deposits.map((deposit) => ({
        id: deposit.id,
        text: <RetainedDepositRow deposit={deposit} />,
      }))}
    />
  );

export default DepositsRetainedList;
