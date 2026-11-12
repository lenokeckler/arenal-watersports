import type { Metadata } from "next";
import InventoryCountHistory from "@/app/features/operations/inventory-count-history/InventoryCountHistory";
import { INVENTORY_COUNT_HISTORY_COPY } from "@/app/features/operations/inventory-count-history/constants/InventoryCountHistoryCopy.constants";

export const metadata: Metadata = {
  title: INVENTORY_COUNT_HISTORY_COPY.HEADING,
};

const OperationsInventoryCountsPage =
  (): React.JSX.Element => <InventoryCountHistory />;

export default OperationsInventoryCountsPage;
