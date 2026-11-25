import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import type { ReservationChargeAmountFieldProps } from "../models/ReservationChargeAmountFieldProps.interface";
import {
  RESERVATION_CHARGE_AMOUNT_INPUT_CLASS,
  RESERVATION_CHARGE_HINT_CLASS,
} from "../styles/ReservationChargeForm.styles";

const ReservationChargeAmountField = ({
  currency,
  error,
  helperId,
  id,
  isDisabled,
  note,
  noteId,
  onChange,
  proposal,
  value,
}: ReservationChargeAmountFieldProps): React.JSX.Element => {
  const describedBy = noteId
    ? `${helperId} ${noteId}`
    : helperId;

  return (
    <div>
      <FormField
        id={id}
        name={id}
        label={COPY.AMOUNT_LABEL[currency]}
        type={INPUT_TYPES.TEXT}
        inputMode={INPUT_MODE.DECIMAL}
        autoComplete={AUTOCOMPLETE.OFF}
        spellCheck={false}
        placeholder={COPY.AMOUNT_PLACEHOLDER}
        classNameField={
          RESERVATION_CHARGE_AMOUNT_INPUT_CLASS
        }
        value={value}
        disabled={isDisabled}
        describedBy={describedBy}
        onChange={(event) => onChange(event.target.value)}
        error={error}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
      <Text
        id={helperId}
        className={RESERVATION_CHARGE_HINT_CLASS}
      >
        {proposal === null
          ? COPY.AMOUNT_HELPER_MANUAL
          : COPY.AMOUNT_HELPER_PROPOSED}
      </Text>
      {note && (
        <Text
          id={noteId}
          className={RESERVATION_CHARGE_HINT_CLASS}
        >
          {note}
        </Text>
      )}
    </div>
  );
};

export default ReservationChargeAmountField;
