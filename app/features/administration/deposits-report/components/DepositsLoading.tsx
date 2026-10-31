import { Text, UnorderedList } from "@/app/components";
import { ARIA_ROLE, UNORDERED_LIST } from "@/app/constants";
import DepositsSection from "../DepositsSection";
import { DEPOSITS_REPORT_SKELETON_ROW_COUNT } from "../constants/DepositsReport.constants";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import { DEPOSITS_REPORT_DOM_ID } from "../constants/DepositsReportDomId.constants";
import {
  DEPOSITS_REPORT_SCREEN_READER_CLASS,
  DEPOSITS_REPORT_STACK_CLASS,
} from "../styles/DepositsReport.styles";
import DepositsHeading from "./DepositsHeading";
import PendingDepositSkeletonRow from "./PendingDepositSkeletonRow";
import RetainedDepositSkeletonRow from "./RetainedDepositSkeletonRow";

const PENDING_SKELETON_ITEMS = Array.from(
  { length: DEPOSITS_REPORT_SKELETON_ROW_COUNT },
  () => ({ text: <PendingDepositSkeletonRow /> })
);

const RETAINED_SKELETON_ITEMS = Array.from(
  { length: DEPOSITS_REPORT_SKELETON_ROW_COUNT },
  () => ({ text: <RetainedDepositSkeletonRow /> })
);

const DepositsLoading = (): React.JSX.Element => (
  <div
    className={DEPOSITS_REPORT_STACK_CLASS}
    aria-busy
  >
    <DepositsHeading />
    <Text
      role={ARIA_ROLE.STATUS}
      className={DEPOSITS_REPORT_SCREEN_READER_CLASS}
    >
      {DEPOSITS_REPORT_COPY.LOADING_ANNOUNCEMENT}
    </Text>
    <DepositsSection
      headingId={DEPOSITS_REPORT_DOM_ID.PENDING_HEADING}
      heading={DEPOSITS_REPORT_COPY.PENDING_HEADING}
      help={DEPOSITS_REPORT_COPY.PENDING_HELP}
    >
      <UnorderedList
        variant={UNORDERED_LIST.VARIANTS.PLAIN}
        items={PENDING_SKELETON_ITEMS}
      />
    </DepositsSection>
    <DepositsSection
      headingId={DEPOSITS_REPORT_DOM_ID.RETAINED_HEADING}
      heading={DEPOSITS_REPORT_COPY.RETAINED_HEADING}
      help={DEPOSITS_REPORT_COPY.RETAINED_HELP}
    >
      <UnorderedList
        variant={UNORDERED_LIST.VARIANTS.PLAIN}
        items={RETAINED_SKELETON_ITEMS}
      />
    </DepositsSection>
  </div>
);

export default DepositsLoading;
