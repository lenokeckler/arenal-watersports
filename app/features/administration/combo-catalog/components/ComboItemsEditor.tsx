import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import type { ComboFormViewModel } from "../models/ComboFormViewModel.interface";
import {
  COMBO_FORM_GROUP_CLASS,
  COMBO_FORM_GROUP_TITLE_CLASS,
  COMBO_ITEM_BUTTON_CLASS,
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
        onRemoveClick={onRemoveItem(index)}
      />
    ))}
    {errors.items && (
      <Text className={COMBO_ITEMS_ERROR_CLASS}>
        {errors.items}
      </Text>
    )}
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onAddItem}
      className={COMBO_ITEM_BUTTON_CLASS}
    >
      {COMBO_FORM_COPY.ADD_ITEM_BUTTON}
    </Button>
  </div>
);

export default ComboItemsEditor;
