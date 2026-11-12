import type { ExtraCardViewModel } from "./ExtraCardViewModel.interface";
import type { ExtraListViewState } from "./ExtraListViewState.type";

export interface ExtraListViewModel {
  cards: ExtraCardViewModel[];
  onRetry: () => void;
  viewState: ExtraListViewState;
}
