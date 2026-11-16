import {
  FormField,
  InlineText,
  Label,
  Text,
} from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { AUTOCOMPLETE, INPUT_TYPES } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import {
  RESERVATION_CHARGE_PAYMENT_CHOICE,
  RESERVATION_CHARGE_PAYMENT_CHOICE_LABEL,
  RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER,
} from "../constants/ReservationChargePaymentChoice.constants";
import {
  RESERVATION_CHARGE_FIELD_ID as FIELD_ID,
  RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID,
} from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import { RESERVATION_CHARGE_HINT_CLASS } from "../styles/ReservationChargeForm.styles";

const ReservationChargePaymentMethodField = ({
  viewModel,
}: Pick<
  ReservationChargeFormProps,
  "viewModel"
>): React.JSX.Element => (
  <div>
    <fieldset>
      <legend>{COPY.LABEL_METHOD}</legend>
      {RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER.map(
        (choice) => (
          <Label
            key={choice}
            htmlFor={RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID(
              choice
            )}
          >
            <input
              checked={viewModel.paymentChoice === choice}
              disabled={viewModel.isPending}
              id={RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID(
                choice
              )}
              name={FIELD_ID.PAYMENT_METHOD}
              onChange={() =>
                viewModel.setPaymentChoice(choice)
              }
              type={INPUT_TYPES.RADIO}
              value={choice}
            />
            <InlineText>
              {
                RESERVATION_CHARGE_PAYMENT_CHOICE_LABEL[
                  choice
                ]
              }
            </InlineText>
          </Label>
        )
      )}
    </fieldset>
    {viewModel.errors.paymentChoice ? (
      <Text id={FIELD_ID.PAYMENT_METHOD_ERROR}>
        {viewModel.errors.paymentChoice}
      </Text>
    ) : null}
    <Text
      id={FIELD_ID.PAYMENT_METHOD_HELPER}
      className={RESERVATION_CHARGE_HINT_CLASS}
    >
      {COPY.METHOD_HELPER}
    </Text>
    {viewModel.paymentChoice ===
    RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER ? (
      <FormField
        id={FIELD_ID.OTHER_PAYMENT_METHOD}
        name={FIELD_ID.OTHER_PAYMENT_METHOD}
        label={COPY.OTHER_METHOD_LABEL}
        type={INPUT_TYPES.TEXT}
        autoComplete={AUTOCOMPLETE.OFF}
        placeholder={COPY.OTHER_METHOD_PLACEHOLDER}
        value={viewModel.otherPaymentMethod}
        disabled={viewModel.isPending}
        onChange={(event) =>
          viewModel.setOtherPaymentMethod(
            event.target.value
          )
        }
        error={viewModel.errors.otherPaymentMethod}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
    ) : null}
  </div>
);

export default ReservationChargePaymentMethodField;
