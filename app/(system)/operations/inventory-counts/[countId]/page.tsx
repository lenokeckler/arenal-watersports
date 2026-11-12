import type { Metadata } from "next";
import InventoryCountDetailView from "@/app/features/operations/inventory-count-history/InventoryCountDetailView";
import { INVENTORY_COUNT_HISTORY_COPY } from "@/app/features/operations/inventory-count-history/constants/InventoryCountHistoryCopy.constants";

export const metadata: Metadata = {
  title: INVENTORY_COUNT_HISTORY_COPY.HEADING,
};

const OperationsInventoryCountPage = async ({
  params,
}: PageProps<"/operations/inventory-counts/[countId]">): Promise<React.JSX.Element> => {
  const { countId } = await params;

  return <InventoryCountDetailView countId={countId} />;
};

export default OperationsInventoryCountPage;
