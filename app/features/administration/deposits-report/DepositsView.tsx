import BackLink from "@/app/components/back-link/BackLink";
import { PATHS } from "@/app/constants";
import DepositsHeading from "./components/DepositsHeading";
import { DEPOSITS_REPORT_COPY } from "./constants/DepositsReportCopy.constants";
import { DEPOSITS_REPORT_DOM_ID } from "./constants/DepositsReportDomId.constants";
import DepositsPendingList from "./DepositsPendingList";
import DepositsRetainedList from "./DepositsRetainedList";
import DepositsSection from "./DepositsSection";
import type { DepositsViewProps } from "./models/DepositsViewProps.interface";
import { DEPOSITS_REPORT_STACK_CLASS } from "./styles/DepositsReport.styles";

const DepositsView = ({
  pendingDeposits,
  retainedDeposits,
}: DepositsViewProps): React.JSX.Element => (
  <div className={DEPOSITS_REPORT_STACK_CLASS}>
    <DepositsHeading />
    <DepositsSection
      headingId={DEPOSITS_REPORT_DOM_ID.PENDING_HEADING}
      heading={DEPOSITS_REPORT_COPY.PENDING_HEADING}
      help={DEPOSITS_REPORT_COPY.PENDING_HELP}
    >
      <DepositsPendingList deposits={pendingDeposits} />
    </DepositsSection>
    <DepositsSection
      headingId={DEPOSITS_REPORT_DOM_ID.RETAINED_HEADING}
      heading={DEPOSITS_REPORT_COPY.RETAINED_HEADING}
      help={DEPOSITS_REPORT_COPY.RETAINED_HELP}
    >
      <DepositsRetainedList deposits={retainedDeposits} />
    </DepositsSection>
    <BackLink
      href={PATHS.HOME}
      label={DEPOSITS_REPORT_COPY.BACK}
    />
  </div>
);

export default DepositsView;
