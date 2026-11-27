import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import {
  ARIA_ROLE,
  AUTOCOMPLETE,
  BUTTON,
  BUTTON_TYPES,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { COMBO_FORM_FIELD_ID } from "../constants/ComboFormFieldId.constants";
import type { ComboItemRowProps } from "../models/ComboItemRowProps.interface";
import {
  COMBO_ITEM_QUANTITY_FIELD_CLASS,
  COMBO_ITEM_QUANTITY_INPUT_CLASS,
  COMBO_ITEM_QUANTITY_ROW_CLASS,
  COMBO_ITEM_REMOVE_BUTTON_CLASS,
  COMBO_ITEM_ROW_CLASS,
  COMBO_ITEM_STEP_BUTTON_CLASS,
  COMBO_ITEM_STEPPER_CLASS,
} from "../styles/ComboForm.styles";

const ComboItemRow = ({
  categoryOptions,
  errors,
  index,
  isDisabled,
  item,
  onCategoryChange,
  onQuantityChange,
  onQuantityDecrease,
  onQuantityIncrease,
  onRemoveClick,
}: ComboItemRowProps): React.JSX.Element => {
  const rowNumber = (index + 1).toString();
  const categoryId = `${COMBO_FORM_FIELD_ID.ITEM_CATEGORY}-${rowNumber}`;
  const quantityId = `${COMBO_FORM_FIELD_ID.ITEM_QUANTITY}-${rowNumber}`;

  return (
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={`${COMBO_FORM_COPY.ITEM_ROW_LABEL} ${rowNumber}`}
      className={COMBO_ITEM_ROW_CLASS}
    >
      <FormField
        id={categoryId}
        name={categoryId}
        label={COMBO_FORM_COPY.CATEGORY_LABEL}
        type={INPUT_TYPES.SELECT}
        options={categoryOptions}
        placeholder={COMBO_FORM_COPY.CATEGORY_PLACEHOLDER}
        value={item.categoryId}
        onChange={onCategoryChange}
        error={errors?.categoryId}
        showErrorText
        disabled={isDisabled}
        labelSuffix={STRING.Empty}
      />
      <div className={COMBO_ITEM_QUANTITY_ROW_CLASS}>
        <div className={COMBO_ITEM_STEPPER_CLASS}>
          <Button
            variant={BUTTON.BASE}
            type={BUTTON_TYPES.BUTTON}
            aria-label={
              COMBO_FORM_COPY.QUANTITY_DECREASE_LABEL
            }
            disabled={isDisabled}
            onClick={onQuantityDecrease}
            className={COMBO_ITEM_STEP_BUTTON_CLASS}
          >
            <MaterialIcon
              name={MATERIAL_ICON_NAME.REMOVE}
            />
          </Button>
          <div className={COMBO_ITEM_QUANTITY_FIELD_CLASS}>
            <FormField
              id={quantityId}
              name={quantityId}
              label={COMBO_FORM_COPY.QUANTITY_LABEL}
              type={INPUT_TYPES.TEXT}
              value={item.quantityText}
              onChange={onQuantityChange}
              error={errors?.quantity}
              showErrorText
              disabled={isDisabled}
              autoComplete={AUTOCOMPLETE.OFF}
              inputMode={INPUT_MODE.NUMERIC}
              labelSuffix={STRING.Empty}
              classNameField={
                COMBO_ITEM_QUANTITY_INPUT_CLASS
              }
            />
          </div>
          <Button
            variant={BUTTON.BASE}
            type={BUTTON_TYPES.BUTTON}
            aria-label={
              COMBO_FORM_COPY.QUANTITY_INCREASE_LABEL
            }
            disabled={isDisabled}
            onClick={onQuantityIncrease}
            className={COMBO_ITEM_STEP_BUTTON_CLASS}
          >
            <MaterialIcon name={MATERIAL_ICON_NAME.ADD} />
          </Button>
        </div>
        <Button
          variant={BUTTON.BASE}
          type={BUTTON_TYPES.BUTTON}
          disabled={isDisabled}
          onClick={onRemoveClick}
          className={COMBO_ITEM_REMOVE_BUTTON_CLASS}
        >
          <MaterialIcon name={MATERIAL_ICON_NAME.DELETE} />
          <InlineText>
            {COMBO_FORM_COPY.REMOVE_ITEM_BUTTON}
          </InlineText>
        </Button>
      </div>
    </div>
  );
};

export default ComboItemRow;
