"use client";

import ListPagination from "@/app/components/list-pagination/ListPagination";
import StockCountBody from "./components/StockCountBody";
import StockCountHeader from "./components/StockCountHeader";
import { WIDE_LAYOUT_MARKER_PROPS } from "@/app/constants";
import { STOCK_COUNT_COPY } from "./constants/StockCountCopy.constants";
import { useStockCountViewModel } from "./hooks/useStockCountViewModel";
import type { StockCountViewProps } from "./models/StockCountViewProps.interface";
import { STOCK_COUNT_CONTENT_CLASS } from "./styles/StockCount.styles";
import { resolveCategoryStockPath } from "./utils/resolveStockPaths";

const StockCountView = ({
  category,
  currentPage,
  fetchFailed,
  levels,
  movements,
  pageCount,
}: StockCountViewProps): React.JSX.Element => {
  const viewModel = useStockCountViewModel({
    category,
    fetchFailed,
    levels,
    movements,
  });

  return (
    <div
      className={STOCK_COUNT_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <StockCountHeader categoryName={category.name} />
      <StockCountBody
        hasExpiryAlert={category.hasExpiryAlert}
        viewModel={viewModel}
      >
        <ListPagination
          basePath={resolveCategoryStockPath(category.id)}
          navLabel={STOCK_COUNT_COPY.PAGINATION_NAV_LABEL}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      </StockCountBody>
    </div>
  );
};

export default StockCountView;
