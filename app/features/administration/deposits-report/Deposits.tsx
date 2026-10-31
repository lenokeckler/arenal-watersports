import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import {
  fetchPendingDeposits,
  fetchRetainedDeposits,
} from "@/app/services/deposits";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import DepositsView from "./DepositsView";

const Deposits = async (): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const [pendingDeposits, retainedDeposits] =
    await Promise.all([
      fetchPendingDeposits(),
      fetchRetainedDeposits(),
    ]);

  return (
    <DepositsView
      pendingDeposits={pendingDeposits}
      retainedDeposits={retainedDeposits}
    />
  );
};

export default Deposits;
