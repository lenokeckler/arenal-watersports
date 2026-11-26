import { InlineText, Label } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import type { ReservationChargePaymentChoiceOptionProps } from "../models/ReservationChargePaymentChoiceOptionProps.interface";
import {
  RESERVATION_CHARGE_CURRENCY_OPTION_LABEL_CLASS,
  RESERVATION_CHARGE_CURRENCY_RADIO_CLASS,
} from "../styles/ReservationChargeCurrency.styles";
import { resolveReservationChargePaymentMethodChipClassName } from "../styles/ReservationChargePaymentMethod.styles";

const ReservationChargePaymentChoiceOption = ({
  choice,
  id,
  isDisabled,
  isInvalid,
  isSelected,
  label,
  name,
  onSelect,
}: ReservationChargePaymentChoiceOptionProps): React.JSX.Element => (
  <Label
    className={resolveReservationChargePaymentMethodChipClassName(
      { isDisabled, isInvalid, isSelected }
    )}
    htmlFor={id}
  >
    <input
      checked={isSelected}
      className={RESERVATION_CHARGE_CURRENCY_RADIO_CLASS}
      disabled={isDisabled}
      id={id}
      name={name}
      onChange={() => onSelect(choice)}
      type={INPUT_TYPES.RADIO}
      value={choice}
    />
    <InlineText
      className={
        RESERVATION_CHARGE_CURRENCY_OPTION_LABEL_CLASS
      }
    >
      {label}
    </InlineText>
  </Label>
);

export default ReservationChargePaymentChoiceOption;
