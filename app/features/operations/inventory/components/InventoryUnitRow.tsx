import { InlineText } from "@/app/components";
import { INVENTORY_UNIT_STATUS_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryUnitRowProps } from "../models/InventoryUnitRowProps.interface";
import {
  INVENTORY_UNIT_CODE_CLASS,
  INVENTORY_UNIT_ROW_CLASS,
  INVENTORY_UNIT_STATUS_CLASS,
} from "../styles/InventoryCategory.styles";
import InventoryUnitConditionControl from "./InventoryUnitConditionControl";

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
    <InventoryUnitConditionControl
      status={unit.status}
      unitId={unit.id}
    />
  </div>
);

export default InventoryUnitRow;
