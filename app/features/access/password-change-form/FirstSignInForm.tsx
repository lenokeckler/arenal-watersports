import { submitFirstPasswordChange } from "./actions/submitFirstPasswordChange";
import PasswordChangeFormView from "./PasswordChangeFormView";

const FirstSignInForm = (): React.JSX.Element => (
  <PasswordChangeFormView
    action={submitFirstPasswordChange}
  />
);

export default FirstSignInForm;
