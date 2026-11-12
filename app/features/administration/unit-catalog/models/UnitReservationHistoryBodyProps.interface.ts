import type { UnitListViewState } from "./UnitListViewState.type";
import type { UnitReservationRowViewModel } from "./UnitReservationRowViewModel.interface";

export interface UnitReservationHistoryBodyProps {
  onRetry: () => void;
  rows: UnitReservationRowViewModel[];
  viewState: UnitListViewState;
}
