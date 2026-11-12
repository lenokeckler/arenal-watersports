import { submitPasswordRecoveryRequest } from "./actions/submitPasswordRecoveryRequest";
import PasswordRecoveryRequestFormView from "./PasswordRecoveryRequestFormView";

const PasswordRecoveryRequestForm =
  (): React.JSX.Element => (
    <PasswordRecoveryRequestFormView
      action={submitPasswordRecoveryRequest}
    />
  );

export default PasswordRecoveryRequestForm;
