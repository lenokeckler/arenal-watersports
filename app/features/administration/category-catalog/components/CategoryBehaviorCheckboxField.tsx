import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import type { CategoryBehaviorCheckboxFieldProps } from "../models/CategoryBehaviorCheckboxFieldProps.interface";

const CategoryBehaviorCheckboxField = ({
  id,
  label,
  checked,
  disabled,
  onChange,
}: CategoryBehaviorCheckboxFieldProps): React.JSX.Element => (
  <FormField
    id={id}
    name={id}
    label={label}
    value={label}
    type={INPUT_TYPES.CHECKBOX}
    checked={checked}
    labelSuffix={STRING.Empty}
    onChange={onChange}
    disabled={disabled}
    variant={FORM_FIELD_VARIANT.DEFAULT}
  />
);

export default CategoryBehaviorCheckboxField;
