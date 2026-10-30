import { INPUT_MODE } from "@/app/constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { UNIT_FORM_FIELD_ID } from "../constants/UnitFormFieldId.constants";
import type { UnitFormFieldListProps } from "../models/UnitFormFieldListProps.interface";
import UnitFormMotorFields from "./UnitFormMotorFields";
import UnitFormStatusField from "./UnitFormStatusField";
import UnitFormTextField from "./UnitFormTextField";

const UnitFormFields = ({
  values,
  errors,
  category,
  isDisabled,
  onCodeChange,
  onStatusChange,
  onFuelMaxChange,
  ...motorHandlers
}: UnitFormFieldListProps): React.JSX.Element => (
  <>
    <UnitFormTextField
      id={UNIT_FORM_FIELD_ID.CODE}
      isRequired
      label={UNIT_FORM_COPY.CODE_LABEL}
      placeholder={UNIT_FORM_COPY.CODE_PLACEHOLDER}
      value={values.code}
      error={errors.code}
      disabled={isDisabled}
      onChange={onCodeChange}
    />
    <UnitFormStatusField
      value={values.status}
      disabled={isDisabled}
      onChange={onStatusChange}
    />
    <UnitFormTextField
      id={UNIT_FORM_FIELD_ID.FUEL_MAX}
      isRequired
      label={UNIT_FORM_COPY.FUEL_MAX_LABEL}
      inputMode={INPUT_MODE.NUMERIC}
      value={values.fuelMax}
      error={errors.fuelMax}
      disabled={isDisabled}
      onChange={onFuelMaxChange}
    />
    {category.hasMotor && (
      <UnitFormMotorFields
        {...motorHandlers}
        values={values}
        errors={errors}
        usageMetric={category.usageMetric}
        disabled={isDisabled}
      />
    )}
  </>
);

export default UnitFormFields;
