import { AUTOCOMPLETE } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import type { PasswordChangeFocusField } from "../models/PasswordChangeFocusField.type";
import type { PasswordChangeFormFieldsProps } from "../models/PasswordChangeFormFieldsProps.interface";
import { createPasswordChangeSharedFieldProps } from "../utils/createPasswordChangeSharedFieldProps";
import PasswordChangeNewPasswordGroup from "./PasswordChangeNewPasswordGroup";
import PasswordField from "@/app/components/password-field/PasswordField";

const PasswordChangeFormFields = (
  props: PasswordChangeFormFieldsProps
): React.JSX.Element => {
  const sharedProps = (field: PasswordChangeFocusField) =>
    createPasswordChangeSharedFieldProps(props, field);

  return (
    <>
      <PasswordField
        {...sharedProps(
          PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD
        )}
        autoComplete={AUTOCOMPLETE.CURRENT_PASSWORD}
        name={PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD}
        label={props.copy.CURRENT_PASSWORD_LABEL}
      />
      <PasswordChangeNewPasswordGroup
        {...sharedProps(PASSWORD_CHANGE_FIELD.NEW_PASSWORD)}
        label={props.copy.NEW_PASSWORD_LABEL}
        passwordRules={props.passwordRules}
        showFailures={props.showFailures}
      />
      <PasswordField
        {...sharedProps(
          PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
        )}
        autoComplete={AUTOCOMPLETE.NEW_PASSWORD}
        name={PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD}
        label={props.copy.CONFIRM_PASSWORD_LABEL}
      />
    </>
  );
};

export default PasswordChangeFormFields;
