import type { InventoryStockManagementSectionProps } from "../models/InventoryStockManagementSectionProps.interface";
import InventoryStockAdjustmentForm from "./InventoryStockAdjustmentForm";
import InventoryStockMovementHistorySection from "./InventoryStockMovementHistorySection";

const InventoryStockManagementSection = ({
  category,
  movementPage,
}: InventoryStockManagementSectionProps): React.JSX.Element => (
  <>
    <InventoryStockAdjustmentForm
      key={category.id}
      category={category}
    />
    <InventoryStockMovementHistorySection
      categoryId={category.id}
      movementPage={movementPage}
    />
  </>
);

export default InventoryStockManagementSection;
