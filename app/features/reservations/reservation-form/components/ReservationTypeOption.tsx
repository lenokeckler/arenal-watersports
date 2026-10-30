import InlineText from "@/app/components/text/InlineText";
import Label from "@/app/components/text/Label";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { ReservationTypeOptionProps } from "../models/ReservationTypeOptionProps.interface";
import {
  RESERVATION_TYPE_OPTION_DESCRIPTION_CLASS,
  RESERVATION_TYPE_OPTION_LABEL_CLASS,
  resolveReservationTypeOptionClassName,
  RESERVATION_TYPE_RADIO_CLASS,
} from "../styles/ReservationTypeField.styles";

const ReservationTypeOption = ({
  isSelected,
  onSelect,
  description,
  id,
  label,
  value,
}: ReservationTypeOptionProps): React.JSX.Element => (
  <Label
    className={resolveReservationTypeOptionClassName(
      isSelected
    )}
    htmlFor={id}
  >
    <input
      checked={isSelected}
      className={RESERVATION_TYPE_RADIO_CLASS}
      id={id}
      name={RESERVATION_FORM_FIELD.RESERVATION_TYPE}
      onChange={() => onSelect(value)}
      type="radio"
      value={value}
    />
    <InlineText
      className={RESERVATION_TYPE_OPTION_LABEL_CLASS}
    >
      {label}
    </InlineText>
    <InlineText
      className={RESERVATION_TYPE_OPTION_DESCRIPTION_CLASS}
    >
      {description}
    </InlineText>
  </Label>
);

export default ReservationTypeOption;
