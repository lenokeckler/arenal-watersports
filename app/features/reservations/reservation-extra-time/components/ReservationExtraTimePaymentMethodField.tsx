import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_TYPES,
  PAYMENT_CHOICE,
  PAYMENT_CHOICE_COPY,
  PAYMENT_CHOICE_ORDER,
  STRING,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as COPY } from "../constants/ReservationExtraTimeFormCopy.constants";
import {
  RESERVATION_EXTRA_TIME_FIELD_ID as FIELD_ID,
  RESERVATION_EXTRA_TIME_PAYMENT_CHOICE_OPTION_ID,
} from "../constants/ReservationExtraTimeUi.constants";
import type { ReservationExtraTimeFieldProps } from "../models/ReservationExtraTimeFieldProps.interface";
import {
  RESERVATION_EXTRA_TIME_CHIP_GRID_CLASS,
  RESERVATION_EXTRA_TIME_ERROR_CLASS,
  RESERVATION_EXTRA_TIME_FIELDSET_CLASS,
  RESERVATION_EXTRA_TIME_HINT_CLASS,
  RESERVATION_EXTRA_TIME_LEGEND_CLASS,
} from "../styles/ReservationExtraTimeForm.styles";
import ReservationExtraTimeOption from "./ReservationExtraTimeOption";

const ReservationExtraTimePaymentMethodField = ({
  viewModel,
}: ReservationExtraTimeFieldProps): React.JSX.Element => {
  const groupError = viewModel.errors.paymentChoice;
  const describedBy = [
    groupError ? FIELD_ID.PAYMENT_METHOD_ERROR : null,
    FIELD_ID.PAYMENT_METHOD_HELPER,
  ]
    .filter(Boolean)
    .join(STRING.SPACE);

  return (
    <div>
      <fieldset
        aria-describedby={describedBy}
        aria-invalid={groupError ? true : undefined}
        className={RESERVATION_EXTRA_TIME_FIELDSET_CLASS}
      >
        <legend
          className={RESERVATION_EXTRA_TIME_LEGEND_CLASS}
        >
          {COPY.LABEL_METHOD}
        </legend>
        <div
          className={RESERVATION_EXTRA_TIME_CHIP_GRID_CLASS}
        >
          {PAYMENT_CHOICE_ORDER.map((choice) => (
            <ReservationExtraTimeOption
              key={choice}
              id={RESERVATION_EXTRA_TIME_PAYMENT_CHOICE_OPTION_ID(
                choice
              )}
              isChip
              isDisabled={viewModel.isPending}
              isSelected={
                viewModel.paymentChoice === choice
              }
              label={PAYMENT_CHOICE_COPY[choice]}
              name={FIELD_ID.PAYMENT_METHOD}
              onSelect={viewModel.setPaymentChoice}
              value={choice}
            />
          ))}
        </div>
      </fieldset>
      {groupError ? (
        <Text
          id={FIELD_ID.PAYMENT_METHOD_ERROR}
          className={RESERVATION_EXTRA_TIME_ERROR_CLASS}
        >
          {groupError}
        </Text>
      ) : null}
      <Text
        id={FIELD_ID.PAYMENT_METHOD_HELPER}
        className={RESERVATION_EXTRA_TIME_HINT_CLASS}
      >
        {COPY.METHOD_HELPER}
      </Text>
      {viewModel.paymentChoice === PAYMENT_CHOICE.OTHER ? (
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

export default ReservationExtraTimePaymentMethodField;
