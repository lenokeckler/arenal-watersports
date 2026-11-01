import { InlineText } from "@/app/components";
import { INVENTORY_UNIT_STATUS_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryUnitRowProps } from "../models/InventoryUnitRowProps.interface";
import {
  INVENTORY_UNIT_CODE_CLASS,
  INVENTORY_UNIT_ROW_CLASS,
  INVENTORY_UNIT_STATUS_CLASS,
} from "../styles/InventoryCategory.styles";

const InventoryUnitRow = ({
  unit,
}: InventoryUnitRowProps): React.JSX.Element => (
  <div className={INVENTORY_UNIT_ROW_CLASS}>
    <InlineText className={INVENTORY_UNIT_CODE_CLASS}>
      {unit.code}
    </InlineText>
    <InlineText
      className={INVENTORY_UNIT_STATUS_CLASS[unit.status]}
    >
      {INVENTORY_UNIT_STATUS_COPY[unit.status]}
    </InlineText>
  </div>
);

export default InventoryUnitRow;
