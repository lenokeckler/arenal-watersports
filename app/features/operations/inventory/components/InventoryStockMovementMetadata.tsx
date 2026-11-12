import { Text } from "@/app/components";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryStockMovementMetadataProps } from "../models/InventoryStockMovementMetadataProps.interface";
import { INVENTORY_MOVEMENT_DETAILS_CLASS } from "../styles/InventoryCategory.styles";
import { INVENTORY_STOCK_ADJUSTMENT_REASON_LABELS } from "../constants/InventoryStockAdjustmentOptions.constants";
import { formatInventoryStockMovementDate } from "../utils/formatInventoryStockMovementDate";

const InventoryStockMovementMetadata = ({
  movement,
}: InventoryStockMovementMetadataProps): React.JSX.Element => (
  <div className={INVENTORY_MOVEMENT_DETAILS_CLASS}>
    <Text>
      {INVENTORY_COPY.MOVEMENT_DATE}:{" "}
      {formatInventoryStockMovementDate(movement.createdAt)}
    </Text>
    <Text>
      {INVENTORY_COPY.MOVEMENT_REASON}:{" "}
      {INVENTORY_STOCK_ADJUSTMENT_REASON_LABELS[
        movement.reason
      ] ?? movement.reason}
    </Text>
    <Text>
      {INVENTORY_COPY.MOVEMENT_AUTHOR}: {movement.actorName}
    </Text>
  </div>
);

export default InventoryStockMovementMetadata;
