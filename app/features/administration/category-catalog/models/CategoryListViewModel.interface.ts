import { CategoryCardViewModel } from "./CategoryCardViewModel.interface";
import { CategoryListViewState } from "./CategoryListViewState.type";

export interface CategoryListViewModel {
  cards: CategoryCardViewModel[];
  onRetry: () => void;
  viewState: CategoryListViewState;
}
