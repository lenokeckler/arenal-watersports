import { Text } from "@/app/components";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  FORM_GROUP_CLASS,
  FORM_HINT_CLASS,
} from "@/app/components/form-layout/styles/FormLayout.styles";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_TYPES,
  STRING,
  WORKER_REGISTRATION_FIELD,
} from "@/app/constants";
import { WORKER_REGISTRATION_COPY } from "../constants/WorkerRegistrationCopy.constants";
import {
  WORKER_BASE_ROLE_OPTIONS,
  WORKER_REGISTRATION_HINT_ID,
} from "../constants/WorkerRegistrationForm.constants";
import type { WorkerRegistrationFieldsProps } from "../models/WorkerRegistrationFieldsProps.interface";

const WorkerRegistrationFields = ({
  errors,
  fieldRefs,
  isPending,
  onChange,
  values,
}: WorkerRegistrationFieldsProps): React.JSX.Element => (
  <>
    <FormField
      id={WORKER_REGISTRATION_FIELD.FULL_NAME}
      name={WORKER_REGISTRATION_FIELD.FULL_NAME}
      label={WORKER_REGISTRATION_COPY.FULL_NAME_LABEL}
      placeholder={
        WORKER_REGISTRATION_COPY.FULL_NAME_PLACEHOLDER
      }
      type={INPUT_TYPES.TEXT}
      variant={FORM_FIELD_VARIANT.GLASS}
      labelSuffix={STRING.Empty}
      autoComplete={AUTOCOMPLETE.OFF}
      autoCapitalize={AUTOCAPITALIZE.WORDS}
      value={values.fullName}
      onChange={onChange}
      error={errors[WORKER_REGISTRATION_FIELD.FULL_NAME]}
      reference={
        fieldRefs[WORKER_REGISTRATION_FIELD.FULL_NAME]
      }
      readOnly={isPending}
      showErrorText
    />
    <div className={FORM_GROUP_CLASS}>
      <FormField
        id={WORKER_REGISTRATION_FIELD.USERNAME}
        name={WORKER_REGISTRATION_FIELD.USERNAME}
        label={WORKER_REGISTRATION_COPY.USERNAME_LABEL}
        placeholder={
          WORKER_REGISTRATION_COPY.USERNAME_PLACEHOLDER
        }
        type={INPUT_TYPES.TEXT}
        variant={FORM_FIELD_VARIANT.GLASS}
        labelSuffix={STRING.Empty}
        autoComplete={AUTOCOMPLETE.OFF}
        autoCapitalize={AUTOCAPITALIZE.NONE}
        spellCheck={false}
        describedBy={WORKER_REGISTRATION_HINT_ID.USERNAME}
        value={values.username}
        onChange={onChange}
        error={errors[WORKER_REGISTRATION_FIELD.USERNAME]}
        reference={
          fieldRefs[WORKER_REGISTRATION_FIELD.USERNAME]
        }
        readOnly={isPending}
        showErrorText
      />
      <Text
        id={WORKER_REGISTRATION_HINT_ID.USERNAME}
        className={FORM_HINT_CLASS}
      >
        {WORKER_REGISTRATION_COPY.USERNAME_HINT}
      </Text>
    </div>
    <div className={FORM_GROUP_CLASS}>
      <FormField
        id={WORKER_REGISTRATION_FIELD.BASE_ROLE}
        name={WORKER_REGISTRATION_FIELD.BASE_ROLE}
        label={WORKER_REGISTRATION_COPY.BASE_ROLE_LABEL}
        placeholder={
          WORKER_REGISTRATION_COPY.BASE_ROLE_PLACEHOLDER
        }
        type={INPUT_TYPES.SELECT}
        variant={FORM_FIELD_VARIANT.GLASS}
        labelSuffix={STRING.Empty}
        options={WORKER_BASE_ROLE_OPTIONS}
        describedBy={WORKER_REGISTRATION_HINT_ID.BASE_ROLE}
        value={values.baseRole}
        onChange={onChange}
        error={errors[WORKER_REGISTRATION_FIELD.BASE_ROLE]}
        disabled={isPending}
        showErrorText
      />
      <Text
        id={WORKER_REGISTRATION_HINT_ID.BASE_ROLE}
        className={FORM_HINT_CLASS}
      >
        {WORKER_REGISTRATION_COPY.BASE_ROLE_HINT}
      </Text>
    </div>
  </>
);

export default WorkerRegistrationFields;
