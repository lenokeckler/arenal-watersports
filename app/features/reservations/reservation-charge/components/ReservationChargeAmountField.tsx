import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import {
  RESERVATION_CHARGE_AMOUNT_INPUT_CLASS,
  RESERVATION_CHARGE_HINT_CLASS,
} from "../styles/ReservationChargeForm.styles";

const ReservationChargeAmountField = ({
  charge,
  viewModel,
}: ReservationChargeFormProps): React.JSX.Element => (
  <div>
    <FormField
      id={FIELD_ID.AMOUNT}
      name={FIELD_ID.AMOUNT}
      label={COPY.AMOUNT_LABEL[viewModel.currency]}
      type={INPUT_TYPES.TEXT}
      inputMode={INPUT_MODE.DECIMAL}
      autoComplete={AUTOCOMPLETE.OFF}
      spellCheck={false}
      placeholder={COPY.AMOUNT_PLACEHOLDER}
      classNameField={RESERVATION_CHARGE_AMOUNT_INPUT_CLASS}
      value={viewModel.amountText}
      disabled={viewModel.isPending}
      describedBy={FIELD_ID.AMOUNT_HELPER}
      onChange={(event) =>
        viewModel.setAmountText(event.target.value)
      }
      error={viewModel.errors.amount}
      showErrorText
      variant={FORM_FIELD_VARIANT.GLASS}
    />
    <Text
      id={FIELD_ID.AMOUNT_HELPER}
      className={RESERVATION_CHARGE_HINT_CLASS}
    >
      {charge.proposal[viewModel.currency] === null
        ? COPY.AMOUNT_HELPER_MANUAL
        : COPY.AMOUNT_HELPER_PROPOSED}
    </Text>
  </div>
);

export default ReservationChargeAmountField;
