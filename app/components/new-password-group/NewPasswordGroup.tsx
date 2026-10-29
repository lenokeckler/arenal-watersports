import PasswordRulesChecklist from "@/app/components/password-rules-checklist/PasswordRulesChecklist";
import PasswordField from "@/app/components/password-field/PasswordField";
import { AUTOCOMPLETE } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import {
  NEW_PASSWORD_GROUP_DESCRIBED_BY,
  NEW_PASSWORD_GROUP_RULES_ID,
} from "./constants/NewPasswordGroup.constants";
import type { NewPasswordGroupProps } from "./models/NewPasswordGroupProps.interface";
import { NEW_PASSWORD_GROUP_CLASS } from "./styles/NewPasswordGroup.styles";

const NewPasswordGroup = ({
  passwordRules,
  showFailures,
  ...fieldProps
}: NewPasswordGroupProps): React.JSX.Element => (
  <div className={NEW_PASSWORD_GROUP_CLASS}>
    <PasswordField
      {...fieldProps}
      autoComplete={AUTOCOMPLETE.NEW_PASSWORD}
      describedBy={NEW_PASSWORD_GROUP_DESCRIBED_BY}
      name={PASSWORD_CHANGE_FIELD.NEW_PASSWORD}
    />
    <PasswordRulesChecklist
      id={NEW_PASSWORD_GROUP_RULES_ID}
      results={passwordRules}
      showFailures={showFailures}
    />
  </div>
);

export default NewPasswordGroup;
