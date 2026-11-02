import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import {
  fetchPendingDeposits,
  fetchRetainedDeposits,
} from "@/app/services/deposits";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import DepositsView from "./DepositsView";

const Deposits = async (): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const [pendingPage, retainedPage] = await Promise.all([
    fetchPendingDeposits(LIST_PAGINATION.FIRST_PAGE),
    fetchRetainedDeposits(LIST_PAGINATION.FIRST_PAGE),
  ]);

  if (!retainedPage) {
    redirect(PATHS.HOME);
  }

  return (
    <DepositsView
      pendingDeposits={pendingPage.items}
      retainedDeposits={retainedPage.items}
    />
  );
};

export default Deposits;
