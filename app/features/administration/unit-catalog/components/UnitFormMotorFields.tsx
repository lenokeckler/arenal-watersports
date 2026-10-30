import { INPUT_MODE } from "@/app/constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { UNIT_FORM_FIELD_ID } from "../constants/UnitFormFieldId.constants";
import { UNIT_USAGE_FIELD_LABEL } from "../constants/UnitUsageFieldLabel.constants";
import type { UnitFormMotorFieldsProps } from "../models/UnitFormMotorFieldsProps.interface";
import UnitFormTextField from "./UnitFormTextField";

const UnitFormMotorFields = ({
  values,
  errors,
  usageMetric,
  disabled,
  onFuelLevelChange,
  onUsageTotalChange,
  onNextOilChangeAtChange,
}: UnitFormMotorFieldsProps): React.JSX.Element => (
  <>
    <UnitFormTextField
      id={UNIT_FORM_FIELD_ID.FUEL_LEVEL}
      label={UNIT_FORM_COPY.FUEL_LEVEL_LABEL}
      placeholder={UNIT_FORM_COPY.FUEL_LEVEL_PLACEHOLDER}
      inputMode={INPUT_MODE.NUMERIC}
      value={values.fuelLevel}
      error={errors.fuelLevel}
      disabled={disabled}
      onChange={onFuelLevelChange}
    />
    <UnitFormTextField
      id={UNIT_FORM_FIELD_ID.USAGE_TOTAL}
      label={
        usageMetric
          ? UNIT_USAGE_FIELD_LABEL[usageMetric]
          : UNIT_FORM_COPY.USAGE_FALLBACK_LABEL
      }
      inputMode={INPUT_MODE.DECIMAL}
      value={values.usageTotal}
      error={errors.usageTotal}
      disabled={disabled}
      onChange={onUsageTotalChange}
    />
    <UnitFormTextField
      id={UNIT_FORM_FIELD_ID.NEXT_OIL_CHANGE_AT}
      label={UNIT_FORM_COPY.NEXT_OIL_CHANGE_LABEL}
      inputMode={INPUT_MODE.DECIMAL}
      value={values.nextOilChangeAt}
      error={errors.nextOilChangeAt}
      disabled={disabled}
      onChange={onNextOilChangeAtChange}
    />
  </>
);

export default UnitFormMotorFields;
