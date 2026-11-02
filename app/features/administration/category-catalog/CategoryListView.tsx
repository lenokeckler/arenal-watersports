"use client";

import ListPagination from "@/app/components/list-pagination/ListPagination";
import {
  PATHS,
  WIDE_LAYOUT_MARKER_PROPS,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "./constants/CategoryCatalogCopy.constants";
import CategoryListBody from "./components/CategoryListBody";
import CategoryListHeader from "./components/CategoryListHeader";
import { useCategoryListViewModel } from "./hooks/useCategoryListViewModel";
import type { CategoryListViewProps } from "./models/CategoryListViewProps.interface";
import { CATEGORY_LIST_CONTENT_CLASS } from "./styles/CategoryList.styles";

const CategoryListView = ({
  categories,
  currentPage,
  fetchFailed,
  pageCount,
  totalCount,
}: CategoryListViewProps): React.JSX.Element => {
  const { cards, onRetry, viewState } =
    useCategoryListViewModel({ categories, fetchFailed });

  return (
    <div
      className={CATEGORY_LIST_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <CategoryListHeader totalCount={totalCount} />
      <CategoryListBody
        cards={cards}
        onRetry={onRetry}
        viewState={viewState}
      />
      <ListPagination
        basePath={PATHS.ADMINISTRATION.CATEGORIES}
        navLabel={
          CATEGORY_CATALOG_COPY.PAGINATION_NAV_LABEL
        }
        currentPage={currentPage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default CategoryListView;
