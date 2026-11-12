import { CATEGORY_ALERT_FORM_FIELD_ID } from "../constants/CategoryAlertFormFieldId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryAlertFormFieldsProps } from "../models/CategoryAlertFormFieldsProps.interface";
import { doesCategoryAlertTypeIncludeExpiry } from "../utils/doesCategoryAlertTypeIncludeExpiry";
import { doesCategoryAlertTypeIncludeQuantity } from "../utils/doesCategoryAlertTypeIncludeQuantity";
import CategoryAlertNumberField from "./CategoryAlertNumberField";
import CategoryAlertTypeField from "./CategoryAlertTypeField";

const CategoryAlertFormFields = ({
  values,
  errors,
  isSubmitting,
  onAlertTypeChange,
  onMinQuantityChange,
  onExpiryDaysChange,
}: CategoryAlertFormFieldsProps): React.JSX.Element => (
  <>
    <CategoryAlertTypeField
      value={values.alertType}
      disabled={isSubmitting}
      onChange={onAlertTypeChange}
    />
    {doesCategoryAlertTypeIncludeQuantity(
      values.alertType
    ) && (
      <CategoryAlertNumberField
        id={CATEGORY_ALERT_FORM_FIELD_ID.MIN_QUANTITY}
        label={
          CATEGORY_CATALOG_COPY.ALERT_MIN_QUANTITY_FIELD_LABEL
        }
        placeholder={
          CATEGORY_CATALOG_COPY.ALERT_MIN_QUANTITY_PLACEHOLDER
        }
        value={values.minQuantityText}
        error={errors.minQuantityText}
        disabled={isSubmitting}
        onChange={onMinQuantityChange}
      />
    )}
    {doesCategoryAlertTypeIncludeExpiry(
      values.alertType
    ) && (
      <CategoryAlertNumberField
        id={CATEGORY_ALERT_FORM_FIELD_ID.EXPIRY_DAYS}
        label={
          CATEGORY_CATALOG_COPY.ALERT_EXPIRY_DAYS_FIELD_LABEL
        }
        placeholder={
          CATEGORY_CATALOG_COPY.ALERT_EXPIRY_DAYS_PLACEHOLDER
        }
        value={values.expiryDaysText}
        error={errors.expiryDaysText}
        disabled={isSubmitting}
        onChange={onExpiryDaysChange}
      />
    )}
  </>
);

export default CategoryAlertFormFields;
