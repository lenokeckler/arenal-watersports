import { AUTOCOMPLETE } from "@/app/constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import type { FirstSignInFocusField } from "../models/FirstSignInFocusField.type";
import type { FirstSignInFormFieldsProps } from "../models/FirstSignInFormFieldsProps.interface";
import { createFirstSignInSharedFieldProps } from "../utils/createFirstSignInSharedFieldProps";
import FirstSignInNewPasswordGroup from "./FirstSignInNewPasswordGroup";
import FirstSignInPasswordField from "./FirstSignInPasswordField";

const FirstSignInFormFields = (
  props: FirstSignInFormFieldsProps
): React.JSX.Element => {
  const sharedProps = (field: FirstSignInFocusField) =>
    createFirstSignInSharedFieldProps(props, field);

  return (
    <>
      <FirstSignInPasswordField
        {...sharedProps(
          FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD
        )}
        autoComplete={AUTOCOMPLETE.CURRENT_PASSWORD}
        field={FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD}
        label={
          FIRST_SIGN_IN_FORM_COPY.CURRENT_PASSWORD_LABEL
        }
      />
      <FirstSignInNewPasswordGroup
        {...sharedProps(FIRST_SIGN_IN_FIELD.NEW_PASSWORD)}
        passwordRules={props.passwordRules}
        showFailures={props.showFailures}
      />
      <FirstSignInPasswordField
        {...sharedProps(
          FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD
        )}
        autoComplete={AUTOCOMPLETE.NEW_PASSWORD}
        field={FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD}
        label={
          FIRST_SIGN_IN_FORM_COPY.CONFIRM_PASSWORD_LABEL
        }
      />
    </>
  );
};

export default FirstSignInFormFields;
