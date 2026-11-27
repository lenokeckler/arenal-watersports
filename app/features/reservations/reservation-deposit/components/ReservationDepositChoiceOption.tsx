import { InlineText, Label } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import type { ReservationDepositChoiceOptionProps } from "../models/ReservationDepositChoiceOptionProps.interface";
import {
  RESERVATION_DEPOSIT_CHOICE_DESCRIPTION_CLASS,
  RESERVATION_DEPOSIT_CHOICE_LABEL_CLASS,
  RESERVATION_DEPOSIT_CHOICE_RADIO_CLASS,
} from "../styles/ReservationDepositChoice.styles";

const ReservationDepositChoiceOption = ({
  className,
  description,
  id,
  isDisabled,
  isSelected,
  label,
  name,
  onSelect,
}: ReservationDepositChoiceOptionProps): React.JSX.Element => (
  <Label
    className={className}
    htmlFor={id}
  >
    <input
      checked={isSelected}
      className={RESERVATION_DEPOSIT_CHOICE_RADIO_CLASS}
      disabled={isDisabled}
      id={id}
      name={name}
      onChange={onSelect}
      type={INPUT_TYPES.RADIO}
      value={id}
    />
    <InlineText
      className={RESERVATION_DEPOSIT_CHOICE_LABEL_CLASS}
    >
      {label}
    </InlineText>
    {description === undefined ? null : (
      <InlineText
        className={
          RESERVATION_DEPOSIT_CHOICE_DESCRIPTION_CLASS
        }
      >
        {description}
      </InlineText>
    )}
  </Label>
);

export default ReservationDepositChoiceOption;
