import BackLink from "@/app/components/back-link/BackLink";
import DepositErrorNotice from "@/app/components/deposit-ledger/DepositErrorNotice";
import { PATHS } from "@/app/constants";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import { DEPOSITS_REPORT_STACK_CLASS } from "../styles/DepositsReport.styles";
import DepositsHeading from "./DepositsHeading";

const DepositsError = (): React.JSX.Element => (
  <div className={DEPOSITS_REPORT_STACK_CLASS}>
    <DepositsHeading />
    <DepositErrorNotice
      title={DEPOSITS_REPORT_COPY.ERROR_TITLE}
      body={DEPOSITS_REPORT_COPY.ERROR_BODY}
    />
    <BackLink
      href={PATHS.HOME}
      label={DEPOSITS_REPORT_COPY.BACK}
    />
  </div>
);

export default DepositsError;
