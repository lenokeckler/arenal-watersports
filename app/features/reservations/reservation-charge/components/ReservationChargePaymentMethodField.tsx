import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  ARIA_ROLE,
  AUTOCOMPLETE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import {
  RESERVATION_CHARGE_PAYMENT_CHOICE,
  RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER,
} from "../constants/ReservationChargePaymentChoice.constants";
import {
  RESERVATION_CHARGE_FIELD_ID as FIELD_ID,
  RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID,
} from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import {
  RESERVATION_CHARGE_CURRENCY_FIELDSET_CLASS,
  RESERVATION_CHARGE_CURRENCY_LEGEND_CLASS,
} from "../styles/ReservationChargeCurrency.styles";
import { RESERVATION_CHARGE_HINT_CLASS } from "../styles/ReservationChargeForm.styles";
import {
  RESERVATION_CHARGE_PAYMENT_METHOD_ERROR_CLASS,
  RESERVATION_CHARGE_PAYMENT_METHOD_GRID_CLASS,
  RESERVATION_CHARGE_PAYMENT_METHOD_GROUP_CLASS,
} from "../styles/ReservationChargePaymentMethod.styles";
import ReservationChargePaymentChoiceOption from "./ReservationChargePaymentChoiceOption";

const ReservationChargePaymentMethodField = ({
  viewModel,
}: Pick<
  ReservationChargeFormProps,
  "viewModel"
>): React.JSX.Element => {
  const groupError = viewModel.errors.paymentChoice;
  const describedBy = [
    groupError ? FIELD_ID.PAYMENT_METHOD_ERROR : null,
    FIELD_ID.PAYMENT_METHOD_HELPER,
  ]
    .filter(Boolean)
    .join(STRING.SPACE);

  return (
    <div
      className={
        RESERVATION_CHARGE_PAYMENT_METHOD_GROUP_CLASS
      }
    >
      <fieldset
        aria-describedby={describedBy}
        className={
          RESERVATION_CHARGE_CURRENCY_FIELDSET_CLASS
        }
      >
        <legend
          className={
            RESERVATION_CHARGE_CURRENCY_LEGEND_CLASS
          }
        >
          {COPY.LABEL_METHOD}
        </legend>
        <div
          className={
            RESERVATION_CHARGE_PAYMENT_METHOD_GRID_CLASS
          }
        >
          {RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER.map(
            (choice) => (
              <ReservationChargePaymentChoiceOption
                key={choice}
                choice={choice}
                id={RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID(
                  choice
                )}
                isDisabled={viewModel.isPending}
                isInvalid={Boolean(groupError)}
                isSelected={
                  viewModel.paymentChoice === choice
                }
                label={COPY.PAYMENT_CHOICE_LABEL[choice]}
                name={FIELD_ID.PAYMENT_METHOD}
                onSelect={viewModel.setPaymentChoice}
              />
            )
          )}
        </div>
      </fieldset>
      {groupError ? (
        <Text
          id={FIELD_ID.PAYMENT_METHOD_ERROR}
          className={
            RESERVATION_CHARGE_PAYMENT_METHOD_ERROR_CLASS
          }
          role={ARIA_ROLE.ALERT}
        >
          {groupError}
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
};

export default ReservationChargePaymentMethodField;
