import InlineText from "@/app/components/text/InlineText";
import Label from "@/app/components/text/Label";
import Text from "@/app/components/text/Text";
import { INPUT_TYPES } from "@/app/constants";
import { CUSTOM_COMBO_FORM_CURRENCY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationExtraOptionProps } from "../models/ReservationExtraOptionProps.interface";
import {
  RESERVATION_EXTRAS_CHECKBOX_CLASS,
  RESERVATION_EXTRAS_INVENTORY_CLASS,
  RESERVATION_EXTRAS_OPTION_CONTENT_CLASS,
  RESERVATION_EXTRAS_PRICES_CLASS,
  resolveReservationExtrasOptionClassName,
} from "../styles/ReservationExtras.styles";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";

const ReservationExtraOption = ({
  extraId,
  isSelected,
  name,
  occupiesInventory,
  onToggle,
  priceCrc,
  priceUsd,
}: ReservationExtraOptionProps): React.JSX.Element => (
  <Label
    className={resolveReservationExtrasOptionClassName(
      isSelected
    )}
  >
    <input
      checked={isSelected}
      className={RESERVATION_EXTRAS_CHECKBOX_CLASS}
      onChange={() => onToggle(extraId)}
      type={INPUT_TYPES.CHECKBOX}
      value={extraId}
    />
    <div
      className={RESERVATION_EXTRAS_OPTION_CONTENT_CLASS}
    >
      <InlineText>{name}</InlineText>
      <div className={RESERVATION_EXTRAS_PRICES_CLASS}>
        <InlineText>
          {CUSTOM_COMBO_FORM_CURRENCY.CRC}:{" "}
          {formatCustomComboAmount(
            priceCrc,
            CUSTOM_COMBO_FORM_CURRENCY.CRC
          )}
        </InlineText>
        <InlineText>
          {CUSTOM_COMBO_FORM_CURRENCY.USD}:{" "}
          {formatCustomComboAmount(
            priceUsd,
            CUSTOM_COMBO_FORM_CURRENCY.USD
          )}
        </InlineText>
      </div>
      {occupiesInventory ? (
        <Text
          className={RESERVATION_EXTRAS_INVENTORY_CLASS}
        >
          {RESERVATION_FORM_UI_COPY.EXTRA_INVENTORY_NOTE}
        </Text>
      ) : null}
    </div>
  </Label>
);

export default ReservationExtraOption;
