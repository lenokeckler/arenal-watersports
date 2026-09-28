import { CategoryCardViewModel } from "./CategoryCardViewModel.interface";
import { CategoryListViewState } from "./CategoryListViewState.type";

export interface CategoryListViewModel {
  cards: CategoryCardViewModel[];
  onCreateCategory: () => void;
  onRetry: () => void;
  viewState: CategoryListViewState;
}
