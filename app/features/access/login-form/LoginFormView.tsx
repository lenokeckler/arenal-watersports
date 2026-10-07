"use client";

import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import LoginFormBanner from "./components/LoginFormBanner";
import LoginFormFields from "./components/LoginFormFields";
import LoginFormSubmit from "./components/LoginFormSubmit";
import { useLoginFormViewModel } from "./hooks/useLoginFormViewModel";
import { LOGIN_FORM_CLASS } from "./styles/LoginForm.styles";

const LoginFormView = (): React.JSX.Element => {
  const {
    fieldErrors,
    fieldRefs,
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
        <LoginFormFields
          fieldRefs={fieldRefs}
          onPasswordChange={handlePasswordChange}
          onUsernameChange={handleUsernameChange}
          passwordError={passwordError}
          usernameError={usernameError}
          values={values}
        />
        <LoginFormSubmit isPending={isPending} />
      </form>
    </>
  );
};

export default LoginFormView;
