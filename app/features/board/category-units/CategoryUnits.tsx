import { notFound, redirect } from "next/navigation";
import ListPagination from "@/app/components/list-pagination/ListPagination";
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
import CategoryUnitsList from "./components/CategoryUnitsList";
import { CATEGORY_UNITS_COPY } from "./constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsProps } from "./models/CategoryUnitsProps.interface";
import { CATEGORY_UNITS_PAGE_CLASS } from "./styles/CategoryUnits.styles";
import { readCategoryUnitsContent } from "./services/readCategoryUnitsContent";
import { mapBoardCategoryUnitRow } from "./utils/mapBoardCategoryUnitRow";

const CategoryUnits = async ({
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
        <CategoryUnitsList
          categoryName={categoryName}
          units={rows.map(mapBoardCategoryUnitRow)}
        />
      )}
      <ListPagination
        basePath={basePath}
        currentPage={page}
        navLabel={CATEGORY_UNITS_COPY.PAGINATION_NAV_LABEL}
        pageCount={pageCount}
      />
    </main>
  );
};

export default CategoryUnits;
