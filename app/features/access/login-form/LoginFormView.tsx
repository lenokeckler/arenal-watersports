"use client";

import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import NoticeUrlCleaner from "@/app/components/notice-url-cleaner/NoticeUrlCleaner";
import { PATHS, SIGN_IN_FIELD } from "@/app/constants";
import LoginFormFields from "./components/LoginFormFields";
import LoginFormSubmit from "./components/LoginFormSubmit";
import LoginRecoveryOffer from "./components/LoginRecoveryOffer";
import { useLoginFormViewModel } from "./hooks/useLoginFormViewModel";
import type { LoginFormViewProps } from "./models/LoginFormViewProps.interface";
import { LOGIN_FORM_CLASS } from "./styles/LoginForm.styles";

const LoginFormView = ({
  notice,
  noticeMessage,
}: LoginFormViewProps): React.JSX.Element => {
  const {
    fieldErrors,
    fieldRefs,
    formAction,
    handlePasswordChange,
    handleSubmit,
    handleUsernameChange,
    isPending,
    isRecoveryOffered,
    passwordError,
    usernameError,
    values,
  } = useLoginFormViewModel({ notice });
  const formError = fieldErrors[SIGN_IN_FIELD.FORM];

  return (
    <>
      <FormErrorBanner message={formError} />
      {isRecoveryOffered ? <LoginRecoveryOffer /> : null}
      <FormSuccessNotice
        message={formError ? null : noticeMessage}
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
      {noticeMessage ? (
        <NoticeUrlCleaner cleanPath={PATHS.ACCESS.LOGIN} />
      ) : null}
    </>
  );
};

export default LoginFormView;
