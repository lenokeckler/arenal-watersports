import PasswordField from "@/app/components/password-field/PasswordField";
import {
  AUTOCOMPLETE,
  PERSONAL_EMAIL_FIELD,
} from "@/app/constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import type { PersonalEmailFormFieldsProps } from "../models/PersonalEmailFormFieldsProps.interface";
import PersonalEmailField from "./PersonalEmailField";

const PersonalEmailFormFields = ({
  fieldErrors,
  fieldRefs,
  isPending,
  onChange,
  values,
}: PersonalEmailFormFieldsProps): React.JSX.Element => (
  <>
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
        fieldErrors[PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD]
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
  </>
);

export default PersonalEmailFormFields;
