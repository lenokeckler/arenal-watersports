import { FormField } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import type { FirstSignInPasswordFieldProps } from "../models/FirstSignInPasswordFieldProps.interface";

const FirstSignInPasswordField = ({
  autoComplete,
  describedBy,
  error,
  field,
  inputRef,
  isPending,
  label,
  onChange,
  value,
}: FirstSignInPasswordFieldProps): React.JSX.Element => (
  <FormField
    id={field}
    name={field}
    label={label}
    placeholder={
      FIRST_SIGN_IN_FORM_COPY.PASSWORD_PLACEHOLDER
    }
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

export default FirstSignInPasswordField;
