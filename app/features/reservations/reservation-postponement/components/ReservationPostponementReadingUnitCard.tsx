import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as COPY } from "../constants/ReservationPostponementReadingsCopy.constants";
import type { ReservationPostponementReadingUnitProps } from "../models/ReservationPostponementReadingUnitProps.interface";
import { RESERVATION_POSTPONEMENT_HINT_CLASS } from "../styles/ReservationPostponementForm.styles";
import {
  RESERVATION_POSTPONEMENT_READING_UNIT_CLASS,
  RESERVATION_POSTPONEMENT_READING_UNIT_CODE_CLASS,
  RESERVATION_POSTPONEMENT_READING_UNIT_GRID_CLASS,
} from "../styles/ReservationPostponementReadings.styles";
import { RESERVATION_POSTPONEMENT_TERM_CLASS } from "../styles/ReservationPostponementSummary.styles";
import ReservationPostponementFuelChoice from "./ReservationPostponementFuelChoice";
import ReservationPostponementUsageField from "./ReservationPostponementUsageField";

const ReservationPostponementReadingUnitCard = ({
  unit,
  viewModel,
}: ReservationPostponementReadingUnitProps): React.JSX.Element => {
  const headingId = `${unit.itemId}${RESERVATION_POSTPONEMENT_FIELD_ID.READING_HEADING_SUFFIX}`;
  const hasReadings =
    unit.fuelMax !== null || unit.usageMetric !== null;

  return (
    <Section
      ariaLabel={headingId}
      className={
        RESERVATION_POSTPONEMENT_READING_UNIT_CLASS
      }
    >
      <div>
        <Title
          id={headingId}
          variant={TitleVariant.SECONDARY}
          text={unit.unitCode}
          className={
            RESERVATION_POSTPONEMENT_READING_UNIT_CODE_CLASS
          }
        />
        <Text
          className={RESERVATION_POSTPONEMENT_TERM_CLASS}
        >
          {unit.categoryName}
        </Text>
      </div>
      {hasReadings ? (
        <div
          className={
            RESERVATION_POSTPONEMENT_READING_UNIT_GRID_CLASS
          }
        >
          {unit.fuelMax !== null && (
            <ReservationPostponementFuelChoice
              unit={unit}
              viewModel={viewModel}
            />
          )}
          <ReservationPostponementUsageField
            unit={unit}
            viewModel={viewModel}
          />
        </div>
      ) : (
        <Text
          className={RESERVATION_POSTPONEMENT_HINT_CLASS}
        >
          {COPY.NO_READINGS}
        </Text>
      )}
    </Section>
  );
};

export default ReservationPostponementReadingUnitCard;
