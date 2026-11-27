import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as COPY } from "../constants/ReservationExtraTimeFormCopy.constants";
import { RESERVATION_EXTRA_TIME_FIELD_ID as FIELD_ID } from "../constants/ReservationExtraTimeUi.constants";
import type { ReservationExtraTimeFieldProps } from "../models/ReservationExtraTimeFieldProps.interface";
import {
  RESERVATION_EXTRA_TIME_AMOUNT_INPUT_CLASS,
  RESERVATION_EXTRA_TIME_HINT_CLASS,
} from "../styles/ReservationExtraTimeForm.styles";

const ReservationExtraTimeAmountField = ({
  viewModel,
}: ReservationExtraTimeFieldProps): React.JSX.Element => (
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
      classNameField={
        RESERVATION_EXTRA_TIME_AMOUNT_INPUT_CLASS
      }
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
      className={RESERVATION_EXTRA_TIME_HINT_CLASS}
    >
      {COPY.AMOUNT_HELPER}
    </Text>
  </div>
);

export default ReservationExtraTimeAmountField;
