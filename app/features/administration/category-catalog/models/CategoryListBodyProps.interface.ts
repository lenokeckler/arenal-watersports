import type { CategoryCardViewModel } from "./CategoryCardViewModel.interface";
import type { CategoryListViewState } from "./CategoryListViewState.type";

export interface CategoryListBodyProps {
  cards: CategoryCardViewModel[];
  onRetry: () => void;
  viewState: CategoryListViewState;
}
