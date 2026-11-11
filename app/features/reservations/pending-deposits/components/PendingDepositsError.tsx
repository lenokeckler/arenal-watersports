import { DepositErrorNotice } from "@/app/components";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";
import { PENDING_DEPOSITS_PAGE_CLASS } from "../styles/PendingDeposits.styles";
import PendingDepositsHeader from "./PendingDepositsHeader";

const PendingDepositsError = (): React.JSX.Element => (
  <main className={PENDING_DEPOSITS_PAGE_CLASS}>
    <PendingDepositsHeader />
    <DepositErrorNotice
      title={PENDING_DEPOSITS_COPY.ERROR_TITLE}
      body={PENDING_DEPOSITS_COPY.ERROR_BODY}
    />
  </main>
);

export default PendingDepositsError;
