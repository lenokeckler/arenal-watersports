import { InlineText, Label } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import { RESERVATION_CANCELLATION_FIELD_ID } from "../constants/ReservationCancellationUi.constants";
import type { ReservationCancellationCauseOptionProps } from "../models/ReservationCancellationCauseOptionProps.interface";
import {
  RESERVATION_CANCELLATION_CAUSE_OPTION_DESCRIPTION_CLASS,
  RESERVATION_CANCELLATION_CAUSE_OPTION_LABEL_CLASS,
  RESERVATION_CANCELLATION_CAUSE_RADIO_CLASS,
  resolveReservationCancellationCauseOptionClassName,
} from "../styles/ReservationCancellationCause.styles";

const ReservationCancellationCauseOption = ({
  description,
  hasError,
  id,
  isDisabled,
  isSelected,
  label,
  onSelect,
  value,
}: ReservationCancellationCauseOptionProps): React.JSX.Element => (
  <Label
    className={resolveReservationCancellationCauseOptionClassName(
      { hasError, isDisabled, isSelected }
    )}
    htmlFor={id}
  >
    <input
      checked={isSelected}
      className={RESERVATION_CANCELLATION_CAUSE_RADIO_CLASS}
      disabled={isDisabled}
      id={id}
      name={RESERVATION_CANCELLATION_FIELD_ID.CAUSE}
      onChange={() => onSelect(value)}
      type={INPUT_TYPES.RADIO}
      value={value}
    />
    <InlineText
      className={
        RESERVATION_CANCELLATION_CAUSE_OPTION_LABEL_CLASS
      }
    >
      {label}
    </InlineText>
    <InlineText
      className={
        RESERVATION_CANCELLATION_CAUSE_OPTION_DESCRIPTION_CLASS
      }
    >
      {description}
    </InlineText>
  </Label>
);

export default ReservationCancellationCauseOption;
