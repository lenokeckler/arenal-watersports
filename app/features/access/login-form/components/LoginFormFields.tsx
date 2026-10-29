import { FormField } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import type { LoginFormFieldsProps } from "../models/LoginFormFieldsProps.interface";

const LoginFormFields = ({
  fieldRefs,
  onPasswordChange,
  onUsernameChange,
  passwordError,
  usernameError,
  values,
}: LoginFormFieldsProps): React.JSX.Element => (
  <>
    <FormField
      id={SIGN_IN_FIELD.USERNAME}
      name={SIGN_IN_FIELD.USERNAME}
      label={LOGIN_FORM_COPY.USERNAME_LABEL}
      placeholder={LOGIN_FORM_COPY.USERNAME_PLACEHOLDER}
      type={INPUT_TYPES.TEXT}
      variant={FORM_FIELD_VARIANT.GLASS}
      labelSuffix={STRING.Empty}
      value={values.username}
      onChange={onUsernameChange}
      error={usernameError}
      reference={fieldRefs[SIGN_IN_FIELD.USERNAME]}
      showErrorText
    />
    <FormField
      id={SIGN_IN_FIELD.PASSWORD}
      name={SIGN_IN_FIELD.PASSWORD}
      label={LOGIN_FORM_COPY.PASSWORD_LABEL}
      placeholder={LOGIN_FORM_COPY.PASSWORD_PLACEHOLDER}
      type={INPUT_TYPES.PASSWORD}
      variant={FORM_FIELD_VARIANT.GLASS}
      labelSuffix={STRING.Empty}
      value={values.password}
      onChange={onPasswordChange}
      error={passwordError}
      reference={fieldRefs[SIGN_IN_FIELD.PASSWORD]}
      showErrorText
    />
  </>
);

export default LoginFormFields;
