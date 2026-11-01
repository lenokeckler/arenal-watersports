"use client";

import ListPagination from "@/app/components/list-pagination/ListPagination";
import UnitListBody from "./components/UnitListBody";
import UnitListHeader from "./components/UnitListHeader";
import { UNIT_LIST_COPY } from "./constants/UnitListCopy.constants";
import { useUnitListViewModel } from "./hooks/useUnitListViewModel";
import type { UnitListViewProps } from "./models/UnitListViewProps.interface";
import { UNIT_LIST_CONTENT_CLASS } from "./styles/UnitList.styles";
import { resolveCategoryUnitsPath } from "./utils/resolveUnitPaths";

const UnitListView = ({
  category,
  currentPage,
  fetchFailed,
  pageCount,
  units,
}: UnitListViewProps): React.JSX.Element => {
  const { cards, onRetry, viewState } =
    useUnitListViewModel({ category, fetchFailed, units });

  return (
    <div className={UNIT_LIST_CONTENT_CLASS}>
      <UnitListHeader
        categoryId={category.id}
        categoryName={category.name}
      />
      <UnitListBody
        cards={cards}
        onRetry={onRetry}
        viewState={viewState}
      />
      <ListPagination
        basePath={resolveCategoryUnitsPath(category.id)}
        navLabel={UNIT_LIST_COPY.PAGINATION_NAV_LABEL}
        currentPage={currentPage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default UnitListView;
