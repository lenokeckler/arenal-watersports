import InventoryRealtimeRefresh from "./InventoryRealtimeRefresh";
import InventoryCategoryListSection from "./components/InventoryCategoryListSection";
import InventoryOverviewHeader from "./components/InventoryOverviewHeader";
import InventoryQuantityAlerts from "./components/InventoryQuantityAlerts";
import type { InventoryOverviewContentProps } from "./models/InventoryOverviewContentProps.interface";
import { INVENTORY_OVERVIEW_WRAPPER_CLASS } from "./styles/InventoryOverview.styles";

const InventoryOverviewView = ({
  inventoryPage,
  quantityAlerts,
}: InventoryOverviewContentProps): React.JSX.Element => (
  <main className={INVENTORY_OVERVIEW_WRAPPER_CLASS}>
    <InventoryRealtimeRefresh />
    <InventoryOverviewHeader />
    <InventoryQuantityAlerts alerts={quantityAlerts} />
    <InventoryCategoryListSection
      inventoryPage={inventoryPage}
    />
  </main>
);

export default InventoryOverviewView;
