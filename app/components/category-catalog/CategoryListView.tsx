"use client";

import Section from "@/app/components/section/Section";
import CategoryListBody from "./components/CategoryListBody";
import CategoryListHeader from "./components/CategoryListHeader";
import { CATEGORY_LIST_TITLE_ID } from "./constants/CategoryListTitleId.constants";
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
  const { cards, onRetry, viewState } =
    useCategoryListViewModel({ categories, fetchFailed });

  return (
    <Section
      ariaLabel={CATEGORY_LIST_TITLE_ID}
      className={CATEGORY_LIST_WRAPPER_CLASS}
    >
      <div className={CATEGORY_LIST_CONTENT_CLASS}>
        <CategoryListHeader />
        <CategoryListBody
          cards={cards}
          onRetry={onRetry}
          viewState={viewState}
        />
      </div>
    </Section>
  );
};

export default CategoryListView;
