import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import {
  ARIA_ROLE,
  AUTOCOMPLETE,
  BUTTON,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { COMBO_FORM_FIELD_ID } from "../constants/ComboFormFieldId.constants";
import type { ComboItemRowProps } from "../models/ComboItemRowProps.interface";
import {
  COMBO_ITEM_BUTTON_CLASS,
  COMBO_ITEM_ROW_CLASS,
} from "../styles/ComboForm.styles";

const ComboItemRow = ({
  categoryOptions,
  errors,
  index,
  isDisabled,
  item,
  onCategoryChange,
  onQuantityChange,
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
      />
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
      />
      <Button
        variant={BUTTON.SECONDARY}
        type="button"
        disabled={isDisabled}
        onClick={onRemoveClick}
        className={COMBO_ITEM_BUTTON_CLASS}
      >
        {COMBO_FORM_COPY.REMOVE_ITEM_BUTTON}
      </Button>
    </div>
  );
};

export default ComboItemRow;
