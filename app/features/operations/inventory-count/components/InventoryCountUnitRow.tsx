import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import { BUTTON_TYPES } from "@/app/constants";
import { INVENTORY_COUNT_UNIT_STATUSES } from "../constants/InventoryCount.constants";
import {
  INVENTORY_COUNT_COPY,
  INVENTORY_COUNT_UNIT_STATUS_COPY,
} from "../constants/InventoryCountCopy.constants";
import type { InventoryCountUnitRowProps } from "../models/InventoryCountUnitRowProps.interface";
import {
  INVENTORY_COUNT_NOTE_CLASS,
  INVENTORY_COUNT_OPTION_CLASS,
  INVENTORY_COUNT_OPTIONS_CLASS,
  INVENTORY_COUNT_UNIT_CODE_CLASS,
  INVENTORY_COUNT_UNIT_HEAD_CLASS,
  INVENTORY_COUNT_UNIT_ROW_CLASS,
} from "../styles/InventoryCount.styles";

const InventoryCountUnitRow = ({
  onSelect,
  unit,
  value,
}: InventoryCountUnitRowProps): React.JSX.Element => (
  <div className={INVENTORY_COUNT_UNIT_ROW_CLASS}>
    <div className={INVENTORY_COUNT_UNIT_HEAD_CLASS}>
      <Text className={INVENTORY_COUNT_UNIT_CODE_CLASS}>
        {unit.code}
      </Text>
      <Text className={INVENTORY_COUNT_NOTE_CLASS}>
        {INVENTORY_COUNT_COPY.SYSTEM_STATUS(
          INVENTORY_COUNT_UNIT_STATUS_COPY[unit.status]
        )}
      </Text>
    </div>
    <div
      role="group"
      aria-label={unit.code}
      className={INVENTORY_COUNT_OPTIONS_CLASS}
    >
      {INVENTORY_COUNT_UNIT_STATUSES.map((status) => (
        <Button
          key={status}
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.BASE}
          aria-pressed={value === status}
          className={
            INVENTORY_COUNT_OPTION_CLASS[
              value === status ? "selected" : "idle"
            ]
          }
          onClick={() => onSelect(status)}
        >
          {INVENTORY_COUNT_UNIT_STATUS_COPY[status]}
        </Button>
      ))}
    </div>
  </div>
);

export default InventoryCountUnitRow;
