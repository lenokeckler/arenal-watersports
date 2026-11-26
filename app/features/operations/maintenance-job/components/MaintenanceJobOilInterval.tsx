import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import {
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  MAINTENANCE_JOB_COPY,
  MAINTENANCE_JOB_FIELD_ID,
} from "../constants/MaintenanceJobCopy.constants";
import type { MaintenanceJobOilIntervalProps } from "../models/MaintenanceJobOilIntervalProps.interface";
import {
  MAINTENANCE_JOB_NOTE_CLASS,
  MAINTENANCE_JOB_OIL_FIELD_CLASS,
  MAINTENANCE_JOB_OIL_UNIT_CLASS,
} from "../styles/MaintenanceJob.styles";
import { resolveNextOilChangeText } from "../utils/resolveNextOilChangeText";

const MaintenanceJobOilInterval = ({
  error,
  onChange,
  unit,
  value,
}: MaintenanceJobOilIntervalProps): React.JSX.Element => {
  const metric = unit?.usageMetric ?? null;
  const result = resolveNextOilChangeText(unit, value);

  return (
    <>
      <div className={MAINTENANCE_JOB_OIL_FIELD_CLASS}>
        <FormField
          id={MAINTENANCE_JOB_FIELD_ID.NEXT_OIL_CHANGE}
          name={MAINTENANCE_JOB_FIELD_ID.NEXT_OIL_CHANGE}
          label={MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.DECIMAL}
          placeholder={
            metric === null
              ? undefined
              : MAINTENANCE_JOB_COPY
                  .NEXT_OIL_CHANGE_PLACEHOLDER[metric]
          }
          value={value}
          error={error ?? undefined}
          showErrorText
          onChange={onChange}
        />
        {metric !== null && (
          <Text className={MAINTENANCE_JOB_OIL_UNIT_CLASS}>
            {MAINTENANCE_JOB_COPY.USAGE_UNIT[metric].trim()}
          </Text>
        )}
      </div>
      {result !== null && (
        <Text className={MAINTENANCE_JOB_NOTE_CLASS}>
          {result}
        </Text>
      )}
    </>
  );
};

export default MaintenanceJobOilInterval;
