import PasswordRulesChecklist from "@/app/components/password-rules-checklist/PasswordRulesChecklist";
import { AUTOCOMPLETE } from "@/app/constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import {
  FIRST_SIGN_IN_NEW_PASSWORD_DESCRIBED_BY,
  FIRST_SIGN_IN_RULES_ID,
} from "../constants/FirstSignInRules.constants";
import type { FirstSignInNewPasswordGroupProps } from "../models/FirstSignInNewPasswordGroupProps.interface";
import { FIRST_SIGN_IN_NEW_GROUP_CLASS } from "../styles/FirstSignInForm.styles";
import FirstSignInPasswordField from "./FirstSignInPasswordField";

const FirstSignInNewPasswordGroup = ({
  passwordRules,
  showFailures,
  ...fieldProps
}: FirstSignInNewPasswordGroupProps): React.JSX.Element => (
  <div className={FIRST_SIGN_IN_NEW_GROUP_CLASS}>
    <FirstSignInPasswordField
      {...fieldProps}
      autoComplete={AUTOCOMPLETE.NEW_PASSWORD}
      describedBy={FIRST_SIGN_IN_NEW_PASSWORD_DESCRIBED_BY}
      field={FIRST_SIGN_IN_FIELD.NEW_PASSWORD}
      label={FIRST_SIGN_IN_FORM_COPY.NEW_PASSWORD_LABEL}
    />
    <PasswordRulesChecklist
      id={FIRST_SIGN_IN_RULES_ID}
      results={passwordRules}
      showFailures={showFailures}
    />
  </div>
);

export default FirstSignInNewPasswordGroup;
