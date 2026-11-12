import NewPasswordGroup from "@/app/components/new-password-group/NewPasswordGroup";
import PasswordField from "@/app/components/password-field/PasswordField";
import {
  AUTOCOMPLETE,
  PASSWORD_RECOVERY_FIELD,
} from "@/app/constants";
import { PASSWORD_RECOVERY_NEW_PASSWORD_COPY } from "../constants/PasswordRecoveryNewPasswordCopy.constants";
import type { PasswordRecoveryNewPasswordFieldsProps } from "../models/PasswordRecoveryNewPasswordFieldsProps.interface";

const PasswordRecoveryNewPasswordFields = ({
  fieldErrors,
  fieldRefs,
  isPending,
  onChange,
  passwordRules,
  showFailures,
  values,
}: PasswordRecoveryNewPasswordFieldsProps): React.JSX.Element => (
  <>
    <NewPasswordGroup
      error={
        fieldErrors[PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]
      }
      inputRef={
        fieldRefs[PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]
      }
      isPending={isPending}
      label={
        PASSWORD_RECOVERY_NEW_PASSWORD_COPY.NEW_PASSWORD_LABEL
      }
      onChange={onChange}
      passwordRules={passwordRules}
      placeholder={
        PASSWORD_RECOVERY_NEW_PASSWORD_COPY.PASSWORD_PLACEHOLDER
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
        PASSWORD_RECOVERY_NEW_PASSWORD_COPY.CONFIRM_PASSWORD_LABEL
      }
      name={PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD}
      onChange={onChange}
      placeholder={
        PASSWORD_RECOVERY_NEW_PASSWORD_COPY.PASSWORD_PLACEHOLDER
      }
      value={values.confirmPassword}
    />
  </>
);

export default PasswordRecoveryNewPasswordFields;
