import NewPasswordGroup from "@/app/components/new-password-group/NewPasswordGroup";
import PasswordField from "@/app/components/password-field/PasswordField";
import {
  AUTOCOMPLETE,
  PASSWORD_RECOVERY_FIELD,
} from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import type { PasswordRecoveryResetFieldsProps } from "../models/PasswordRecoveryResetFieldsProps.interface";
import PasswordRecoveryPinField from "./PasswordRecoveryPinField";
import PasswordRecoveryUsernameField from "./PasswordRecoveryUsernameField";

const PasswordRecoveryResetFields = ({
  fieldErrors,
  fieldRefs,
  isPending,
  onChange,
  passwordRules,
  showFailures,
  values,
}: PasswordRecoveryResetFieldsProps): React.JSX.Element => (
  <>
    <PasswordRecoveryUsernameField
      error={fieldErrors[PASSWORD_RECOVERY_FIELD.USERNAME]}
      inputRef={fieldRefs[PASSWORD_RECOVERY_FIELD.USERNAME]}
      isPending={isPending}
      onChange={onChange}
      value={values.username}
    />
    <PasswordRecoveryPinField
      error={fieldErrors[PASSWORD_RECOVERY_FIELD.PIN]}
      inputRef={fieldRefs[PASSWORD_RECOVERY_FIELD.PIN]}
      isPending={isPending}
      onChange={onChange}
      value={values.pin}
    />
    <NewPasswordGroup
      error={
        fieldErrors[PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]
      }
      inputRef={
        fieldRefs[PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]
      }
      isPending={isPending}
      label={
        PASSWORD_RECOVERY_RESET_COPY.NEW_PASSWORD_LABEL
      }
      onChange={onChange}
      passwordRules={passwordRules}
      placeholder={
        PASSWORD_RECOVERY_RESET_COPY.PASSWORD_PLACEHOLDER
      }
      showFailures={showFailures}
      value={values.newPassword}
    />
    <PasswordField
      autoComplete={AUTOCOMPLETE.NEW_PASSWORD}
      error={
        fieldErrors[
          PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD
        ]
      }
      inputRef={
        fieldRefs[PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD]
      }
      isPending={isPending}
      label={
        PASSWORD_RECOVERY_RESET_COPY.CONFIRM_PASSWORD_LABEL
      }
      name={PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD}
      onChange={onChange}
      placeholder={
        PASSWORD_RECOVERY_RESET_COPY.PASSWORD_PLACEHOLDER
      }
      value={values.confirmPassword}
    />
  </>
);

export default PasswordRecoveryResetFields;
