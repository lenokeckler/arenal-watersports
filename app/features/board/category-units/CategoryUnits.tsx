import { notFound, redirect } from "next/navigation";
import {
  BOARD_REALTIME,
  BOARD_UNIT_FILTER,
  LENGTH,
} from "@/app/constants";
import BoardUnitFilter from "@/app/components/board-unit-filter/BoardUnitFilter";
import BoardRealtime from "@/app/components/board-realtime/BoardRealtime";
import {
  readBoardCategory,
  readBoardCategoryHasPhotos,
} from "@/app/services/board";
import { resolveCategoryImageOption } from "@/app/utils/category-image/resolveCategoryImageOption";
import { resolveBoardCategoryPath } from "@/app/utils/board-paths/resolveBoardCategoryPath";
import { parseBoardUnitFilter } from "@/app/utils/board-unit-filter/parseBoardUnitFilter";
import { resolveBoardFilterCount } from "@/app/utils/board-unit-filter/resolveBoardFilterCount";
import { resolveBoardFilterHref } from "@/app/utils/board-unit-filter/resolveBoardFilterHref";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
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
import { attachUnitStatusDetails } from "./utils/attachUnitStatusDetails";
import { mapBoardCategoryUnitRow } from "./utils/mapBoardCategoryUnitRow";

const CategoryUnits = async ({
  canDispatch = false,
  categoryId,
  pageParam,
  statusParam,
}: CategoryUnitsProps): Promise<React.JSX.Element> => {
  const category = await readBoardCategory(categoryId);

  if (!category) {
    notFound();
  }

  const filter = parseBoardUnitFilter(statusParam);
  const counts = {
    available: safeNumber(category.free_count),
    damaged: safeNumber(category.damaged_count),
    maintenance: safeNumber(category.maintenance_count),
    total: safeNumber(category.total_count),
  };
  const unitCount = resolveBoardFilterCount(counts, filter);
  const pageCount = resolveListPageCount(unitCount);
  const page = resolveListPage(pageParam);
  const basePath = resolveBoardCategoryPath(categoryId);

  if (pageCount > LENGTH.ZERO && page > pageCount) {
    redirect(
      resolveBoardFilterHref(basePath, filter, pageCount)
    );
  }

  const now = new Date();
  const categoryName = safeString(category.category_name);
  const { groupMembers, rows, statusDetails } =
    await readCategoryUnitsContent({
      categoryId,
      filter,
      page,
      pageCount,
    });

  const hasPhotos = canDispatch
    ? await readBoardCategoryHasPhotos(categoryId)
    : false;

  const filterControl = (
    <BoardUnitFilter
      basePath={basePath}
      counts={counts}
      current={filter}
    />
  );

  const realtimeAndGroups = (
    <>
      <BoardRealtime
        channelName={BOARD_REALTIME.CHANNEL.CATEGORY_UNITS}
      />
      <CategoryGroupSwitch
        currentCategoryId={categoryId}
        filter={filter}
        members={groupMembers}
      />
    </>
  );

  return (
    <main className={CATEGORY_UNITS_PAGE_CLASS}>
      {rows.length === LENGTH.ZERO ? (
        <>
          <CategoryUnitsHeader
            categoryName={categoryName}
            filterControl={filterControl}
          />
          {realtimeAndGroups}
          <CategoryUnitsEmpty
            isFiltered={filter !== BOARD_UNIT_FILTER.ALL}
          />
        </>
      ) : (
        <CategoryUnitsView
          afterHeader={realtimeAndGroups}
          canDispatch={canDispatch}
          categoryId={categoryId}
          categoryName={categoryName}
          filterControl={filterControl}
          hasPhotos={hasPhotos}
          isPaginated={pageCount > 1}
          image={resolveCategoryImageOption(
            category.image_path,
            categoryName
          )}
          units={attachUnitStatusDetails(
            rows.map((row) =>
              mapBoardCategoryUnitRow(row, now)
            ),
            statusDetails
          )}
        />
      )}
      <CategoryUnitsPagination
        basePath={basePath}
        currentPage={page}
        filter={filter}
        pageCount={pageCount}
      />
    </main>
  );
};

export default CategoryUnits;
