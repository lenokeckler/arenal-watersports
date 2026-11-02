import { Section, Text } from "@/app/components";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import {
  RESERVATION_SPLIT_FIELD_ID,
  RESERVATION_SPLIT_LIST_SEPARATOR,
} from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitDepartureCardProps } from "../models/ReservationSplitDepartureCardProps.interface";
import {
  RESERVATION_SPLIT_DEPARTURE_CLASS,
  RESERVATION_SPLIT_DEPARTURE_GRID_CLASS,
  RESERVATION_SPLIT_FIELD_WIDE_CLASS,
  RESERVATION_SPLIT_HINT_CLASS,
} from "../styles/ReservationSplitCards.styles";
import { formatReservationSplitDuration } from "../utils/formatReservationSplitDuration";
import { listReservationSplitDepartureUnits } from "../utils/listReservationSplitDepartureUnits";
import { resolveReservationSplitDepartureMax } from "../utils/resolveReservationSplitDepartureMax";
import ReservationSplitDepartureEquipment from "./ReservationSplitDepartureEquipment";
import ReservationSplitDepartureHeader from "./ReservationSplitDepartureHeader";
import ReservationSplitDepartureTimeField from "./ReservationSplitDepartureTimeField";
import ReservationSplitQuantityStepper from "./ReservationSplitQuantityStepper";

const ReservationSplitDepartureCard = (
  props: ReservationSplitDepartureCardProps
): React.JSX.Element => {
  const { departureNumber, draft, split, viewModel } =
    props;
  const errors =
    viewModel.errors.departures[
      departureNumber -
        RESERVATION_SPLIT_DRAFT.FIRST_NEW_DEPARTURE_NUMBER
    ];
  const units = listReservationSplitDepartureUnits(
    split,
    viewModel.state,
    draft.key
  );
  const step = (delta: number) => () =>
    viewModel.stepPeopleCount(draft.key, delta);

  return (
    <Section
      ariaLabel={`${RESERVATION_SPLIT_FIELD_ID.HEADING_PREFIX}${draft.key}`}
      className={RESERVATION_SPLIT_DEPARTURE_CLASS}
    >
      <ReservationSplitDepartureHeader {...props} />
      <div
        className={RESERVATION_SPLIT_DEPARTURE_GRID_CLASS}
      >
        <ReservationSplitDepartureTimeField
          draft={draft}
          error={errors?.time}
          viewModel={viewModel}
        />
        <ReservationSplitQuantityStepper
          canDecrease={
            draft.peopleCount >
            RESERVATION_SPLIT_DRAFT.MIN_PEOPLE
          }
          canIncrease={
            draft.peopleCount <
            resolveReservationSplitDepartureMax(
              draft,
              viewModel.remainder
            ).peopleCount
          }
          controlId={`${RESERVATION_SPLIT_FIELD_ID.PEOPLE_PREFIX}${draft.key}`}
          departureNumber={departureNumber}
          error={errors?.peopleCount}
          isFrozen={viewModel.isPending}
          label={RESERVATION_SPLIT_UI_COPY.PEOPLE}
          value={draft.peopleCount}
          onDecrease={step(
            RESERVATION_SPLIT_DRAFT.STEP_DOWN
          )}
          onIncrease={step(RESERVATION_SPLIT_DRAFT.STEP_UP)}
        />
        <div className={RESERVATION_SPLIT_FIELD_WIDE_CLASS}>
          <ReservationSplitDepartureEquipment
            {...props}
            error={errors?.items}
          />
          {units.length > 0 && (
            <Text className={RESERVATION_SPLIT_HINT_CLASS}>
              {RESERVATION_SPLIT_UI_COPY.CARRIES_UNITS(
                units.join(RESERVATION_SPLIT_LIST_SEPARATOR)
              )}
            </Text>
          )}
          <Text className={RESERVATION_SPLIT_HINT_CLASS}>
            {RESERVATION_SPLIT_UI_COPY.DURATION_INHERITED(
              formatReservationSplitDuration(
                split.durationMinutes
              )
            )}
          </Text>
        </div>
      </div>
    </Section>
  );
};

export default ReservationSplitDepartureCard;
