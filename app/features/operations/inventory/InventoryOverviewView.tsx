import InventoryRealtimeRefresh from "./InventoryRealtimeRefresh";
import InventoryCategoryListSection from "./components/InventoryCategoryListSection";
import InventoryExpiryAlerts from "./components/InventoryExpiryAlerts";
import InventoryOverviewHeader from "./components/InventoryOverviewHeader";
import InventoryQuantityAlerts from "./components/InventoryQuantityAlerts";
import type { InventoryOverviewContentProps } from "./models/InventoryOverviewContentProps.interface";
import { INVENTORY_OVERVIEW_WRAPPER_CLASS } from "./styles/InventoryOverview.styles";

const InventoryOverviewView = ({
  expiryAlerts,
  inventoryPage,
  quantityAlerts,
}: InventoryOverviewContentProps): React.JSX.Element => (
  <main className={INVENTORY_OVERVIEW_WRAPPER_CLASS}>
    <InventoryRealtimeRefresh />
    <InventoryOverviewHeader />
    <InventoryQuantityAlerts alerts={quantityAlerts} />
    <InventoryExpiryAlerts alerts={expiryAlerts} />
    <InventoryCategoryListSection
      inventoryPage={inventoryPage}
    />
  </main>
);

export default InventoryOverviewView;
