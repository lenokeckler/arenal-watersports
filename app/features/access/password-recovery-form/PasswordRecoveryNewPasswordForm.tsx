import { submitPasswordRecoveryNewPassword } from "./actions/submitPasswordRecoveryNewPassword";
import PasswordRecoveryNewPasswordFormView from "./PasswordRecoveryNewPasswordFormView";

const PasswordRecoveryNewPasswordForm =
  (): React.JSX.Element => (
    <PasswordRecoveryNewPasswordFormView
      action={submitPasswordRecoveryNewPassword}
    />
  );

export default PasswordRecoveryNewPasswordForm;
