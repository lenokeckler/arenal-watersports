import { InlineText, Label } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import { RESERVATION_REFUND_FIELD_ID } from "../constants/ReservationRefundUi.constants";
import type { ReservationRefundReasonOptionProps } from "../models/ReservationRefundReasonOptionProps.interface";
import {
  RESERVATION_REFUND_REASON_OPTION_LABEL_CLASS,
  RESERVATION_REFUND_REASON_RADIO_CLASS,
  resolveReservationRefundReasonOptionClassName,
} from "../styles/ReservationRefundChoice.styles";

const ReservationRefundReasonOption = ({
  id,
  isDisabled,
  isInvalid,
  isSelected,
  label,
  onSelect,
  value,
}: ReservationRefundReasonOptionProps): React.JSX.Element => (
  <Label
    className={resolveReservationRefundReasonOptionClassName(
      { isDisabled, isSelected }
    )}
    htmlFor={id}
  >
    <input
      aria-invalid={isInvalid}
      checked={isSelected}
      className={RESERVATION_REFUND_REASON_RADIO_CLASS}
      disabled={isDisabled}
      id={id}
      name={RESERVATION_REFUND_FIELD_ID.REASON_GROUP}
      onChange={() => onSelect(value)}
      type={INPUT_TYPES.RADIO}
      value={value}
    />
    <InlineText
      className={
        RESERVATION_REFUND_REASON_OPTION_LABEL_CLASS
      }
    >
      {label}
    </InlineText>
  </Label>
);

export default ReservationRefundReasonOption;
