import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  FORM_GROUP_CLASS,
  FORM_HINT_CLASS,
} from "@/app/components/form-layout/styles/FormLayout.styles";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { PASSWORD_RECOVERY_PIN_HINT_ID } from "../constants/PasswordRecoveryFieldIds.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import type { PasswordRecoveryFieldProps } from "../models/PasswordRecoveryFieldProps.interface";
import { PASSWORD_RECOVERY_PIN_INPUT_CLASS } from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryPinField = ({
  error,
  inputRef,
  isPending,
  onChange,
  value,
}: PasswordRecoveryFieldProps): React.JSX.Element => (
  <div className={FORM_GROUP_CLASS}>
    <FormField
      id={PASSWORD_RECOVERY_FIELD.PIN}
      name={PASSWORD_RECOVERY_FIELD.PIN}
      label={PASSWORD_RECOVERY_RESET_COPY.PIN_LABEL}
      type={INPUT_TYPES.TEXT}
      variant={FORM_FIELD_VARIANT.GLASS}
      labelSuffix={STRING.Empty}
      autoComplete={AUTOCOMPLETE.ONE_TIME_CODE}
      inputMode={INPUT_MODE.NUMERIC}
      autoCapitalize={AUTOCAPITALIZE.NONE}
      spellCheck={false}
      classNameField={PASSWORD_RECOVERY_PIN_INPUT_CLASS}
      describedBy={PASSWORD_RECOVERY_PIN_HINT_ID}
      value={value}
      onChange={onChange}
      error={error ?? undefined}
      reference={inputRef}
      readOnly={isPending}
      showErrorText
    />
    <Text
      id={PASSWORD_RECOVERY_PIN_HINT_ID}
      className={FORM_HINT_CLASS}
    >
      {PASSWORD_RECOVERY_RESET_COPY.PIN_HINT}
    </Text>
  </div>
);

export default PasswordRecoveryPinField;
