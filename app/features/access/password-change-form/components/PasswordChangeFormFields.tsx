import { AUTOCOMPLETE } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import type { PasswordChangeFocusField } from "../models/PasswordChangeFocusField.type";
import type { PasswordChangeFormFieldsProps } from "../models/PasswordChangeFormFieldsProps.interface";
import { createPasswordChangeSharedFieldProps } from "../utils/createPasswordChangeSharedFieldProps";
import PasswordChangeNewPasswordGroup from "./PasswordChangeNewPasswordGroup";
import PasswordChangeFormField from "./PasswordChangeFormField";

const PasswordChangeFormFields = (
  props: PasswordChangeFormFieldsProps
): React.JSX.Element => {
  const sharedProps = (field: PasswordChangeFocusField) =>
    createPasswordChangeSharedFieldProps(props, field);

  return (
    <>
      <PasswordChangeFormField
        {...sharedProps(
          PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD
        )}
        autoComplete={AUTOCOMPLETE.CURRENT_PASSWORD}
        field={PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD}
        label={
          FIRST_SIGN_IN_FORM_COPY.CURRENT_PASSWORD_LABEL
        }
      />
      <PasswordChangeNewPasswordGroup
        {...sharedProps(PASSWORD_CHANGE_FIELD.NEW_PASSWORD)}
        passwordRules={props.passwordRules}
        showFailures={props.showFailures}
      />
      <PasswordChangeFormField
        {...sharedProps(
          PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
        )}
        autoComplete={AUTOCOMPLETE.NEW_PASSWORD}
        field={PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD}
        label={
          FIRST_SIGN_IN_FORM_COPY.CONFIRM_PASSWORD_LABEL
        }
      />
    </>
  );
};

export default PasswordChangeFormFields;
