import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import type { CustomComboEquipmentCardProps } from "../models/CustomComboEquipmentCardProps.interface";
import {
  CUSTOM_COMBO_ADD_BUTTON_CLASS,
  CUSTOM_COMBO_CATEGORY_ACTIONS_CLASS,
  CUSTOM_COMBO_CATEGORY_CARD_CLASS,
} from "../styles/CustomComboEquipmentSelection.styles";
import CustomComboEquipmentCardHeader from "./CustomComboEquipmentCardHeader";
import CustomComboEquipmentQuantityControl from "./CustomComboEquipmentQuantityControl";

const CustomComboEquipmentCard = ({
  category,
  onAdd,
  onDecrease,
  onIncrease,
  selection,
}: CustomComboEquipmentCardProps): React.JSX.Element => (
  <article className={CUSTOM_COMBO_CATEGORY_CARD_CLASS}>
    <CustomComboEquipmentCardHeader category={category} />
    <div className={CUSTOM_COMBO_CATEGORY_ACTIONS_CLASS}>
      {selection ? (
        <CustomComboEquipmentQuantityControl
          categoryName={category.name}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
          quantity={selection.quantity}
        />
      ) : (
        <Button
          className={CUSTOM_COMBO_ADD_BUTTON_CLASS}
          onClick={onAdd}
          type="button"
          variant={BUTTON.BASE}
        >
          {CUSTOM_COMBO_FORM_COPY.ADD}
        </Button>
      )}
    </div>
  </article>
);

export default CustomComboEquipmentCard;
