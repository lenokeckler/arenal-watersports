"use client";

import { FORM_STACK_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import PasswordRecoveryAnotherPinLink from "./components/PasswordRecoveryAnotherPinLink";
import PasswordRecoveryBackLink from "./components/PasswordRecoveryBackLink";
import PasswordRecoveryNewPasswordFields from "./components/PasswordRecoveryNewPasswordFields";
import PasswordRecoveryNewPasswordHeading from "./components/PasswordRecoveryNewPasswordHeading";
import PasswordRecoveryNewPasswordSubmit from "./components/PasswordRecoveryNewPasswordSubmit";
import { usePasswordRecoveryNewPasswordViewModel } from "./hooks/usePasswordRecoveryNewPasswordViewModel";
import type { PasswordRecoveryNewPasswordFormViewProps } from "./models/PasswordRecoveryNewPasswordFormViewProps.interface";

const PasswordRecoveryNewPasswordFormView = ({
  action,
}: PasswordRecoveryNewPasswordFormViewProps): React.JSX.Element => {
  const { formAction, onSubmit, ...fields } =
    usePasswordRecoveryNewPasswordViewModel(action);

  return (
    <>
      <PasswordRecoveryNewPasswordHeading />
      <form
        noValidate
        action={formAction}
        onSubmit={onSubmit}
        className={FORM_STACK_CLASS}
      >
        <PasswordRecoveryNewPasswordFields {...fields} />
        <PasswordRecoveryNewPasswordSubmit
          error={
            fields.fieldErrors[PASSWORD_RECOVERY_FIELD.FORM]
          }
          isPending={fields.isPending}
        />
      </form>
      <PasswordRecoveryAnotherPinLink />
      <PasswordRecoveryBackLink />
    </>
  );
};

export default PasswordRecoveryNewPasswordFormView;
