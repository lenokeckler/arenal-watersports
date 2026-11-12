import BackLink from "@/app/components/back-link/BackLink";
import Link from "@/app/components/link/Link";
import ListPagination from "@/app/components/list-pagination/ListPagination";
import { PATHS } from "@/app/constants";
import DepositsHeading from "./components/DepositsHeading";
import { DEPOSITS_REPORT_COPY } from "./constants/DepositsReportCopy.constants";
import { DEPOSITS_REPORT_DOM_ID } from "./constants/DepositsReportDomId.constants";
import DepositsPendingList from "./components/DepositsPendingList";
import DepositsRetainedList from "./components/DepositsRetainedList";
import DepositsSection from "./components/DepositsSection";
import type { DepositsViewProps } from "./models/DepositsViewProps.interface";
import {
  DEPOSITS_REPORT_STACK_CLASS,
  DEPOSITS_REPORT_WORKER_LINK_CLASS,
} from "./styles/DepositsReport.styles";
import { buildDepositsReportHref } from "./utils/buildDepositsReportHref";

const DepositsView = ({
  currentPages,
  pendingDeposits,
  pendingPageCount,
  retainedDeposits,
  retainedPageCount,
}: DepositsViewProps): React.JSX.Element => (
  <div className={DEPOSITS_REPORT_STACK_CLASS}>
    <DepositsHeading />
    <Link
      href={PATHS.ADMINISTRATION.RESERVATIONS_BY_WORKER}
      className={DEPOSITS_REPORT_WORKER_LINK_CLASS}
    >
      {DEPOSITS_REPORT_COPY.RESERVATIONS_BY_WORKER}
    </Link>
    <DepositsSection
      headingId={DEPOSITS_REPORT_DOM_ID.PENDING_HEADING}
      heading={DEPOSITS_REPORT_COPY.PENDING_HEADING}
      help={DEPOSITS_REPORT_COPY.PENDING_HELP}
    >
      <DepositsPendingList deposits={pendingDeposits} />
      <ListPagination
        basePath={PATHS.ADMINISTRATION.DEPOSITS}
        currentPage={currentPages.pending}
        navLabel={
          DEPOSITS_REPORT_COPY.PENDING_PAGINATION_LABEL
        }
        pageCount={pendingPageCount}
        pageHref={(page) =>
          buildDepositsReportHref({
            ...currentPages,
            pending: page,
          })
        }
      />
    </DepositsSection>
    <DepositsSection
      headingId={DEPOSITS_REPORT_DOM_ID.RETAINED_HEADING}
      heading={DEPOSITS_REPORT_COPY.RETAINED_HEADING}
      help={DEPOSITS_REPORT_COPY.RETAINED_HELP}
    >
      <DepositsRetainedList deposits={retainedDeposits} />
      <ListPagination
        basePath={PATHS.ADMINISTRATION.DEPOSITS}
        currentPage={currentPages.retained}
        navLabel={
          DEPOSITS_REPORT_COPY.RETAINED_PAGINATION_LABEL
        }
        pageCount={retainedPageCount}
        pageHref={(page) =>
          buildDepositsReportHref({
            ...currentPages,
            retained: page,
          })
        }
      />
    </DepositsSection>
    <BackLink
      href={PATHS.HOME}
      label={DEPOSITS_REPORT_COPY.BACK}
    />
  </div>
);

export default DepositsView;
