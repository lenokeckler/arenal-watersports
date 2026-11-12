import type { InventoryOverviewViewProps } from "./InventoryOverviewViewProps.interface";
import type { InventoryQuantityAlert } from "./InventoryQuantityAlert.interface";

export interface InventoryOverviewContentProps extends InventoryOverviewViewProps {
  quantityAlerts: InventoryQuantityAlert[];
}
