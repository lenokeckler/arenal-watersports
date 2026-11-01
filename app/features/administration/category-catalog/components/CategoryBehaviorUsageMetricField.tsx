import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { CATEGORY_BEHAVIOR_FORM_FIELD_ID } from "../constants/CategoryBehaviorFormFieldId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { USAGE_METRIC_OPTIONS } from "../constants/UsageMetricOptions.constants";
import type { CategoryBehaviorUsageMetricFieldProps } from "../models/CategoryBehaviorUsageMetricFieldProps.interface";

const CategoryBehaviorUsageMetricField = ({
  value,
  disabled,
  onChange,
}: CategoryBehaviorUsageMetricFieldProps): React.JSX.Element => (
  <FormField
    id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.USAGE_METRIC}
    name={CATEGORY_BEHAVIOR_FORM_FIELD_ID.USAGE_METRIC}
    label={CATEGORY_CATALOG_COPY.USAGE_METRIC_FIELD_LABEL}
    value={value}
    type={INPUT_TYPES.SELECT}
    options={USAGE_METRIC_OPTIONS}
    placeholder={
      CATEGORY_CATALOG_COPY.BEHAVIOR_USAGE_METRIC_PLACEHOLDER
    }
    labelSuffix={STRING.Empty}
    onChange={onChange}
    disabled={disabled}
    variant={FORM_FIELD_VARIANT.DEFAULT}
  />
);

export default CategoryBehaviorUsageMetricField;
