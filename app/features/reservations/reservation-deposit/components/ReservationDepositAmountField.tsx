import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import { RESERVATION_DEPOSIT_FIELD_ID as FIELD_ID } from "../constants/ReservationDepositUi.constants";
import type { ReservationDepositAmountFieldProps } from "../models/ReservationDepositAmountFieldProps.interface";
import {
  RESERVATION_DEPOSIT_AMOUNT_INPUT_CLASS,
  RESERVATION_DEPOSIT_HINT_CLASS,
} from "../styles/ReservationDepositForm.styles";

const ReservationDepositAmountField = ({
  amountText,
  currency,
  error,
  isPending,
  onChange,
  proposal,
}: ReservationDepositAmountFieldProps): React.JSX.Element => (
  <div>
    <FormField
      id={FIELD_ID.AMOUNT}
      name={FIELD_ID.AMOUNT}
      label={COPY.AMOUNT_LABEL[currency]}
      type={INPUT_TYPES.TEXT}
      inputMode={INPUT_MODE.DECIMAL}
      autoComplete={AUTOCOMPLETE.OFF}
      spellCheck={false}
      placeholder={COPY.AMOUNT_PLACEHOLDER}
      classNameField={
        RESERVATION_DEPOSIT_AMOUNT_INPUT_CLASS
      }
      value={amountText}
      disabled={isPending}
      describedBy={FIELD_ID.AMOUNT_HELPER}
      onChange={(event) => onChange(event.target.value)}
      error={error}
      showErrorText
      variant={FORM_FIELD_VARIANT.GLASS}
    />
    <Text
      id={FIELD_ID.AMOUNT_HELPER}
      className={RESERVATION_DEPOSIT_HINT_CLASS}
    >
      {proposal[currency] > 0
        ? COPY.PROPOSAL_HELPER(
            formatMoney({
              amount: proposal[currency],
              currency,
            })
          )
        : COPY.NO_PROPOSAL_HELPER}
    </Text>
  </div>
);

export default ReservationDepositAmountField;
