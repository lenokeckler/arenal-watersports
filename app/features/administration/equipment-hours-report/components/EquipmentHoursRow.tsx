import { Text } from "@/app/components";
import { EQUIPMENT_HOURS_COPY } from "../constants/EquipmentHoursReportCopy.constants";
import type { EquipmentHoursRowProps } from "../models/EquipmentHoursComponentProps.interface";
import {
  EQUIPMENT_HOURS_BAR_FILL_CLASS,
  EQUIPMENT_HOURS_BAR_SVG_CLASS,
  EQUIPMENT_HOURS_CODE_CLASS,
  EQUIPMENT_HOURS_META_CLASS,
  EQUIPMENT_HOURS_ROW_CLASS,
  EQUIPMENT_HOURS_ROW_HEAD_CLASS,
  EQUIPMENT_HOURS_VALUE_CLASS,
} from "../styles/EquipmentHoursReport.styles";
import {
  formatEquipmentDate,
  formatEquipmentHours,
} from "../utils/formatEquipmentHours";

const FULL_WIDTH = 100;
const BAR_HEIGHT = 10;

const EquipmentHoursRow = ({
  largestHours,
  unit,
}: EquipmentHoursRowProps): React.JSX.Element => (
  <li className={EQUIPMENT_HOURS_ROW_CLASS}>
    <div className={EQUIPMENT_HOURS_ROW_HEAD_CLASS}>
      <Text className={EQUIPMENT_HOURS_CODE_CLASS}>
        {unit.code}
      </Text>
      <Text className={EQUIPMENT_HOURS_VALUE_CLASS}>
        {unit.dispatchCount === 0
          ? EQUIPMENT_HOURS_COPY.NO_USE
          : EQUIPMENT_HOURS_COPY.ROW_VALUE(
              formatEquipmentHours(unit.hours),
              unit.dispatchCount
            )}
      </Text>
    </div>
    <svg
      aria-hidden="true"
      className={EQUIPMENT_HOURS_BAR_SVG_CLASS}
      preserveAspectRatio="none"
      viewBox={`0 0 ${FULL_WIDTH} ${BAR_HEIGHT}`}
    >
      <rect
        className={EQUIPMENT_HOURS_BAR_FILL_CLASS}
        height={BAR_HEIGHT}
        width={
          largestHours === 0
            ? 0
            : (unit.hours / largestHours) * FULL_WIDTH
        }
      />
    </svg>
    {unit.lastDispatchedAt && (
      <Text className={EQUIPMENT_HOURS_META_CLASS}>
        {EQUIPMENT_HOURS_COPY.LAST_DISPATCH(
          formatEquipmentDate(unit.lastDispatchedAt)
        )}
      </Text>
    )}
  </li>
);

export default EquipmentHoursRow;
