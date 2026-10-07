"use client";

import { FormField } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import LoginFormBanner from "./components/LoginFormBanner";
import LoginFormSubmit from "./components/LoginFormSubmit";
import { LOGIN_FORM_COPY } from "./constants/LoginFormCopy.constants";
import { useLoginFormViewModel } from "./hooks/useLoginFormViewModel";
import { LOGIN_FORM_CLASS } from "./styles/LoginForm.styles";

const LoginFormView = (): React.JSX.Element => {
  const {
    fieldErrors,
    formAction,
    handlePasswordChange,
    handleSubmit,
    handleUsernameChange,
    isPending,
    passwordError,
    usernameError,
    values,
  } = useLoginFormViewModel();

  return (
    <>
      <LoginFormBanner
        message={fieldErrors[SIGN_IN_FIELD.FORM]}
      />
      <form
        noValidate
        action={formAction}
        onSubmit={handleSubmit}
        className={LOGIN_FORM_CLASS}
      >
        <FormField
          id={SIGN_IN_FIELD.USERNAME}
          name={SIGN_IN_FIELD.USERNAME}
          label={LOGIN_FORM_COPY.USERNAME_LABEL}
          placeholder={LOGIN_FORM_COPY.USERNAME_PLACEHOLDER}
          type={INPUT_TYPES.TEXT}
          variant={FORM_FIELD_VARIANT.GLASS}
          labelSuffix={STRING.Empty}
          value={values.username}
          onChange={handleUsernameChange}
          error={usernameError}
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
          onChange={handlePasswordChange}
          error={passwordError}
          showErrorText
        />
        <LoginFormSubmit isPending={isPending} />
      </form>
    </>
  );
};

export default LoginFormView;
