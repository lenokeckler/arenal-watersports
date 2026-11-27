import { Text } from "@/app/components";
import { RESERVATION_EXTRA_TIME_FORM_COPY as COPY } from "../constants/ReservationExtraTimeFormCopy.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME_ORDER } from "../constants/ReservationExtraTimeOutcome.constants";
import {
  RESERVATION_EXTRA_TIME_FIELD_ID as FIELD_ID,
  RESERVATION_EXTRA_TIME_OUTCOME_OPTION_ID,
} from "../constants/ReservationExtraTimeUi.constants";
import type { ReservationExtraTimeFieldProps } from "../models/ReservationExtraTimeFieldProps.interface";
import {
  RESERVATION_EXTRA_TIME_ERROR_CLASS,
  RESERVATION_EXTRA_TIME_FIELDSET_CLASS,
  RESERVATION_EXTRA_TIME_LEGEND_CLASS,
  RESERVATION_EXTRA_TIME_OUTCOME_GRID_CLASS,
} from "../styles/ReservationExtraTimeForm.styles";
import ReservationExtraTimeOption from "./ReservationExtraTimeOption";

const ReservationExtraTimeOutcomeField = ({
  viewModel,
}: ReservationExtraTimeFieldProps): React.JSX.Element => (
  <fieldset
    aria-describedby={
      viewModel.errors.outcome
        ? FIELD_ID.OUTCOME_ERROR
        : undefined
    }
    aria-invalid={
      viewModel.errors.outcome ? true : undefined
    }
    className={RESERVATION_EXTRA_TIME_FIELDSET_CLASS}
  >
    <legend className={RESERVATION_EXTRA_TIME_LEGEND_CLASS}>
      {COPY.OUTCOME_LEGEND}
    </legend>
    <div
      className={RESERVATION_EXTRA_TIME_OUTCOME_GRID_CLASS}
    >
      {RESERVATION_EXTRA_TIME_OUTCOME_ORDER.map(
        (outcome) => (
          <ReservationExtraTimeOption
            key={outcome}
            description={COPY.OUTCOME_HELPER[outcome]}
            id={RESERVATION_EXTRA_TIME_OUTCOME_OPTION_ID(
              outcome
            )}
            isChip={false}
            isDisabled={viewModel.isPending}
            isSelected={viewModel.outcome === outcome}
            label={COPY.OUTCOME_LABEL[outcome]}
            name={FIELD_ID.OUTCOME}
            onSelect={viewModel.setOutcome}
            value={outcome}
          />
        )
      )}
    </div>
    {viewModel.errors.outcome ? (
      <Text
        id={FIELD_ID.OUTCOME_ERROR}
        className={RESERVATION_EXTRA_TIME_ERROR_CLASS}
      >
        {viewModel.errors.outcome}
      </Text>
    ) : null}
  </fieldset>
);

export default ReservationExtraTimeOutcomeField;
