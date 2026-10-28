import { fetchPendingDeposits } from "@/app/services/deposits";
import PendingDepositsEmpty from "./components/PendingDepositsEmpty";
import PendingDepositsHeader from "./components/PendingDepositsHeader";
import PendingDepositsList from "./components/PendingDepositsList";
import { PENDING_DEPOSITS_PAGE_CLASS } from "./styles/PendingDeposits.styles";

const PendingDeposits =
  async (): Promise<React.JSX.Element> => {
    const deposits = await fetchPendingDeposits();

    return (
      <main className={PENDING_DEPOSITS_PAGE_CLASS}>
        <PendingDepositsHeader />
        {deposits.length === 0 ? (
          <PendingDepositsEmpty />
        ) : (
          <PendingDepositsList deposits={deposits} />
        )}
      </main>
    );
  };

export default PendingDeposits;
