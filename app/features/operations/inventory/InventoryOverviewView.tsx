import InventoryRealtimeRefresh from "./InventoryRealtimeRefresh";
import InventoryCategoryListSection from "./components/InventoryCategoryListSection";
import InventoryOverviewHeader from "./components/InventoryOverviewHeader";
import type { InventoryOverviewViewProps } from "./models/InventoryOverviewViewProps.interface";
import { INVENTORY_OVERVIEW_WRAPPER_CLASS } from "./styles/InventoryOverview.styles";

const InventoryOverviewView = ({
  inventoryPage,
}: InventoryOverviewViewProps): React.JSX.Element => (
  <main className={INVENTORY_OVERVIEW_WRAPPER_CLASS}>
    <InventoryRealtimeRefresh />
    <InventoryOverviewHeader />
    <InventoryCategoryListSection
      inventoryPage={inventoryPage}
    />
  </main>
);

export default InventoryOverviewView;
