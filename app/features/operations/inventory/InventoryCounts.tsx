import { InlineText, Text } from "@/app/components";
import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import { INVENTORY_COPY } from "./constants/InventoryCopy.constants";
import type { InventoryCountItemProps } from "./models/InventoryCountItemProps.interface";
import type { InventoryCountsProps } from "./models/InventoryCountsProps.interface";
import {
  INVENTORY_COUNT_CLASS,
  INVENTORY_COUNT_LABEL_CLASS,
  INVENTORY_COUNT_VALUE_CLASS,
  INVENTORY_COUNTS_GRID_CLASS,
} from "./styles/InventoryCounts.styles";

const InventoryCountItem = ({
  label,
  value,
}: InventoryCountItemProps): React.JSX.Element => (
  <div className={INVENTORY_COUNT_CLASS}>
    <InlineText className={INVENTORY_COUNT_VALUE_CLASS}>
      {value}
    </InlineText>
    <Text className={INVENTORY_COUNT_LABEL_CLASS}>
      {label}
    </Text>
  </div>
);

const InventoryCounts = ({
  category,
}: InventoryCountsProps): React.JSX.Element => (
  <div
    className={
      INVENTORY_COUNTS_GRID_CLASS[category.trackingMode]
    }
  >
    <InventoryCountItem
      label={INVENTORY_COPY.AVAILABLE}
      value={category.available}
    />
    <InventoryCountItem
      label={INVENTORY_COPY.DAMAGED}
      value={category.damaged}
    />
    {category.trackingMode ===
    INVENTORY_TRACKING_MODE.BY_UNIT ? (
      <InventoryCountItem
        label={INVENTORY_COPY.IN_MAINTENANCE}
        value={category.inMaintenance}
      />
    ) : null}
    <InventoryCountItem
      label={INVENTORY_COPY.IN_REPAIR}
      value={category.inRepair}
    />
    <InventoryCountItem
      label={INVENTORY_COPY.TOTAL}
      value={category.total}
    />
  </div>
);

export default InventoryCounts;
