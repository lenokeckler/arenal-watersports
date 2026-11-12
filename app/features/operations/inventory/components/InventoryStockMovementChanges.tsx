import { UnorderedList } from "@/app/components";
import { UNORDERED_LIST } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryStockMovementChangesProps } from "../models/InventoryStockMovementChangesProps.interface";
import { INVENTORY_MOVEMENT_CHANGE_CLASS } from "../styles/InventoryCategory.styles";

const InventoryStockMovementChanges = ({
  movement,
}: InventoryStockMovementChangesProps): React.JSX.Element => (
  <UnorderedList
    variant={UNORDERED_LIST.VARIANTS.PLAIN}
    className={INVENTORY_MOVEMENT_CHANGE_CLASS}
    items={[
      `${INVENTORY_COPY.MOVEMENT_AVAILABLE}: ${movement.availableFrom} → ${movement.availableTo}`,
      `${INVENTORY_COPY.MOVEMENT_DAMAGED}: ${movement.damagedFrom} → ${movement.damagedTo}`,
      `${INVENTORY_COPY.MOVEMENT_REPAIR}: ${movement.inRepairFrom} → ${movement.inRepairTo}`,
    ]}
  />
);

export default InventoryStockMovementChanges;
