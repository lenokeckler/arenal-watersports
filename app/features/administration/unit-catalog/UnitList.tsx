import { notFound, redirect } from "next/navigation";
import { LENGTH, PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { UNIT_CATEGORY_TRACKING_MODE } from "./constants/UnitCategoryTrackingMode.constants";
import { UNIT_LIST_DIAGNOSTICS } from "./constants/UnitListDiagnostics.constants";
import type { UnitCategory } from "./models/UnitCategory.interface";
import type { UnitListProps } from "./models/UnitListProps.interface";
import type { UnitListViewProps } from "./models/UnitListViewProps.interface";
import { getUnitCategory } from "./services/getUnitCategory";
import { listUnits } from "./services/listUnits";
import UnitListView from "./UnitListView";
import { resolveCategoryUnitsPath } from "./utils/resolveUnitPaths";

const fetchUnitListViewProps = async (
  category: UnitCategory,
  currentPage: number
): Promise<UnitListViewProps> => {
  try {
    const { units, pageCount } = await listUnits(
      category.id,
      currentPage
    );
    return {
      category,
      currentPage,
      fetchFailed: false,
      pageCount,
      units,
    };
  } catch (error) {
    const fetchError = new Error(
      UNIT_LIST_DIAGNOSTICS.FETCH_FAILED,
      { cause: error }
    );
    return {
      category,
      currentPage,
      fetchError,
      fetchFailed: true,
      pageCount: LENGTH.ZERO,
      units: [],
    };
  }
};

const UnitList = async ({
  categoryId,
  pageParam,
}: UnitListProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const category = await getUnitCategory(categoryId);
  if (
    !category ||
    category.trackingMode !==
      UNIT_CATEGORY_TRACKING_MODE.BY_UNIT
  ) {
    notFound();
  }

  const unitListViewProps = await fetchUnitListViewProps(
    category,
    resolveListPage(pageParam)
  );

  if (
    unitListViewProps.currentPage >
      unitListViewProps.pageCount &&
    unitListViewProps.pageCount > LENGTH.ZERO
  ) {
    redirect(
      resolveListPageHref(
        resolveCategoryUnitsPath(category.id),
        unitListViewProps.pageCount
      )
    );
  }

  return <UnitListView {...unitListViewProps} />;
};

export default UnitList;
