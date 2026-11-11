import { submitPasswordRecoveryReset } from "./actions/submitPasswordRecoveryReset";
import type { PasswordRecoveryResetFormProps } from "./models/PasswordRecoveryResetFormProps.interface";
import PasswordRecoveryResetFormView from "./PasswordRecoveryResetFormView";

const PasswordRecoveryResetForm = ({
  initialUsername,
}: PasswordRecoveryResetFormProps): React.JSX.Element => (
  <PasswordRecoveryResetFormView
    action={submitPasswordRecoveryReset}
    initialUsername={initialUsername}
  />
);

export default PasswordRecoveryResetForm;
