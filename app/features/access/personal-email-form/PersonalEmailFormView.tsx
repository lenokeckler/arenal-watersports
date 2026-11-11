"use client";

import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import { FORM_STACK_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { PERSONAL_EMAIL_FIELD } from "@/app/constants";
import PersonalEmailFormActions from "./components/PersonalEmailFormActions";
import PersonalEmailFormFields from "./components/PersonalEmailFormFields";
import PersonalEmailFormHeading from "./components/PersonalEmailFormHeading";
import { usePersonalEmailFormViewModel } from "./hooks/usePersonalEmailFormViewModel";
import type { PersonalEmailFormViewProps } from "./models/PersonalEmailFormViewProps.interface";

const PersonalEmailFormView = ({
  action,
  canRemove,
  errorCopy,
  initialEmail,
}: PersonalEmailFormViewProps): React.JSX.Element => {
  const { formAction, onSubmit, pendingIntent, ...fields } =
    usePersonalEmailFormViewModel({
      action,
      errorCopy,
      initialEmail,
    });

  return (
    <>
      <PersonalEmailFormHeading />
      <FormErrorBanner
        message={
          fields.fieldErrors[PERSONAL_EMAIL_FIELD.FORM]
        }
      />
      <form
        noValidate
        action={formAction}
        onSubmit={onSubmit}
        className={FORM_STACK_CLASS}
      >
        <PersonalEmailFormFields {...fields} />
        <PersonalEmailFormActions
          canRemove={canRemove}
          isPending={fields.isPending}
          pendingIntent={pendingIntent}
        />
      </form>
    </>
  );
};

export default PersonalEmailFormView;
