import type { Metadata } from "next";
import { PAGINATION } from "@/app/constants";
import InventoryCountHistory from "@/app/features/operations/inventory-count-history/InventoryCountHistory";
import { INVENTORY_COUNT_HISTORY_COPY } from "@/app/features/operations/inventory-count-history/constants/InventoryCountHistoryCopy.constants";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";

export const metadata: Metadata = {
  title: INVENTORY_COUNT_HISTORY_COPY.HEADING,
};

const OperationsInventoryCountsPage = async ({
  searchParams,
}: PageProps<"/operations/inventory-counts">): Promise<React.JSX.Element> => {
  const resolvedSearchParams = await searchParams;

  return (
    <InventoryCountHistory
      page={resolveListPage(
        resolvedSearchParams[PAGINATION.QUERY_PARAMS.PAGE]
      )}
    />
  );
};

export default OperationsInventoryCountsPage;
