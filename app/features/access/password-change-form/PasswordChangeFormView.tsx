"use client";

import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import PasswordChangeFormFields from "./components/PasswordChangeFormFields";
import FirstSignInFormHeading from "./components/FirstSignInFormHeading";
import { usePasswordChangeFormViewModel } from "./hooks/usePasswordChangeFormViewModel";
import type { PasswordChangeFormViewProps } from "./models/PasswordChangeFormViewProps.interface";
import { PASSWORD_CHANGE_FORM_CLASS } from "./styles/PasswordChangeForm.styles";

const PasswordChangeFormView = ({
  action,
  copy,
  errorCopy,
}: PasswordChangeFormViewProps): React.JSX.Element => {
  const { formAction, onSubmit, ...fields } =
    usePasswordChangeFormViewModel({ action, errorCopy });

  return (
    <>
      <FirstSignInFormHeading />
      <FormErrorBanner
        message={
          fields.fieldErrors[PASSWORD_CHANGE_FIELD.FORM]
        }
      />
      <form
        noValidate
        action={formAction}
        onSubmit={onSubmit}
        className={PASSWORD_CHANGE_FORM_CLASS}
      >
        <PasswordChangeFormFields
          {...fields}
          copy={copy}
        />
        <FormSubmitButton
          icon={MATERIAL_ICON_NAME.LOCK_RESET}
          isPending={fields.isPending}
          label={copy.SUBMIT}
          pendingLabel={copy.SUBMITTING}
        />
      </form>
    </>
  );
};

export default PasswordChangeFormView;
