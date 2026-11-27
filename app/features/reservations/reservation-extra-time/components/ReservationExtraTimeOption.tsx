import { InlineText, Label } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import type { ReservationExtraTimeOptionProps } from "../models/ReservationExtraTimeOptionProps.interface";
import {
  RESERVATION_EXTRA_TIME_OPTION_DESCRIPTION_CLASS,
  RESERVATION_EXTRA_TIME_RADIO_CLASS,
  resolveReservationExtraTimeOptionClassName,
  resolveReservationExtraTimeOptionLabelClassName,
} from "../styles/ReservationExtraTimeForm.styles";

const ReservationExtraTimeOption = <Value extends string>({
  description,
  id,
  isChip,
  isDisabled,
  isSelected,
  label,
  name,
  onSelect,
  value,
}: ReservationExtraTimeOptionProps<Value>): React.JSX.Element => (
  <Label
    className={resolveReservationExtraTimeOptionClassName({
      isChip,
      isDisabled,
      isSelected,
    })}
    htmlFor={id}
  >
    <input
      checked={isSelected}
      className={RESERVATION_EXTRA_TIME_RADIO_CLASS}
      disabled={isDisabled}
      id={id}
      name={name}
      onChange={() => onSelect(value)}
      type={INPUT_TYPES.RADIO}
      value={value}
    />
    <InlineText
      className={resolveReservationExtraTimeOptionLabelClassName(
        isChip
      )}
    >
      {label}
    </InlineText>
    {description ? (
      <InlineText
        className={
          RESERVATION_EXTRA_TIME_OPTION_DESCRIPTION_CLASS
        }
      >
        {description}
      </InlineText>
    ) : null}
  </Label>
);

export default ReservationExtraTimeOption;
