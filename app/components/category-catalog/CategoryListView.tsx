"use client";

import CategoryListBody from "./components/CategoryListBody";
import CategoryListHeader from "./components/CategoryListHeader";
import CategoryListPagination from "./components/CategoryListPagination";
import { useCategoryListViewModel } from "./hooks/useCategoryListViewModel";
import type { CategoryListViewProps } from "./models/CategoryListViewProps.interface";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";

const CategoryListView = ({
  categories,
  currentPage,
  fetchFailed,
  pageCount,
}: CategoryListViewProps): React.JSX.Element => {
  const { cards, onRetry, viewState } =
    useCategoryListViewModel({ categories, fetchFailed });

  return (
    <div className={CATEGORY_LIST_CONTENT_CLASS}>
      <CategoryListHeader />
      <CategoryListBody
        cards={cards}
        onRetry={onRetry}
        viewState={viewState}
      />
      <CategoryListPagination
        currentPage={currentPage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default CategoryListView;
