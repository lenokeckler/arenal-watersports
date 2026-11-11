import { FormField } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_TYPES,
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import type { PasswordRecoveryFieldProps } from "../models/PasswordRecoveryFieldProps.interface";

const PasswordRecoveryUsernameField = ({
  error,
  inputRef,
  isPending,
  onChange,
  value,
}: PasswordRecoveryFieldProps): React.JSX.Element => (
  <FormField
    id={PASSWORD_RECOVERY_FIELD.USERNAME}
    name={PASSWORD_RECOVERY_FIELD.USERNAME}
    label={PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_LABEL}
    placeholder={
      PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_PLACEHOLDER
    }
    type={INPUT_TYPES.TEXT}
    variant={FORM_FIELD_VARIANT.GLASS}
    labelSuffix={STRING.Empty}
    autoComplete={AUTOCOMPLETE.USERNAME}
    autoCapitalize={AUTOCAPITALIZE.NONE}
    spellCheck={false}
    value={value}
    onChange={onChange}
    error={error ?? undefined}
    reference={inputRef}
    readOnly={isPending}
    showErrorText
  />
);

export default PasswordRecoveryUsernameField;
