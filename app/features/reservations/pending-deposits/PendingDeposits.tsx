import { fetchPendingDeposits } from "@/app/services/deposits";
import PendingDepositsEmpty from "./components/PendingDepositsEmpty";
import PendingDepositsHeader from "./components/PendingDepositsHeader";
import PendingDepositsList from "./components/PendingDepositsList";
import { PENDING_DEPOSITS_PAGE_CLASS } from "./styles/PendingDeposits.styles";

const PendingDeposits =
  async (): Promise<React.JSX.Element> => {
    const deposits = await fetchPendingDeposits();

    if (deposits.length === 0) {
      return (
        <main className={PENDING_DEPOSITS_PAGE_CLASS}>
          <PendingDepositsHeader />
          <PendingDepositsEmpty />
        </main>
      );
    }

    return (
      <main className={PENDING_DEPOSITS_PAGE_CLASS}>
        <PendingDepositsHeader />
        <PendingDepositsList deposits={deposits} />
      </main>
    );
  };

export default PendingDeposits;
