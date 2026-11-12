import { Text } from "@/app/components";
import { RESERVATION_CANCELLATION_CAUSE_COPY } from "../constants/ReservationCancellationCauseCopy.constants";
import { RESERVATION_CANCELLATION_CAUSE_OPTIONS } from "../constants/ReservationCancellationCauseOptions.constants";
import { RESERVATION_CANCELLATION_FORM_COPY as COPY } from "../constants/ReservationCancellationFormCopy.constants";
import { RESERVATION_CANCELLATION_FIELD_ID as FIELD_ID } from "../constants/ReservationCancellationUi.constants";
import type { ReservationCancellationCauseFieldProps } from "../models/ReservationCancellationCauseFieldProps.interface";
import {
  RESERVATION_CANCELLATION_CAUSE_ERROR_CLASS,
  RESERVATION_CANCELLATION_CAUSE_FIELDSET_CLASS,
  RESERVATION_CANCELLATION_CAUSE_GRID_CLASS,
  RESERVATION_CANCELLATION_CAUSE_HELPER_CLASS,
  RESERVATION_CANCELLATION_CAUSE_LEGEND_CLASS,
} from "../styles/ReservationCancellationCause.styles";
import ReservationCancellationCauseOption from "./ReservationCancellationCauseOption";

const ReservationCancellationCauseField = ({
  viewModel,
}: ReservationCancellationCauseFieldProps): React.JSX.Element => {
  const error = viewModel.errors.cause;

  return (
    <fieldset
      aria-describedby={
        error
          ? `${FIELD_ID.CAUSE_HELPER} ${FIELD_ID.CAUSE_ERROR}`
          : FIELD_ID.CAUSE_HELPER
      }
      className={
        RESERVATION_CANCELLATION_CAUSE_FIELDSET_CLASS
      }
    >
      <legend
        className={
          RESERVATION_CANCELLATION_CAUSE_LEGEND_CLASS
        }
      >
        {COPY.LABEL_CAUSE}
      </legend>
      <Text
        id={FIELD_ID.CAUSE_HELPER}
        className={
          RESERVATION_CANCELLATION_CAUSE_HELPER_CLASS
        }
      >
        {COPY.CAUSE_HELPER}
      </Text>
      {error && (
        <Text
          id={FIELD_ID.CAUSE_ERROR}
          className={
            RESERVATION_CANCELLATION_CAUSE_ERROR_CLASS
          }
        >
          {error}
        </Text>
      )}
      <div
        className={
          RESERVATION_CANCELLATION_CAUSE_GRID_CLASS
        }
      >
        {RESERVATION_CANCELLATION_CAUSE_OPTIONS.map(
          (option) => (
            <ReservationCancellationCauseOption
              key={option.value}
              description={
                RESERVATION_CANCELLATION_CAUSE_COPY[
                  option.value
                ].description
              }
              hasError={Boolean(error)}
              id={option.id}
              isDisabled={viewModel.isPending}
              isSelected={viewModel.cause === option.value}
              label={
                RESERVATION_CANCELLATION_CAUSE_COPY[
                  option.value
                ].label
              }
              onSelect={viewModel.setCause}
              value={option.value}
            />
          )
        )}
      </div>
    </fieldset>
  );
};

export default ReservationCancellationCauseField;
