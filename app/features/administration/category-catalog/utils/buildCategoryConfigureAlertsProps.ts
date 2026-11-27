import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";
import { CATEGORY_CONFIGURE_ALERT_TYPE_CHOICES } from "../constants/CategoryConfigureAlertTypeChoices.constants";
import type { CategoryAlertFormFieldsViewModel } from "../models/CategoryAlertFormFieldsViewModel.interface";
import type { CategoryConfigureAlertsProps } from "../models/CategoryConfigureAlertsProps.interface";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import { doesCategoryAlertTypeIncludeExpiry } from "./doesCategoryAlertTypeIncludeExpiry";
import { doesCategoryAlertTypeIncludeQuantity } from "./doesCategoryAlertTypeIncludeQuantity";
import { isCategoryAlertTypeChoiceSelected } from "./isCategoryAlertTypeChoiceSelected";

export const buildCategoryConfigureAlertsProps = (
  fields: CategoryAlertFormFieldsViewModel
): CategoryConfigureAlertsProps => {
  const { values, errors } = fields;

  const onSelectType = (
    alertType: CategoryAlertType
  ): void =>
    fields.onAlertTypeChange(
      buildCategoryFormFieldChangeEvent({
        value: alertType,
      })
    );

  return {
    values,
    errors,
    typeChips: {
      choices: CATEGORY_CONFIGURE_ALERT_TYPE_CHOICES.map(
        (choice) => ({
          ...choice,
          isSelected: isCategoryAlertTypeChoiceSelected(
            choice.type,
            values.alertType
          ),
        })
      ),
      onSelectType,
    },
    isQuantityVisible: doesCategoryAlertTypeIncludeQuantity(
      values.alertType
    ),
    isExpiryVisible: doesCategoryAlertTypeIncludeExpiry(
      values.alertType
    ),
    onMinQuantityChange: fields.onMinQuantityChange,
    onExpiryDaysChange: fields.onExpiryDaysChange,
  };
};
