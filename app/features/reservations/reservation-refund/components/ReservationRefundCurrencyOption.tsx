import { InlineText, Label } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import { RESERVATION_REFUND_FIELD_ID } from "../constants/ReservationRefundUi.constants";
import type { ReservationRefundCurrencyOptionProps } from "../models/ReservationRefundCurrencyOptionProps.interface";
import {
  RESERVATION_REFUND_CURRENCY_OPTION_DESCRIPTION_CLASS,
  RESERVATION_REFUND_CURRENCY_OPTION_LABEL_CLASS,
  RESERVATION_REFUND_CURRENCY_RADIO_CLASS,
  resolveReservationRefundCurrencyOptionClassName,
} from "../styles/ReservationRefundChoice.styles";

const ReservationRefundCurrencyOption = ({
  description,
  id,
  isDisabled,
  isSelected,
  label,
  onSelect,
  value,
}: ReservationRefundCurrencyOptionProps): React.JSX.Element => (
  <Label
    className={resolveReservationRefundCurrencyOptionClassName(
      { isDisabled, isSelected }
    )}
    htmlFor={id}
  >
    <input
      checked={isSelected}
      className={RESERVATION_REFUND_CURRENCY_RADIO_CLASS}
      disabled={isDisabled}
      id={id}
      name={RESERVATION_REFUND_FIELD_ID.CURRENCY}
      onChange={() => onSelect(value)}
      type={INPUT_TYPES.RADIO}
      value={value}
    />
    <InlineText
      className={
        RESERVATION_REFUND_CURRENCY_OPTION_LABEL_CLASS
      }
    >
      {label}
    </InlineText>
    <InlineText
      className={
        RESERVATION_REFUND_CURRENCY_OPTION_DESCRIPTION_CLASS
      }
    >
      {description}
    </InlineText>
  </Label>
);

export default ReservationRefundCurrencyOption;
