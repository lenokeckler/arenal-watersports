import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryResetFieldsProps } from "../models/PasswordRecoveryResetFieldsProps.interface";
import PasswordRecoveryPinField from "./PasswordRecoveryPinField";
import PasswordRecoveryUsernameField from "./PasswordRecoveryUsernameField";

const PasswordRecoveryResetFields = ({
  fieldErrors,
  fieldRefs,
  isPending,
  onChange,
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
  </>
);

export default PasswordRecoveryResetFields;
