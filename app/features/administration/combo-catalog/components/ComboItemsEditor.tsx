import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { COMBO_ITEM_QUANTITY_STEP } from "../constants/ComboItemQuantity.constants";
import type { ComboFormViewModel } from "../models/ComboFormViewModel.interface";
import {
  COMBO_FORM_GROUP_CLASS,
  COMBO_FORM_GROUP_TITLE_CLASS,
  COMBO_ITEM_ADD_BUTTON_CLASS,
  COMBO_ITEMS_ERROR_CLASS,
} from "../styles/ComboForm.styles";
import ComboItemRow from "./ComboItemRow";

const ComboItemsEditor = ({
  categoryFieldOptions,
  errors,
  isSubmitting,
  onAddItem,
  onItemCategoryChange,
  onItemQuantityChange,
  onItemQuantityStep,
  onRemoveItem,
  values,
}: ComboFormViewModel): React.JSX.Element => (
  <div className={COMBO_FORM_GROUP_CLASS}>
    <Text className={COMBO_FORM_GROUP_TITLE_CLASS}>
      {COMBO_FORM_COPY.ITEMS_TITLE}
    </Text>
    {values.items.map((item, index) => (
      <ComboItemRow
        key={index}
        categoryOptions={categoryFieldOptions}
        errors={errors.itemErrors[index]}
        index={index}
        isDisabled={isSubmitting}
        item={item}
        onCategoryChange={onItemCategoryChange(index)}
        onQuantityChange={onItemQuantityChange(index)}
        onQuantityDecrease={onItemQuantityStep(
          index,
          COMBO_ITEM_QUANTITY_STEP.DECREASE
        )}
        onQuantityIncrease={onItemQuantityStep(
          index,
          COMBO_ITEM_QUANTITY_STEP.INCREASE
        )}
        onRemoveClick={onRemoveItem(index)}
      />
    ))}
    {errors.items && (
      <Text className={COMBO_ITEMS_ERROR_CLASS}>
        {errors.items}
      </Text>
    )}
    <Button
      variant={BUTTON.BASE}
      type={BUTTON_TYPES.BUTTON}
      disabled={isSubmitting}
      onClick={onAddItem}
      className={COMBO_ITEM_ADD_BUTTON_CLASS}
    >
      <MaterialIcon name={MATERIAL_ICON_NAME.ADD} />
      <InlineText>
        {COMBO_FORM_COPY.ADD_ITEM_BUTTON}
      </InlineText>
    </Button>
  </div>
);

export default ComboItemsEditor;
