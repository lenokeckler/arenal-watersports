import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CREATE_FORM_FIELD_ID } from "../constants/CategoryCreateFormFieldId.constants";
import { CATEGORY_TRACKING_MODE_OPTIONS } from "../constants/CategoryTrackingModeOptions.constants";
import type { CategoryCreateFormFieldsProps } from "../models/CategoryCreateFormFieldsProps.interface";

const CategoryCreateFormFields = ({
  values,
  errors,
  isSubmitting,
  onNameChange,
  onTrackingModeChange,
  onGroupNameChange,
}: CategoryCreateFormFieldsProps): React.JSX.Element => (
  <>
    <FormField
      id={CATEGORY_CREATE_FORM_FIELD_ID.NAME}
      name={CATEGORY_CREATE_FORM_FIELD_ID.NAME}
      label={CATEGORY_CATALOG_COPY.NAME_FIELD_LABEL}
      value={values.name}
      type={INPUT_TYPES.TEXT}
      placeholder={
        CATEGORY_CATALOG_COPY.NAME_FIELD_PLACEHOLDER
      }
      onChange={onNameChange}
      error={errors.name}
      showErrorText
      disabled={isSubmitting}
      variant={FORM_FIELD_VARIANT.DEFAULT}
    />
    <FormField
      id={CATEGORY_CREATE_FORM_FIELD_ID.TRACKING_MODE}
      name={CATEGORY_CREATE_FORM_FIELD_ID.TRACKING_MODE}
      label={
        CATEGORY_CATALOG_COPY.TRACKING_MODE_FIELD_LABEL
      }
      value={values.trackingMode}
      type={INPUT_TYPES.SELECT}
      options={CATEGORY_TRACKING_MODE_OPTIONS}
      placeholder={
        CATEGORY_CATALOG_COPY.TRACKING_MODE_FIELD_PLACEHOLDER
      }
      onChange={onTrackingModeChange}
      error={errors.trackingMode}
      showErrorText
      disabled={isSubmitting}
      variant={FORM_FIELD_VARIANT.DEFAULT}
    />
    <FormField
      id={CATEGORY_CREATE_FORM_FIELD_ID.GROUP_NAME}
      name={CATEGORY_CREATE_FORM_FIELD_ID.GROUP_NAME}
      label={CATEGORY_CATALOG_COPY.GROUP_FIELD_LABEL}
      value={values.groupName}
      type={INPUT_TYPES.TEXT}
      placeholder={
        CATEGORY_CATALOG_COPY.GROUP_FIELD_PLACEHOLDER
      }
      labelSuffix={STRING.Empty}
      onChange={onGroupNameChange}
      error={errors.groupName}
      showErrorText
      disabled={isSubmitting}
      variant={FORM_FIELD_VARIANT.DEFAULT}
    />
  </>
);

export default CategoryCreateFormFields;
