import FormField from "../form-field/FormField";
import { FORM_FIELD_VARIANT } from "../form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import type { PasswordFieldProps } from "./models/PasswordFieldProps.interface";

const PasswordField = ({
  autoComplete,
  describedBy,
  error,
  inputRef,
  isPending,
  label,
  name,
  onChange,
  placeholder,
  value,
}: PasswordFieldProps): React.JSX.Element => (
  <FormField
    id={name}
    name={name}
    label={label}
    placeholder={placeholder}
    type={INPUT_TYPES.PASSWORD}
    variant={FORM_FIELD_VARIANT.GLASS}
    labelSuffix={STRING.Empty}
    autoComplete={autoComplete}
    describedBy={describedBy}
    value={value}
    onChange={onChange}
    error={error ?? undefined}
    reference={inputRef}
    readOnly={isPending}
    showErrorText
  />
);

export default PasswordField;
