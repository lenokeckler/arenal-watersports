import { Text } from "@/app/components";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  FORM_GROUP_CLASS,
  FORM_HINT_CLASS,
} from "@/app/components/form-layout/styles/FormLayout.styles";
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
  <div className={FORM_GROUP_CLASS}>
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
      describedBy={
        CATEGORY_BEHAVIOR_FORM_FIELD_ID.DEFAULT_DURATION_MINUTES_HINT
      }
    />
    <Text
      id={
        CATEGORY_BEHAVIOR_FORM_FIELD_ID.DEFAULT_DURATION_MINUTES_HINT
      }
      className={FORM_HINT_CLASS}
    >
      {
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_FIELD_HINT
      }
    </Text>
  </div>
);

export default CategoryBehaviorDurationField;
