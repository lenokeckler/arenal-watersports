import type { ExtraCardViewModel } from "./ExtraCardViewModel.interface";
import type { ExtraListViewState } from "./ExtraListViewState.type";

export interface ExtraListBodyProps {
  cards: ExtraCardViewModel[];
  onRetry: () => void;
  viewState: ExtraListViewState;
}
