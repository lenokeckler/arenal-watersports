import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { CATEGORY_BEHAVIOR_FORM_FIELD_ID } from "../constants/CategoryBehaviorFormFieldId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryBehaviorDurationFieldProps } from "../models/CategoryBehaviorDurationFieldProps.interface";

const CategoryBehaviorDurationField = ({
  value,
  error,
  disabled,
  onChange,
}: CategoryBehaviorDurationFieldProps): React.JSX.Element => (
  <FormField
    id={
      CATEGORY_BEHAVIOR_FORM_FIELD_ID.DEFAULT_DURATION_MINUTES
    }
    name={
      CATEGORY_BEHAVIOR_FORM_FIELD_ID.DEFAULT_DURATION_MINUTES
    }
    label={
      CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_FIELD_LABEL
    }
    value={value}
    type={INPUT_TYPES.TEXT}
    placeholder={
      CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_FIELD_PLACEHOLDER
    }
    labelSuffix={STRING.Empty}
    onChange={onChange}
    error={error}
    showErrorText
    disabled={disabled}
    variant={FORM_FIELD_VARIANT.DEFAULT}
  />
);

export default CategoryBehaviorDurationField;
