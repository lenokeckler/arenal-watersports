"use client";

import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import { FORM_STACK_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import PasswordRecoveryBackLink from "./components/PasswordRecoveryBackLink";
import PasswordRecoveryNoEmailNote from "./components/PasswordRecoveryNoEmailNote";
import PasswordRecoveryRequestHeading from "./components/PasswordRecoveryRequestHeading";
import PasswordRecoveryUsernameField from "./components/PasswordRecoveryUsernameField";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "./constants/PasswordRecoveryRequestCopy.constants";
import { usePasswordRecoveryRequestViewModel } from "./hooks/usePasswordRecoveryRequestViewModel";
import type { PasswordRecoveryRequestFormViewProps } from "./models/PasswordRecoveryRequestFormViewProps.interface";

const PasswordRecoveryRequestFormView = ({
  action,
}: PasswordRecoveryRequestFormViewProps): React.JSX.Element => {
  const {
    fieldErrors,
    fieldRefs,
    formAction,
    isPending,
    onChange,
    onSubmit,
    values,
  } = usePasswordRecoveryRequestViewModel(action);

  return (
    <>
      <PasswordRecoveryRequestHeading />
      <FormErrorBanner
        message={fieldErrors[PASSWORD_RECOVERY_FIELD.FORM]}
      />
      <form
        noValidate
        action={formAction}
        onSubmit={onSubmit}
        className={FORM_STACK_CLASS}
      >
        <PasswordRecoveryUsernameField
          error={
            fieldErrors[PASSWORD_RECOVERY_FIELD.USERNAME]
          }
          inputRef={
            fieldRefs[PASSWORD_RECOVERY_FIELD.USERNAME]
          }
          isPending={isPending}
          onChange={onChange}
          value={values.username}
        />
        <FormSubmitButton
          icon={MATERIAL_ICON_NAME.MAIL}
          isPending={isPending}
          label={PASSWORD_RECOVERY_REQUEST_COPY.SUBMIT}
          pendingLabel={
            PASSWORD_RECOVERY_REQUEST_COPY.SUBMITTING
          }
        />
        <PasswordRecoveryNoEmailNote />
        <PasswordRecoveryBackLink />
      </form>
    </>
  );
};

export default PasswordRecoveryRequestFormView;
