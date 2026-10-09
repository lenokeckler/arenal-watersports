import { Text } from "@/app/components";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  PERSONAL_EMAIL_FIELD,
  STRING,
} from "@/app/constants";
import { PERSONAL_EMAIL_HINT_ID } from "../constants/PersonalEmailFieldIds.constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import type { PersonalEmailFieldProps } from "../models/PersonalEmailFieldProps.interface";
import {
  PERSONAL_EMAIL_GROUP_CLASS,
  PERSONAL_EMAIL_HINT_CLASS,
} from "../styles/PersonalEmailForm.styles";

const PersonalEmailField = ({
  error,
  inputRef,
  isPending,
  onChange,
  value,
}: PersonalEmailFieldProps): React.JSX.Element => (
  <div className={PERSONAL_EMAIL_GROUP_CLASS}>
    <FormField
      id={PERSONAL_EMAIL_FIELD.EMAIL}
      name={PERSONAL_EMAIL_FIELD.EMAIL}
      label={PERSONAL_EMAIL_FORM_COPY.EMAIL_LABEL}
      placeholder={
        PERSONAL_EMAIL_FORM_COPY.EMAIL_PLACEHOLDER
      }
      type={INPUT_TYPES.EMAIL}
      variant={FORM_FIELD_VARIANT.GLASS}
      labelSuffix={STRING.Empty}
      autoComplete={AUTOCOMPLETE.EMAIL}
      inputMode={INPUT_MODE.EMAIL}
      autoCapitalize={AUTOCAPITALIZE.NONE}
      spellCheck={false}
      describedBy={PERSONAL_EMAIL_HINT_ID}
      value={value}
      onChange={onChange}
      error={error ?? undefined}
      reference={inputRef}
      readOnly={isPending}
      showErrorText
    />
    <Text
      id={PERSONAL_EMAIL_HINT_ID}
      className={PERSONAL_EMAIL_HINT_CLASS}
    >
      {PERSONAL_EMAIL_FORM_COPY.EMAIL_HINT}
    </Text>
  </div>
);

export default PersonalEmailField;
