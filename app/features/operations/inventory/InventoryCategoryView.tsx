import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import InventoryRealtimeRefresh from "./InventoryRealtimeRefresh";
import InventoryCategoryHeader from "./components/InventoryCategoryHeader";
import InventoryUnitListSection from "./components/InventoryUnitListSection";
import type { InventoryCategoryViewProps } from "./models/InventoryCategoryViewProps.interface";
import { INVENTORY_CATEGORY_WRAPPER_CLASS } from "./styles/InventoryCategory.styles";

const InventoryCategoryView = ({
  categoryDetails,
}: InventoryCategoryViewProps): React.JSX.Element => (
  <main className={INVENTORY_CATEGORY_WRAPPER_CLASS}>
    <InventoryRealtimeRefresh />
    <InventoryCategoryHeader
      category={categoryDetails.category}
    />
    {categoryDetails.category.trackingMode ===
      INVENTORY_TRACKING_MODE.BY_UNIT &&
    "units" in categoryDetails ? (
      <InventoryUnitListSection
        category={categoryDetails.category}
        inventoryPage={categoryDetails.units}
      />
    ) : null}
  </main>
);

export default InventoryCategoryView;
