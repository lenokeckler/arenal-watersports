import { InlineText, Label } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import { RESERVATION_CHARGE_FIELD_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeCurrencyOptionProps } from "../models/ReservationChargeCurrencyOptionProps.interface";
import {
  RESERVATION_CHARGE_CURRENCY_OPTION_DESCRIPTION_CLASS,
  RESERVATION_CHARGE_CURRENCY_OPTION_LABEL_CLASS,
  RESERVATION_CHARGE_CURRENCY_RADIO_CLASS,
  resolveReservationChargeCurrencyOptionClassName,
} from "../styles/ReservationChargeCurrency.styles";

const ReservationChargeCurrencyOption = ({
  description,
  id,
  isDisabled,
  isSelected,
  label,
  onSelect,
  value,
}: ReservationChargeCurrencyOptionProps): React.JSX.Element => (
  <Label
    className={resolveReservationChargeCurrencyOptionClassName(
      { isDisabled, isSelected }
    )}
    htmlFor={id}
  >
    <input
      checked={isSelected}
      className={RESERVATION_CHARGE_CURRENCY_RADIO_CLASS}
      disabled={isDisabled}
      id={id}
      name={RESERVATION_CHARGE_FIELD_ID.CURRENCY}
      onChange={() => onSelect(value)}
      type={INPUT_TYPES.RADIO}
      value={value}
    />
    <InlineText
      className={
        RESERVATION_CHARGE_CURRENCY_OPTION_LABEL_CLASS
      }
    >
      {label}
    </InlineText>
    <InlineText
      className={
        RESERVATION_CHARGE_CURRENCY_OPTION_DESCRIPTION_CLASS
      }
    >
      {description}
    </InlineText>
  </Label>
);

export default ReservationChargeCurrencyOption;
