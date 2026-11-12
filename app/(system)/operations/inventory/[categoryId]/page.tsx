import type { Metadata } from "next";
import { PAGINATION } from "@/app/constants";
import InventoryCategoryPage from "@/app/features/operations/inventory/InventoryCategoryPage";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";

export const metadata: Metadata = {
  title: INVENTORY_COPY.TITLE,
};

const InventoryCategoryRoutePage = async ({
  params,
  searchParams,
}: PageProps<"/operations/inventory/[categoryId]">): Promise<React.JSX.Element> => {
  const [{ categoryId }, resolvedSearchParams] =
    await Promise.all([params, searchParams]);

  return (
    <InventoryCategoryPage
      categoryId={categoryId}
      pageParameter={
        resolvedSearchParams[PAGINATION.QUERY_PARAMS.PAGE]
      }
    />
  );
};

export default InventoryCategoryRoutePage;
