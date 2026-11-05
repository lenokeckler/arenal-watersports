import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { CATEGORY_ALERT_FORM_FIELD_ID } from "../constants/CategoryAlertFormFieldId.constants";
import { CATEGORY_ALERT_TYPE_OPTIONS } from "../constants/CategoryAlertTypeOptions.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryAlertTypeFieldProps } from "../models/CategoryAlertTypeFieldProps.interface";

const CategoryAlertTypeField = ({
  value,
  disabled,
  onChange,
}: CategoryAlertTypeFieldProps): React.JSX.Element => (
  <FormField
    id={CATEGORY_ALERT_FORM_FIELD_ID.TYPE}
    name={CATEGORY_ALERT_FORM_FIELD_ID.TYPE}
    label={CATEGORY_CATALOG_COPY.ALERT_TYPE_FIELD_LABEL}
    value={value}
    type={INPUT_TYPES.SELECT}
    options={CATEGORY_ALERT_TYPE_OPTIONS}
    labelSuffix={STRING.Empty}
    onChange={onChange}
    disabled={disabled}
    variant={FORM_FIELD_VARIANT.DEFAULT}
    describedBy={CATEGORY_ALERT_FORM_FIELD_ID.HINT}
  />
);

export default CategoryAlertTypeField;
