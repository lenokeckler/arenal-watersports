import Text from "@/app/components/text/Text";
import { CATEGORY_ALERT_FORM_FIELD_ID } from "../constants/CategoryAlertFormFieldId.constants";
import { CATEGORY_CONFIGURE_ALERTS_ID } from "../constants/CategoryConfigureAlertsId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigureAlertsProps } from "../models/CategoryConfigureAlertsProps.interface";
import {
  CATEGORY_CONFIGURE_BODY_CLASS,
  CATEGORY_CONFIGURE_BODY_LABEL_CLASS,
} from "../styles/CategoryConfigureBody.styles";
import CategoryAlertNumberField from "./CategoryAlertNumberField";
import CategoryConfigureAlertTypeChips from "./CategoryConfigureAlertTypeChips";

const CategoryConfigureAlerts = ({
  values,
  errors,
  typeChips,
  isQuantityVisible,
  isExpiryVisible,
  onMinQuantityChange,
  onExpiryDaysChange,
}: CategoryConfigureAlertsProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_BODY_CLASS}>
    <Text
      id={CATEGORY_CONFIGURE_ALERTS_ID.TYPE_LABEL}
      className={CATEGORY_CONFIGURE_BODY_LABEL_CLASS}
    >
      {CATEGORY_CONFIGURE_COPY.ALERTS_TYPE_LABEL}
    </Text>
    <CategoryConfigureAlertTypeChips {...typeChips} />
    {isQuantityVisible && (
      <CategoryAlertNumberField
        id={CATEGORY_ALERT_FORM_FIELD_ID.MIN_QUANTITY}
        label={
          CATEGORY_CONFIGURE_COPY.ALERTS_QUANTITY_FIELD_LABEL
        }
        placeholder={
          CATEGORY_CATALOG_COPY.ALERT_MIN_QUANTITY_PLACEHOLDER
        }
        value={values.minQuantityText}
        error={errors.minQuantityText}
        onChange={onMinQuantityChange}
      />
    )}
    {isExpiryVisible && (
      <CategoryAlertNumberField
        id={CATEGORY_ALERT_FORM_FIELD_ID.EXPIRY_DAYS}
        label={
          CATEGORY_CONFIGURE_COPY.ALERTS_EXPIRY_FIELD_LABEL
        }
        placeholder={
          CATEGORY_CATALOG_COPY.ALERT_EXPIRY_DAYS_PLACEHOLDER
        }
        value={values.expiryDaysText}
        error={errors.expiryDaysText}
        onChange={onExpiryDaysChange}
      />
    )}
  </div>
);

export default CategoryConfigureAlerts;
