import { useId } from "react";
import {
  FormField,
  InlineText,
  Label,
  MaterialIcon,
  Text,
} from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { INPUT_TYPES } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY as COPY } from "../constants/ReservationPostponementFormCopy.constants";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import type { ReservationPostponementFormPartProps } from "../models/ReservationPostponementFormPartProps.interface";
import {
  RESERVATION_POSTPONEMENT_OPTION_ICON_CLASS,
  RESERVATION_POSTPONEMENT_OPTION_INPUT_CLASS,
  resolveReservationPostponementOptionClassName,
  resolveReservationPostponementOptionTextClassName,
} from "../styles/ReservationPostponementCauseOption.styles";
import {
  RESERVATION_POSTPONEMENT_CAUSE_CLASS,
  RESERVATION_POSTPONEMENT_CAUSE_GRID_CLASS,
  RESERVATION_POSTPONEMENT_ERROR_TEXT_CLASS,
  RESERVATION_POSTPONEMENT_HINT_CLASS,
  RESERVATION_POSTPONEMENT_LEGEND_CLASS,
} from "../styles/ReservationPostponementForm.styles";

const ReservationPostponementCauseChoice = ({
  viewModel,
}: ReservationPostponementFormPartProps): React.JSX.Element => {
  const errorId = useId();
  const helperId = useId();
  const { cause, reason } = viewModel.draft;
  const error = viewModel.errors.cause;

  return (
    <fieldset
      className={RESERVATION_POSTPONEMENT_CAUSE_CLASS}
      aria-describedby={error ? errorId : helperId}
      aria-invalid={Boolean(error)}
    >
      <legend
        className={RESERVATION_POSTPONEMENT_LEGEND_CLASS}
      >
        {COPY.LABEL_CAUSE}
      </legend>
      <div
        className={
          RESERVATION_POSTPONEMENT_CAUSE_GRID_CLASS
        }
      >
        {viewModel.causes.map((option, index) => {
          const isSelected = option === cause;

          return (
            <Label
              key={option}
              className={resolveReservationPostponementOptionClassName(
                isSelected
              )}
            >
              <input
                id={
                  index === 0
                    ? RESERVATION_POSTPONEMENT_FIELD_ID.CAUSE
                    : undefined
                }
                type={INPUT_TYPES.RADIO}
                name={
                  RESERVATION_POSTPONEMENT_FIELD_ID.CAUSE
                }
                value={option}
                checked={isSelected}
                disabled={viewModel.isPending}
                aria-invalid={Boolean(error)}
                className={
                  RESERVATION_POSTPONEMENT_OPTION_INPUT_CLASS
                }
                onChange={() => viewModel.setCause(option)}
              />
              <InlineText
                className={resolveReservationPostponementOptionTextClassName(
                  isSelected
                )}
              >
                {COPY.CAUSE_LABEL[option]}
              </InlineText>
              {isSelected && (
                <MaterialIcon
                  name={MATERIAL_ICON_NAME.CHECK}
                  className={
                    RESERVATION_POSTPONEMENT_OPTION_ICON_CLASS
                  }
                />
              )}
            </Label>
          );
        })}
      </div>
      {error && (
        <Text
          id={errorId}
          className={
            RESERVATION_POSTPONEMENT_ERROR_TEXT_CLASS
          }
        >
          {error}
        </Text>
      )}
      {cause === RESERVATION_POSTPONEMENT_CAUSE.OTHER && (
        <FormField
          id={RESERVATION_POSTPONEMENT_FIELD_ID.REASON}
          name={RESERVATION_POSTPONEMENT_FIELD_ID.REASON}
          label={COPY.LABEL_REASON}
          type={INPUT_TYPES.TEXTAREA}
          placeholder={COPY.REASON_PLACEHOLDER}
          value={reason}
          disabled={viewModel.isPending}
          describedBy={helperId}
          onChange={(event) =>
            viewModel.setReason(event.target.value)
          }
          error={viewModel.errors.reason}
          showErrorText
          variant={FORM_FIELD_VARIANT.GLASS}
        />
      )}
      <Text
        id={helperId}
        className={RESERVATION_POSTPONEMENT_HINT_CLASS}
      >
        {COPY.REASON_HELPER}
      </Text>
    </fieldset>
  );
};

export default ReservationPostponementCauseChoice;
