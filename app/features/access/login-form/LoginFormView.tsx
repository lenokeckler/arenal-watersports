"use client";

import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import LoginFormFields from "./components/LoginFormFields";
import LoginFormSubmit from "./components/LoginFormSubmit";
import { useLoginFormViewModel } from "./hooks/useLoginFormViewModel";
import type { LoginFormOptions } from "./models/LoginFormOptions.interface";
import { LOGIN_FORM_CLASS } from "./styles/LoginForm.styles";

const LoginFormView = ({
  notice,
}: LoginFormOptions): React.JSX.Element => {
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
  } = useLoginFormViewModel({ notice });

  return (
    <>
      <FormErrorBanner
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
