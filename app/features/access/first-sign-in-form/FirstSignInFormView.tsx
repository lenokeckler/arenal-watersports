"use client";

import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import FirstSignInFormFields from "./components/FirstSignInFormFields";
import FirstSignInFormHeading from "./components/FirstSignInFormHeading";
import { FIRST_SIGN_IN_FORM_COPY } from "./constants/FirstSignInFormCopy.constants";
import { useFirstSignInFormViewModel } from "./hooks/useFirstSignInFormViewModel";
import { FIRST_SIGN_IN_FORM_CLASS } from "./styles/FirstSignInForm.styles";

const FirstSignInFormView = (): React.JSX.Element => {
  const { formAction, onSubmit, ...fields } =
    useFirstSignInFormViewModel();

  return (
    <>
      <FirstSignInFormHeading />
      <FormErrorBanner
        message={
          fields.fieldErrors[FIRST_SIGN_IN_FIELD.FORM]
        }
      />
      <form
        noValidate
        action={formAction}
        onSubmit={onSubmit}
        className={FIRST_SIGN_IN_FORM_CLASS}
      >
        <FirstSignInFormFields {...fields} />
        <FormSubmitButton
          icon={MATERIAL_ICON_NAME.LOCK_RESET}
          isPending={fields.isPending}
          label={FIRST_SIGN_IN_FORM_COPY.SUBMIT}
          pendingLabel={FIRST_SIGN_IN_FORM_COPY.SUBMITTING}
        />
      </form>
    </>
  );
};

export default FirstSignInFormView;
