"use client";

import BackLink from "@/app/components/back-link/BackLink";
import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import PasswordField from "@/app/components/password-field/PasswordField";
import {
  AUTOCOMPLETE,
  PATHS,
  PERSONAL_EMAIL_FIELD,
  PERSONAL_EMAIL_INTENT,
  PERSONAL_EMAIL_INTENT_FIELD,
} from "@/app/constants";
import PersonalEmailField from "./components/PersonalEmailField";
import PersonalEmailFormHeading from "./components/PersonalEmailFormHeading";
import PersonalEmailRemoveButton from "./components/PersonalEmailRemoveButton";
import { PERSONAL_EMAIL_FORM_COPY } from "./constants/PersonalEmailFormCopy.constants";
import { usePersonalEmailFormViewModel } from "./hooks/usePersonalEmailFormViewModel";
import type { PersonalEmailFormViewProps } from "./models/PersonalEmailFormViewProps.interface";
import { PERSONAL_EMAIL_FORM_CLASS } from "./styles/PersonalEmailForm.styles";

const PersonalEmailFormView = ({
  action,
  canRemove,
  errorCopy,
  initialEmail,
}: PersonalEmailFormViewProps): React.JSX.Element => {
  const {
    fieldErrors,
    fieldRefs,
    formAction,
    isPending,
    onChange,
    onSubmit,
    pendingIntent,
    values,
  } = usePersonalEmailFormViewModel({
    action,
    errorCopy,
    initialEmail,
  });

  return (
    <>
      <PersonalEmailFormHeading />
      <FormErrorBanner
        message={fieldErrors[PERSONAL_EMAIL_FIELD.FORM]}
      />
      <form
        noValidate
        action={formAction}
        onSubmit={onSubmit}
        className={PERSONAL_EMAIL_FORM_CLASS}
      >
        <PersonalEmailField
          error={fieldErrors[PERSONAL_EMAIL_FIELD.EMAIL]}
          inputRef={fieldRefs[PERSONAL_EMAIL_FIELD.EMAIL]}
          isPending={isPending}
          onChange={onChange}
          value={values.email}
        />
        <PasswordField
          autoComplete={AUTOCOMPLETE.CURRENT_PASSWORD}
          error={
            fieldErrors[
              PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD
            ]
          }
          inputRef={
            fieldRefs[PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD]
          }
          isPending={isPending}
          label={
            PERSONAL_EMAIL_FORM_COPY.CURRENT_PASSWORD_LABEL
          }
          name={PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD}
          onChange={onChange}
          placeholder={
            PERSONAL_EMAIL_FORM_COPY.PASSWORD_PLACEHOLDER
          }
          value={values.currentPassword}
        />
        <FormSubmitButton
          icon={MATERIAL_ICON_NAME.MAIL}
          isPending={isPending}
          label={PERSONAL_EMAIL_FORM_COPY.SUBMIT}
          name={PERSONAL_EMAIL_INTENT_FIELD}
          pendingLabel={PERSONAL_EMAIL_FORM_COPY.SUBMITTING}
          showsProgress={
            pendingIntent === PERSONAL_EMAIL_INTENT.SAVE
          }
          value={PERSONAL_EMAIL_INTENT.SAVE}
        />
        {canRemove && (
          <PersonalEmailRemoveButton
            isPending={isPending}
            pendingIntent={pendingIntent}
          />
        )}
        <BackLink
          href={PATHS.PROFILE.ROOT}
          label={PERSONAL_EMAIL_FORM_COPY.BACK}
        />
      </form>
    </>
  );
};

export default PersonalEmailFormView;
