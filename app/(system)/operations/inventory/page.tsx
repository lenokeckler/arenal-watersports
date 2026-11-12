import type { Metadata } from "next";
import { PAGINATION } from "@/app/constants";
import InventoryPage from "@/app/features/operations/inventory/InventoryPage";
import { INVENTORY_FILTER_PARAM } from "@/app/features/operations/inventory/constants/InventoryFilters.constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";

export const metadata: Metadata = {
  title: INVENTORY_COPY.TITLE,
};

const InventoryRoutePage = async ({
  searchParams,
}: PageProps<"/operations/inventory">): Promise<React.JSX.Element> => {
  const resolvedSearchParams = await searchParams;

  return (
    <InventoryPage
      modeParameter={
        resolvedSearchParams[INVENTORY_FILTER_PARAM.MODE]
      }
      pageParameter={
        resolvedSearchParams[PAGINATION.QUERY_PARAMS.PAGE]
      }
      queryParameter={
        resolvedSearchParams[INVENTORY_FILTER_PARAM.QUERY]
      }
    />
  );
};

export default InventoryRoutePage;
