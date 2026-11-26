import { Text } from "@/app/components";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  FORM_GROUP_CLASS,
  FORM_HINT_CLASS,
} from "@/app/components/form-layout/styles/FormLayout.styles";
import {
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { CATEGORY_BEHAVIOR_FORM_FIELD_ID } from "../constants/CategoryBehaviorFormFieldId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryBehaviorLowFuelFieldProps } from "../models/CategoryBehaviorLowFuelFieldProps.interface";

const CategoryBehaviorLowFuelField = ({
  disabled,
  error,
  onChange,
  value,
}: CategoryBehaviorLowFuelFieldProps): React.JSX.Element => (
  <div className={FORM_GROUP_CLASS}>
    <FormField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.LOW_FUEL_LINES}
      name={CATEGORY_BEHAVIOR_FORM_FIELD_ID.LOW_FUEL_LINES}
      label={
        CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_FIELD_LABEL
      }
      value={value}
      type={INPUT_TYPES.TEXT}
      inputMode={INPUT_MODE.NUMERIC}
      placeholder={
        CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_FIELD_PLACEHOLDER
      }
      labelSuffix={STRING.Empty}
      onChange={onChange}
      error={error}
      showErrorText
      disabled={disabled}
      variant={FORM_FIELD_VARIANT.DEFAULT}
      describedBy={
        CATEGORY_BEHAVIOR_FORM_FIELD_ID.LOW_FUEL_LINES_HINT
      }
    />
    <Text
      id={
        CATEGORY_BEHAVIOR_FORM_FIELD_ID.LOW_FUEL_LINES_HINT
      }
      className={FORM_HINT_CLASS}
    >
      {CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_FIELD_HINT}
    </Text>
  </div>
);

export default CategoryBehaviorLowFuelField;
