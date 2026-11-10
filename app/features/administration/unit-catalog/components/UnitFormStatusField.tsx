import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { UNIT_FORM_FIELD_ID } from "../constants/UnitFormFieldId.constants";
import { UNIT_STATUS_OPTIONS } from "../constants/UnitStatusOptions.constants";
import type { UnitFormStatusFieldProps } from "../models/UnitFormStatusFieldProps.interface";

const UnitFormStatusField = ({
  value,
  disabled,
  onChange,
}: UnitFormStatusFieldProps): React.JSX.Element => (
  <FormField
    id={UNIT_FORM_FIELD_ID.STATUS}
    name={UNIT_FORM_FIELD_ID.STATUS}
    label={UNIT_FORM_COPY.STATUS_LABEL}
    value={value}
    type={INPUT_TYPES.SELECT}
    options={UNIT_STATUS_OPTIONS}
    labelSuffix={STRING.Empty}
    onChange={onChange}
    disabled={disabled}
    variant={FORM_FIELD_VARIANT.DEFAULT}
    describedBy={UNIT_FORM_FIELD_ID.HINT}
  />
);

export default UnitFormStatusField;
