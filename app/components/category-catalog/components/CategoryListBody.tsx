import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import type { CategoryListBodyProps } from "../models/CategoryListBodyProps.interface";
import CategoryListCards from "./CategoryListCards";
import CategoryListEmptyState from "./CategoryListEmptyState";
import CategoryListErrorState from "./CategoryListErrorState";

const CategoryListBody = ({
  cards,
  onCreateCategory,
  onRetry,
  viewState,
}: CategoryListBodyProps): React.JSX.Element => {
  if (viewState === CATEGORY_LIST_VIEW_STATE.ERROR) {
    return <CategoryListErrorState onRetry={onRetry} />;
  }

  if (viewState === CATEGORY_LIST_VIEW_STATE.EMPTY) {
    return (
      <CategoryListEmptyState
        onCreateCategory={onCreateCategory}
      />
    );
  }

  return <CategoryListCards cards={cards} />;
};

export default CategoryListBody;
