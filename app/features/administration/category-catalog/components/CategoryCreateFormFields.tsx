import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import Text from "@/app/components/text/Text";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import {
  CATEGORY_CREATE_MODE_CHOICES,
  CATEGORY_CREATE_RESERVABLE_CHOICES,
} from "../constants/CategoryCreateFormChoices.constants";
import { CATEGORY_CREATE_FORM_FIELD_ID } from "../constants/CategoryCreateFormFieldId.constants";
import type { CategoryCreateFormFieldsProps } from "../models/CategoryCreateFormFieldsProps.interface";
import { CATEGORY_CREATE_FORM_NAME_HELP_CLASS } from "../styles/CategoryCreateFormChoice.styles";
import CategoryCreateFormChoiceGroup from "./CategoryCreateFormChoiceGroup";

const CategoryCreateFormFields = ({
  values,
  reservableChoice,
  errors,
  isSubmitting,
  onNameChange,
  onTrackingModeChange,
  onReservableChoiceChange,
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
      describedBy={CATEGORY_CREATE_FORM_FIELD_ID.NAME_HELP}
      onChange={onNameChange}
      error={errors.name}
      showErrorText
      disabled={isSubmitting}
      variant={FORM_FIELD_VARIANT.DEFAULT}
    />
    <Text
      id={CATEGORY_CREATE_FORM_FIELD_ID.NAME_HELP}
      className={CATEGORY_CREATE_FORM_NAME_HELP_CLASS}
    >
      {CATEGORY_CATALOG_COPY.CREATE_NAME_HELP}
    </Text>
    <CategoryCreateFormChoiceGroup
      id={CATEGORY_CREATE_FORM_FIELD_ID.TRACKING_MODE}
      label={CATEGORY_CATALOG_COPY.CREATE_MODE_LABEL}
      choices={CATEGORY_CREATE_MODE_CHOICES}
      selectedValue={values.trackingMode}
      isDisabled={isSubmitting}
      onSelect={onTrackingModeChange}
      note={CATEGORY_CATALOG_COPY.CREATE_MODE_LOCKED}
      error={errors.trackingMode}
    />
    <CategoryCreateFormChoiceGroup
      id={CATEGORY_CREATE_FORM_FIELD_ID.RESERVABLE}
      label={CATEGORY_CATALOG_COPY.CREATE_RESERVABLE_LABEL}
      choices={CATEGORY_CREATE_RESERVABLE_CHOICES}
      selectedValue={reservableChoice}
      isDisabled={isSubmitting}
      onSelect={onReservableChoiceChange}
      note={CATEGORY_CATALOG_COPY.CREATE_RESERVABLE_HELP}
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
