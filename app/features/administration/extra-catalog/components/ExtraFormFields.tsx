import FormField from "@/app/components/form-field/FormField";
import { AUTOCOMPLETE } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import type { ExtraFormFieldsProps } from "../models/ExtraFormFieldsProps.type";

const ExtraFormFields = ({
  values,
  errors,
  isSubmitting,
  onNameChange,
}: ExtraFormFieldsProps): React.JSX.Element => (
  <FormField
    id={EXTRA_FORM_FIELD_ID.NAME}
    name={EXTRA_FORM_FIELD_ID.NAME}
    label={EXTRA_CATALOG_COPY.NAME_LABEL}
    value={values.name}
    onChange={onNameChange}
    error={errors.name}
    showErrorText
    disabled={isSubmitting}
    autoComplete={AUTOCOMPLETE.OFF}
    describedBy={EXTRA_FORM_FIELD_ID.HINT}
  />
);

export default ExtraFormFields;
