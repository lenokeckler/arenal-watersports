import { useId } from "react";
import { Text } from "@/app/components";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as COPY } from "../constants/ReservationPostponementReadingsCopy.constants";
import type { ReservationPostponementReadingsProps } from "../models/ReservationPostponementReadingsProps.interface";
import {
  RESERVATION_POSTPONEMENT_HINT_CLASS,
  RESERVATION_POSTPONEMENT_LEGEND_CLASS,
} from "../styles/ReservationPostponementForm.styles";
import { RESERVATION_POSTPONEMENT_READINGS_CLASS } from "../styles/ReservationPostponementReadings.styles";
import ReservationPostponementReadingUnitCard from "./ReservationPostponementReadingUnitCard";

const ReservationPostponementReadings = ({
  units,
  viewModel,
}: ReservationPostponementReadingsProps): React.JSX.Element | null => {
  const helperId = useId();

  if (units.length === 0) {
    return null;
  }

  return (
    <fieldset
      className={RESERVATION_POSTPONEMENT_READINGS_CLASS}
      aria-describedby={helperId}
    >
      <legend
        className={RESERVATION_POSTPONEMENT_LEGEND_CLASS}
      >
        {COPY.LEGEND}
      </legend>
      <Text
        id={helperId}
        className={RESERVATION_POSTPONEMENT_HINT_CLASS}
      >
        {COPY.HELPER}
      </Text>
      {units.map((unit) => (
        <ReservationPostponementReadingUnitCard
          key={unit.itemId}
          unit={unit}
          viewModel={viewModel}
        />
      ))}
    </fieldset>
  );
};

export default ReservationPostponementReadings;
