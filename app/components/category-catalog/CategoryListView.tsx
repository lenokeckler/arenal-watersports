"use client";

import Section from "@/app/components/section/Section";
import CategoryListBody from "./components/CategoryListBody";
import CategoryListHeader from "./components/CategoryListHeader";
import CategoryListStickyCta from "./components/CategoryListStickyCta";
import { CATEGORY_CATALOG_COPY } from "./constants/CategoryCatalogCopy.constants";
import { useCategoryListViewModel } from "./hooks/useCategoryListViewModel";
import type { CategoryListViewProps } from "./models/CategoryListViewProps.interface";
import {
  CATEGORY_LIST_CONTENT_CLASS,
  CATEGORY_LIST_WRAPPER_CLASS,
} from "./styles/CategoryList.styles";

const CategoryListView = ({
  categories,
  fetchFailed,
}: CategoryListViewProps): React.JSX.Element => {
  const { cards, onCreateCategory, onRetry, viewState } =
    useCategoryListViewModel({ categories, fetchFailed });

  return (
    <Section
      ariaLabel={CATEGORY_CATALOG_COPY.LIST_TITLE}
      className={CATEGORY_LIST_WRAPPER_CLASS}
    >
      <div className={CATEGORY_LIST_CONTENT_CLASS}>
        <CategoryListHeader
          onCreateCategory={onCreateCategory}
        />
        <CategoryListBody
          cards={cards}
          onCreateCategory={onCreateCategory}
          onRetry={onRetry}
          viewState={viewState}
        />
      </div>
      <CategoryListStickyCta
        onCreateCategory={onCreateCategory}
      />
    </Section>
  );
};

export default CategoryListView;
