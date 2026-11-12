import FormField from "@/app/components/form-field/FormField";
import { INPUT_TYPES, STRING } from "@/app/constants";
import {
  INVENTORY_COUNT_FIELD_ID,
  INVENTORY_COUNT_UNIT_STATUSES,
} from "../constants/InventoryCount.constants";
import { INVENTORY_COUNT_UNIT_STATUS_COPY } from "../constants/InventoryCountCopy.constants";
import type { InventoryCountUnitRowProps } from "../models/InventoryCountUnitRowProps.interface";

const STATUS_OPTIONS = INVENTORY_COUNT_UNIT_STATUSES.map(
  (status) => ({
    key: status,
    label: INVENTORY_COUNT_UNIT_STATUS_COPY[status],
    value: status,
  })
);

const InventoryCountUnitRow = ({
  onChange,
  unit,
  value,
}: InventoryCountUnitRowProps): React.JSX.Element => (
  <FormField
    id={INVENTORY_COUNT_FIELD_ID.UNIT(unit.id)}
    name={INVENTORY_COUNT_FIELD_ID.UNIT(unit.id)}
    label={unit.code}
    labelSuffix={STRING.Empty}
    type={INPUT_TYPES.SELECT}
    value={value}
    onChange={onChange}
    options={STATUS_OPTIONS}
  />
);

export default InventoryCountUnitRow;
