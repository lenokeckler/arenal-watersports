import { UNIT_LIST_VIEW_STATE } from "../constants/UnitListViewState.constants";
import type { UnitReservationHistoryBodyProps } from "../models/UnitReservationHistoryBodyProps.interface";
import UnitReservationHistoryEmptyState from "./UnitReservationHistoryEmptyState";
import UnitReservationHistoryErrorState from "./UnitReservationHistoryErrorState";
import UnitReservationHistoryList from "./UnitReservationHistoryList";

const UnitReservationHistoryBody = ({
  onRetry,
  rows,
  viewState,
}: UnitReservationHistoryBodyProps): React.JSX.Element => {
  if (viewState === UNIT_LIST_VIEW_STATE.ERROR) {
    return (
      <UnitReservationHistoryErrorState onRetry={onRetry} />
    );
  }

  if (viewState === UNIT_LIST_VIEW_STATE.EMPTY) {
    return <UnitReservationHistoryEmptyState />;
  }

  return <UnitReservationHistoryList rows={rows} />;
};

export default UnitReservationHistoryBody;
