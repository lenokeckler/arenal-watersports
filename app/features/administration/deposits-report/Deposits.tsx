import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import {
  fetchPendingDeposits,
  fetchRetainedDeposits,
} from "@/app/services/deposits";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import DepositsView from "./DepositsView";
import type { DepositsProps } from "./models/DepositsProps.interface";

const Deposits = async ({
  pendingPageParam,
  retainedPageParam,
}: DepositsProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const [pendingPage, retainedPage] = await Promise.all([
    fetchPendingDeposits(resolveListPage(pendingPageParam)),
    fetchRetainedDeposits(
      resolveListPage(retainedPageParam)
    ),
  ]);

  if (!retainedPage) {
    redirect(PATHS.HOME);
  }

  return (
    <DepositsView
      currentPages={{
        pending: pendingPage.page,
        retained: retainedPage.page,
      }}
      pendingDeposits={pendingPage.items}
      pendingPageCount={pendingPage.pageCount}
      retainedDeposits={retainedPage.items}
      retainedPageCount={retainedPage.pageCount}
    />
  );
};

export default Deposits;
