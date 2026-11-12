import type { InventoryExpiryAlert } from "./InventoryExpiryAlert.interface";
import type { InventoryOverviewViewProps } from "./InventoryOverviewViewProps.interface";
import type { InventoryQuantityAlert } from "./InventoryQuantityAlert.interface";

export interface InventoryOverviewContentProps extends InventoryOverviewViewProps {
  expiryAlerts: InventoryExpiryAlert[];
  quantityAlerts: InventoryQuantityAlert[];
}
