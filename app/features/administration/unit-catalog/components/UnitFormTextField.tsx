import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { UNIT_FORM_FIELD_ID } from "../constants/UnitFormFieldId.constants";
import type { UnitFormTextFieldProps } from "../models/UnitFormTextFieldProps.interface";

const UnitFormTextField = ({
  id,
  label,
  value,
  error,
  placeholder,
  inputMode,
  disabled,
  isRequired = false,
  onChange,
}: UnitFormTextFieldProps): React.JSX.Element => (
  <FormField
    id={id}
    name={id}
    label={label}
    value={value}
    type={INPUT_TYPES.TEXT}
    placeholder={placeholder}
    onChange={onChange}
    error={error}
    showErrorText
    disabled={disabled}
    labelSuffix={isRequired ? undefined : STRING.Empty}
    variant={FORM_FIELD_VARIANT.DEFAULT}
    autoComplete={AUTOCOMPLETE.OFF}
    inputMode={inputMode}
    describedBy={UNIT_FORM_FIELD_ID.HINT}
    spellCheck={false}
  />
);

export default UnitFormTextField;
