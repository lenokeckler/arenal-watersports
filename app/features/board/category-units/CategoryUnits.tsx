import { notFound, redirect } from "next/navigation";
import { LENGTH } from "@/app/constants";
import { readBoardCategory } from "@/app/services/board";
import { resolveBoardCategoryPath } from "@/app/utils/board-paths/resolveBoardCategoryPath";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import {
  safeNumber,
  safeString,
} from "@/app/utils/safe-value/SafeValue";
import CategoryGroupSwitch from "./components/CategoryGroupSwitch";
import CategoryUnitsEmpty from "./components/CategoryUnitsEmpty";
import CategoryUnitsHeader from "./components/CategoryUnitsHeader";
import CategoryUnitsPagination from "./components/CategoryUnitsPagination";
import CategoryUnitsView from "./components/CategoryUnitsView";
import type { CategoryUnitsProps } from "./models/CategoryUnitsProps.interface";
import { CATEGORY_UNITS_PAGE_CLASS } from "./styles/CategoryUnits.styles";
import { readCategoryUnitsContent } from "./services/readCategoryUnitsContent";
import { mapBoardCategoryUnitRow } from "./utils/mapBoardCategoryUnitRow";

const CategoryUnits = async ({
  canDispatch = false,
  categoryId,
  pageParam,
}: CategoryUnitsProps): Promise<React.JSX.Element> => {
  const category = await readBoardCategory(categoryId);

  if (!category) {
    notFound();
  }

  const unitCount = safeNumber(category.total_count);
  const pageCount = resolveListPageCount(unitCount);
  const page = resolveListPage(pageParam);
  const basePath = resolveBoardCategoryPath(categoryId);

  if (pageCount > LENGTH.ZERO && page > pageCount) {
    redirect(resolveListPageHref(basePath, pageCount));
  }

  const now = new Date();
  const categoryName = safeString(category.category_name);
  const { groupMembers, rows } =
    await readCategoryUnitsContent({
      categoryId,
      page,
      pageCount,
    });

  return (
    <main className={CATEGORY_UNITS_PAGE_CLASS}>
      <CategoryUnitsHeader
        categoryName={categoryName}
        unitCount={unitCount}
      />
      <CategoryGroupSwitch
        currentCategoryId={categoryId}
        members={groupMembers}
      />
      {rows.length === LENGTH.ZERO ? (
        <CategoryUnitsEmpty />
      ) : (
        <CategoryUnitsView
          canDispatch={canDispatch}
          categoryId={categoryId}
          categoryName={categoryName}
          units={rows.map((row) =>
            mapBoardCategoryUnitRow(row, now)
          )}
        />
      )}
      <CategoryUnitsPagination
        basePath={basePath}
        currentPage={page}
        pageCount={pageCount}
      />
    </main>
  );
};

export default CategoryUnits;
