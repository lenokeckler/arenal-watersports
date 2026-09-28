import type { CategoryCardViewModel } from "./CategoryCardViewModel.interface";
import type { CategoryListViewState } from "./CategoryListViewState.type";

export interface CategoryListBodyProps {
  cards: CategoryCardViewModel[];
  onCreateCategory: () => void;
  onRetry: () => void;
  viewState: CategoryListViewState;
}
