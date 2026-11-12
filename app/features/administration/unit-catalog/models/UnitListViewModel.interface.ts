import type { UnitCardViewModel } from "./UnitCardViewModel.interface";
import type { UnitListViewState } from "./UnitListViewState.type";

export interface UnitListViewModel {
  cards: UnitCardViewModel[];
  onRetry: () => void;
  viewState: UnitListViewState;
}
