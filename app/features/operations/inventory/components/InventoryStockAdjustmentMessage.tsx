import { Text } from "@/app/components";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_STOCK_ADJUSTMENT_STATUS } from "../constants/InventoryStockAdjustment.constants";
import type { InventoryStockAdjustmentMessageProps } from "../models/InventoryStockAdjustmentMessageProps.interface";
import { resolveInventoryStockMessageClassName } from "../styles/InventoryCategory.styles";

const InventoryStockAdjustmentMessage = ({
  result,
}: InventoryStockAdjustmentMessageProps): React.JSX.Element | null =>
  result ? (
    <Text
      aria-live="polite"
      className={resolveInventoryStockMessageClassName(
        result.status ===
          INVENTORY_STOCK_ADJUSTMENT_STATUS.SUCCESS
      )}
    >
      {result.message ?? INVENTORY_COPY.ADJUSTMENT_SUCCESS}
    </Text>
  ) : null;

export default InventoryStockAdjustmentMessage;
