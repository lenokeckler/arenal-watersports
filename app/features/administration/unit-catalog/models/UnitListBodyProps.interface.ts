import type { UnitCardViewModel } from "./UnitCardViewModel.interface";
import type { UnitListViewState } from "./UnitListViewState.type";

export interface UnitListBodyProps {
  cards: UnitCardViewModel[];
  onRetry: () => void;
  viewState: UnitListViewState;
}
