import type { PasswordRecoveryResetFormProps } from "./PasswordRecoveryResetFormProps.interface";
import type { PasswordRecoveryServerAction } from "./PasswordRecoveryServerAction.type";

export interface PasswordRecoveryResetFormViewProps extends PasswordRecoveryResetFormProps {
  action: PasswordRecoveryServerAction;
}
