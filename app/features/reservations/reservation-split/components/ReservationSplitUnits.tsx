import { Text } from "@/app/components";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitCardProps } from "../models/ReservationSplitCardProps.interface";
import {
  RESERVATION_SPLIT_UNITS_CLASS,
  RESERVATION_SPLIT_UNITS_HELPER_CLASS,
  RESERVATION_SPLIT_UNITS_LEGEND_CLASS,
} from "../styles/ReservationSplitView.styles";
import { isReservationSplitUnit } from "../utils/isReservationSplitUnit";
import ReservationSplitUnitChoice from "./ReservationSplitUnitChoice";

const ReservationSplitUnits = ({
  split,
  viewModel,
}: ReservationSplitCardProps): React.JSX.Element | null => {
  const units = split.items.filter(isReservationSplitUnit);

  if (units.length === 0) {
    return null;
  }

  return (
    <div className={RESERVATION_SPLIT_UNITS_CLASS}>
      <div>
        <Text
          className={RESERVATION_SPLIT_UNITS_LEGEND_CLASS}
        >
          {RESERVATION_SPLIT_UI_COPY.UNITS_LEGEND}
        </Text>
        <Text
          className={RESERVATION_SPLIT_UNITS_HELPER_CLASS}
        >
          {RESERVATION_SPLIT_UI_COPY.UNITS_HELPER}
        </Text>
      </div>
      {units.map((unit) => (
        <ReservationSplitUnitChoice
          key={unit.id}
          drafts={viewModel.state.drafts}
          isFrozen={viewModel.isPending}
          originalTime={split.time}
          selectedKey={
            viewModel.state.unitAssignments[unit.id]
          }
          unit={unit}
          onSelect={(departureKey) =>
            viewModel.assignUnit(unit.id, departureKey)
          }
        />
      ))}
    </div>
  );
};

export default ReservationSplitUnits;
