import type { InventoryStockManagementSectionProps } from "../models/InventoryStockManagementSectionProps.interface";
import InventoryStockAdjustmentForm from "./InventoryStockAdjustmentForm";

const InventoryStockManagementSection = ({
  category,
}: InventoryStockManagementSectionProps): React.JSX.Element => (
  <>
    <InventoryStockAdjustmentForm
      key={category.id}
      category={category}
    />
  </>
);

export default InventoryStockManagementSection;
