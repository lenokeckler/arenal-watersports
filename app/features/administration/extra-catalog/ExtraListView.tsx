"use client";

import ListPagination from "@/app/components/list-pagination/ListPagination";
import {
  PATHS,
  WIDE_LAYOUT_MARKER_PROPS,
} from "@/app/constants";
import ExtraListBody from "./components/ExtraListBody";
import ExtraListHeader from "./components/ExtraListHeader";
import { EXTRA_CATALOG_COPY } from "./constants/ExtraCatalogCopy.constants";
import { useExtraListViewModel } from "./hooks/useExtraListViewModel";
import type { ExtraListViewProps } from "./models/ExtraListViewProps.interface";
import { EXTRA_LIST_CONTENT_CLASS } from "./styles/ExtraList.styles";

const ExtraListView = ({
  currentPage,
  extras,
  fetchFailed,
  pageCount,
}: ExtraListViewProps): React.JSX.Element => {
  const { cards, onRetry, viewState } =
    useExtraListViewModel({ extras, fetchFailed });

  return (
    <div
      className={EXTRA_LIST_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <ExtraListHeader />
      <ExtraListBody
        cards={cards}
        onRetry={onRetry}
        viewState={viewState}
      />
      <ListPagination
        basePath={PATHS.ADMINISTRATION.EXTRAS}
        navLabel={EXTRA_CATALOG_COPY.PAGINATION_NAV_LABEL}
        currentPage={currentPage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default ExtraListView;
