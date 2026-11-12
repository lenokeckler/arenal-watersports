import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { EXTERNAL_GUIDE_REGISTRATION_FIELD } from "../constants/ExternalGuideRegistrationForm.constants";
import { EXTERNAL_GUIDE_REGISTRATION_COPY } from "../constants/ExternalGuideRegistrationCopy.constants";
import type { ExternalGuideRegistrationFieldsProps } from "../models/ExternalGuideRegistrationFieldsProps.interface";

const ExternalGuideRegistrationFields = ({
  isPending,
  onChange,
  values,
}: ExternalGuideRegistrationFieldsProps): React.JSX.Element => (
  <>
    <FormField
      id={EXTERNAL_GUIDE_REGISTRATION_FIELD.FULL_NAME}
      name={EXTERNAL_GUIDE_REGISTRATION_FIELD.FULL_NAME}
      label={EXTERNAL_GUIDE_REGISTRATION_COPY.FULL_NAME}
      type={INPUT_TYPES.TEXT}
      variant={FORM_FIELD_VARIANT.GLASS}
      value={values.fullName}
      onChange={onChange}
      readOnly={isPending}
    />
    <FormField
      id={EXTERNAL_GUIDE_REGISTRATION_FIELD.NATIONAL_ID}
      name={EXTERNAL_GUIDE_REGISTRATION_FIELD.NATIONAL_ID}
      label={EXTERNAL_GUIDE_REGISTRATION_COPY.NATIONAL_ID}
      type={INPUT_TYPES.TEXT}
      variant={FORM_FIELD_VARIANT.GLASS}
      value={values.nationalId}
      onChange={onChange}
      readOnly={isPending}
    />
    <FormField
      id={EXTERNAL_GUIDE_REGISTRATION_FIELD.EXPIRES_ON}
      name={EXTERNAL_GUIDE_REGISTRATION_FIELD.EXPIRES_ON}
      label={EXTERNAL_GUIDE_REGISTRATION_COPY.EXPIRES_ON}
      type={INPUT_TYPES.DATE}
      variant={FORM_FIELD_VARIANT.GLASS}
      value={values.expiresOn}
      onChange={onChange}
      readOnly={isPending}
    />
    <FormField
      id={EXTERNAL_GUIDE_REGISTRATION_FIELD.PERSONAL_EMAIL}
      name={
        EXTERNAL_GUIDE_REGISTRATION_FIELD.PERSONAL_EMAIL
      }
      label={
        EXTERNAL_GUIDE_REGISTRATION_COPY.PERSONAL_EMAIL
      }
      labelSuffix={STRING.Empty}
      type={INPUT_TYPES.EMAIL}
      variant={FORM_FIELD_VARIANT.GLASS}
      value={values.personalEmail}
      onChange={onChange}
      readOnly={isPending}
    />
  </>
);

export default ExternalGuideRegistrationFields;
