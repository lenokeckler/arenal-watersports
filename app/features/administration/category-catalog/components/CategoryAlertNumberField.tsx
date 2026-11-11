import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { CATEGORY_ALERT_FORM_FIELD_ID } from "../constants/CategoryAlertFormFieldId.constants";
import type { CategoryAlertNumberFieldProps } from "../models/CategoryAlertNumberFieldProps.interface";

const CategoryAlertNumberField = ({
  id,
  label,
  placeholder,
  value,
  error,
  disabled,
  onChange,
}: CategoryAlertNumberFieldProps): React.JSX.Element => (
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
    variant={FORM_FIELD_VARIANT.DEFAULT}
    autoComplete={AUTOCOMPLETE.OFF}
    inputMode={INPUT_MODE.NUMERIC}
    describedBy={CATEGORY_ALERT_FORM_FIELD_ID.HINT}
    spellCheck={false}
  />
);

export default CategoryAlertNumberField;
