import type { UnitListViewState } from "./UnitListViewState.type";
import type { UnitReservationRowViewModel } from "./UnitReservationRowViewModel.interface";

export interface UnitReservationHistoryViewModel {
  onRetry: () => void;
  rows: UnitReservationRowViewModel[];
  viewState: UnitListViewState;
}
