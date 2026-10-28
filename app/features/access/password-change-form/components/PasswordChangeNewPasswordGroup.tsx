import PasswordRulesChecklist from "@/app/components/password-rules-checklist/PasswordRulesChecklist";
import { AUTOCOMPLETE } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import {
  PASSWORD_CHANGE_NEW_PASSWORD_DESCRIBED_BY,
  PASSWORD_CHANGE_RULES_ID,
} from "../constants/PasswordChangeRules.constants";
import type { PasswordChangeNewPasswordGroupProps } from "../models/PasswordChangeNewPasswordGroupProps.interface";
import { PASSWORD_CHANGE_NEW_GROUP_CLASS } from "../styles/PasswordChangeForm.styles";
import PasswordField from "@/app/components/password-field/PasswordField";

const PasswordChangeNewPasswordGroup = ({
  passwordRules,
  showFailures,
  ...fieldProps
}: PasswordChangeNewPasswordGroupProps): React.JSX.Element => (
  <div className={PASSWORD_CHANGE_NEW_GROUP_CLASS}>
    <PasswordField
      {...fieldProps}
      autoComplete={AUTOCOMPLETE.NEW_PASSWORD}
      describedBy={
        PASSWORD_CHANGE_NEW_PASSWORD_DESCRIBED_BY
      }
      name={PASSWORD_CHANGE_FIELD.NEW_PASSWORD}
    />
    <PasswordRulesChecklist
      id={PASSWORD_CHANGE_RULES_ID}
      results={passwordRules}
      showFailures={showFailures}
    />
  </div>
);

export default PasswordChangeNewPasswordGroup;
