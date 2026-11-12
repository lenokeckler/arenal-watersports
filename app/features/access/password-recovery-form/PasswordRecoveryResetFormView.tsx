"use client";

import { FORM_STACK_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import PasswordRecoveryBackLink from "./components/PasswordRecoveryBackLink";
import PasswordRecoveryPinNote from "./components/PasswordRecoveryPinNote";
import PasswordRecoveryResetFields from "./components/PasswordRecoveryResetFields";
import PasswordRecoveryResetHeading from "./components/PasswordRecoveryResetHeading";
import PasswordRecoveryResetNotice from "./components/PasswordRecoveryResetNotice";
import PasswordRecoveryResetSubmit from "./components/PasswordRecoveryResetSubmit";
import { usePasswordRecoveryResetViewModel } from "./hooks/usePasswordRecoveryResetViewModel";
import type { PasswordRecoveryResetFormViewProps } from "./models/PasswordRecoveryResetFormViewProps.interface";

const PasswordRecoveryResetFormView = ({
  action,
  initialUsername,
}: PasswordRecoveryResetFormViewProps): React.JSX.Element => {
  const { formAction, onSubmit, ...fields } =
    usePasswordRecoveryResetViewModel(
      action,
      initialUsername
    );

  return (
    <>
      <PasswordRecoveryResetHeading />
      <PasswordRecoveryResetNotice />
      <form
        noValidate
        action={formAction}
        onSubmit={onSubmit}
        className={FORM_STACK_CLASS}
      >
        <PasswordRecoveryResetFields {...fields} />
        <PasswordRecoveryResetSubmit
          error={
            fields.fieldErrors[PASSWORD_RECOVERY_FIELD.FORM]
          }
          isPending={fields.isPending}
        />
      </form>
      <PasswordRecoveryPinNote />
      <PasswordRecoveryBackLink />
    </>
  );
};

export default PasswordRecoveryResetFormView;
