import type { Metadata } from "next";
import InventoryCount from "@/app/features/operations/inventory-count/InventoryCount";
import { INVENTORY_COUNT_COPY } from "@/app/features/operations/inventory-count/constants/InventoryCountCopy.constants";

export const metadata: Metadata = {
  title: INVENTORY_COUNT_COPY.HEADING,
};

const OperationsInventoryCountNewPage =
  (): React.JSX.Element => <InventoryCount />;

export default OperationsInventoryCountNewPage;
