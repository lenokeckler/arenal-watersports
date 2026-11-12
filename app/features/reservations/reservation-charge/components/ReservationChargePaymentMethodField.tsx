import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { AUTOCOMPLETE, INPUT_TYPES } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import { RESERVATION_CHARGE_HINT_CLASS } from "../styles/ReservationChargeForm.styles";

const ReservationChargePaymentMethodField = ({
  viewModel,
}: Pick<
  ReservationChargeFormProps,
  "viewModel"
>): React.JSX.Element => (
  <div>
    <FormField
      id={FIELD_ID.PAYMENT_METHOD}
      name={FIELD_ID.PAYMENT_METHOD}
      label={COPY.LABEL_METHOD}
      type={INPUT_TYPES.TEXT}
      autoComplete={AUTOCOMPLETE.OFF}
      placeholder={COPY.METHOD_PLACEHOLDER}
      value={viewModel.paymentMethod}
      disabled={viewModel.isPending}
      describedBy={FIELD_ID.PAYMENT_METHOD_HELPER}
      onChange={(event) =>
        viewModel.setPaymentMethod(event.target.value)
      }
      error={viewModel.errors.paymentMethod}
      showErrorText
      variant={FORM_FIELD_VARIANT.GLASS}
    />
    <Text
      id={FIELD_ID.PAYMENT_METHOD_HELPER}
      className={RESERVATION_CHARGE_HINT_CLASS}
    >
      {COPY.METHOD_HELPER}
    </Text>
  </div>
);

export default ReservationChargePaymentMethodField;
