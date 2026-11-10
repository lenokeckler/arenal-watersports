import ListPagination from "@/app/components/list-pagination/ListPagination";
import { PATHS } from "@/app/constants";
import { fetchPendingDeposits } from "@/app/services/deposits";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import PendingDepositsEmpty from "./components/PendingDepositsEmpty";
import PendingDepositsHeader from "./components/PendingDepositsHeader";
import PendingDepositsList from "./components/PendingDepositsList";
import { PENDING_DEPOSITS_COPY } from "./constants/PendingDepositsCopy.constants";
import type { PendingDepositsProps } from "./models/PendingDepositsProps.interface";
import { PENDING_DEPOSITS_PAGE_CLASS } from "./styles/PendingDeposits.styles";

const PendingDeposits = async ({
  pageParam,
}: PendingDepositsProps): Promise<React.JSX.Element> => {
  const { items, page, pageCount } =
    await fetchPendingDeposits(resolveListPage(pageParam));

  return (
    <main className={PENDING_DEPOSITS_PAGE_CLASS}>
      <PendingDepositsHeader />
      {items.length === 0 ? (
        <PendingDepositsEmpty />
      ) : (
        <PendingDepositsList deposits={items} />
      )}
      <ListPagination
        basePath={PATHS.RESERVATIONS.DEPOSITS}
        currentPage={page}
        navLabel={PENDING_DEPOSITS_COPY.PAGINATION_LABEL}
        pageCount={pageCount}
      />
    </main>
  );
};

export default PendingDeposits;
