import Button from "@/app/components/button/Button";
import InlineText from "@/app/components/text/InlineText";
import type { CustomComboEquipmentQuantityControlProps } from "../models/CustomComboEquipmentQuantityControlProps.interface";
import {
  CUSTOM_COMBO_QUANTITY_BUTTON_CLASS,
  CUSTOM_COMBO_QUANTITY_CLASS,
  CUSTOM_COMBO_QUANTITY_CONTROL_CLASS,
} from "../styles/CustomComboEquipmentSelection.styles";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";

const CustomComboEquipmentQuantityControl = ({
  categoryName,
  onDecrease,
  onIncrease,
  quantity,
}: CustomComboEquipmentQuantityControlProps): React.JSX.Element => (
  <div
    aria-label={`${CUSTOM_COMBO_FORM_COPY.QUANTITY}: ${categoryName}`}
    className={CUSTOM_COMBO_QUANTITY_CONTROL_CLASS}
    role="group"
  >
    <Button
      aria-label={`${CUSTOM_COMBO_FORM_COPY.DECREASE} ${categoryName}`}
      className={CUSTOM_COMBO_QUANTITY_BUTTON_CLASS}
      onClick={onDecrease}
      type="button"
    >
      {CUSTOM_COMBO_FORM_COPY.DECREMENT_SYMBOL}
    </Button>
    <InlineText className={CUSTOM_COMBO_QUANTITY_CLASS}>
      {quantity}
    </InlineText>
    <Button
      aria-label={`${CUSTOM_COMBO_FORM_COPY.INCREASE} ${categoryName}`}
      className={CUSTOM_COMBO_QUANTITY_BUTTON_CLASS}
      onClick={onIncrease}
      type="button"
    >
      {CUSTOM_COMBO_FORM_COPY.INCREMENT_SYMBOL}
    </Button>
  </div>
);

export default CustomComboEquipmentQuantityControl;
