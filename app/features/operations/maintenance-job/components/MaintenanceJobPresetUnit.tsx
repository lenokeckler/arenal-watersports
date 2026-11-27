import Text from "@/app/components/text/Text";
import { MAINTENANCE_JOB_COPY } from "../constants/MaintenanceJobCopy.constants";
import type { MaintenanceJobPresetUnitProps } from "../models/MaintenanceJobPresetUnitProps.interface";
import {
  MAINTENANCE_JOB_PRESET_UNIT_CLASS,
  MAINTENANCE_JOB_PRESET_UNIT_LABEL_CLASS,
  MAINTENANCE_JOB_PRESET_UNIT_ROW_CLASS,
  MAINTENANCE_JOB_PRESET_UNIT_VALUE_CLASS,
} from "../styles/MaintenanceJob.styles";

const MaintenanceJobPresetUnit = ({
  unit,
}: MaintenanceJobPresetUnitProps): React.JSX.Element => (
  <div className={MAINTENANCE_JOB_PRESET_UNIT_CLASS}>
    <Text
      className={MAINTENANCE_JOB_PRESET_UNIT_LABEL_CLASS}
    >
      {MAINTENANCE_JOB_COPY.UNIT_LABEL}
    </Text>
    <div
      className={MAINTENANCE_JOB_PRESET_UNIT_VALUE_CLASS}
    >
      <Text
        className={MAINTENANCE_JOB_PRESET_UNIT_ROW_CLASS}
      >
        {`${unit.code}${MAINTENANCE_JOB_COPY.UNIT_SEPARATOR}${unit.categoryName}`}
      </Text>
      {unit.usageMetric !== null && (
        <Text
          className={MAINTENANCE_JOB_PRESET_UNIT_ROW_CLASS}
        >
          {`${unit.usageTotal}${MAINTENANCE_JOB_COPY.USAGE_UNIT[unit.usageMetric]}`}
        </Text>
      )}
    </div>
  </div>
);

export default MaintenanceJobPresetUnit;
