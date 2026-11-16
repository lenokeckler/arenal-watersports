import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_FIELD_ID as FIELD_ID } from "../constants/ReservationRefundUi.constants";
import type { ReservationRefundFormProps } from "../models/ReservationRefundFormProps.interface";
import {
  RESERVATION_REFUND_AMOUNT_INPUT_CLASS,
  RESERVATION_REFUND_HINT_CLASS,
} from "../styles/ReservationRefundForm.styles";

const ReservationRefundAmountField = ({
  viewModel,
}: Pick<
  ReservationRefundFormProps,
  "viewModel"
>): React.JSX.Element => (
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
      classNameField={RESERVATION_REFUND_AMOUNT_INPUT_CLASS}
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
      className={RESERVATION_REFUND_HINT_CLASS}
    >
      {COPY.AMOUNT_HELPER(
        formatMoney({
          amount: viewModel.available,
          currency: viewModel.currency,
        })
      )}
    </Text>
  </div>
);

export default ReservationRefundAmountField;
