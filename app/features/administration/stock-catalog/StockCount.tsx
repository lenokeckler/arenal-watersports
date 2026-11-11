import {
  notFound,
  redirect,
  unstable_rethrow,
} from "next/navigation";
import { PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { STOCK_CATEGORY_TRACKING_MODE } from "./constants/StockCategoryTrackingMode.constants";
import { STOCK_EMPTY_LEVELS } from "./constants/StockEmptyLevels.constants";
import type { StockCategory } from "./models/StockCategory.interface";
import type { StockCountProps } from "./models/StockCountProps.interface";
import type { StockCountViewProps } from "./models/StockCountViewProps.interface";
import { getStockCategoryResult } from "./services/getStockCategoryResult";
import { getStockLevels } from "./services/getStockLevels";
import { listStockMovements } from "./services/listStockMovements";
import StockCountView from "./StockCountView";
import { buildUnreadableStockCountViewProps } from "./utils/buildUnreadableStockCountViewProps";
import { resolveCategoryStockPath } from "./utils/resolveStockPaths";

const fetchStockCountViewProps = async (
  category: StockCategory,
  currentPage: number
): Promise<StockCountViewProps> => {
  try {
    const [levels, { movements, pageCount }] =
      await Promise.all([
        getStockLevels(category.id),
        listStockMovements(category.id, currentPage),
      ]);
    return {
      category,
      currentPage,
      fetchFailed: false,
      levels,
      movements,
      pageCount,
    };
  } catch (error) {
    unstable_rethrow(error);
    return {
      category,
      currentPage,
      fetchFailed: true,
      levels: STOCK_EMPTY_LEVELS,
      movements: [],
      pageCount: 0,
    };
  }
};

const StockCount = async ({
  categoryId,
  pageParam,
}: StockCountProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const currentPage = resolveListPage(pageParam);
  const { category, isReadFailed } =
    await getStockCategoryResult(categoryId);
  if (isReadFailed) {
    return (
      <StockCountView
        {...buildUnreadableStockCountViewProps(
          categoryId,
          currentPage
        )}
      />
    );
  }
  if (
    !category ||
    category.trackingMode !==
      STOCK_CATEGORY_TRACKING_MODE.BY_QUANTITY
  ) {
    notFound();
  }

  const viewProps = await fetchStockCountViewProps(
    category,
    currentPage
  );

  if (
    viewProps.currentPage > viewProps.pageCount &&
    viewProps.pageCount > 0
  ) {
    redirect(
      resolveListPageHref(
        resolveCategoryStockPath(category.id),
        viewProps.pageCount
      )
    );
  }

  return <StockCountView {...viewProps} />;
};

export default StockCount;
