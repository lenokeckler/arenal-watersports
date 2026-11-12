import { redirect } from "next/navigation";
import ListPagination from "@/app/components/list-pagination/ListPagination";
import { Link, Text, Title } from "@/app/components";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import InventoryCountHistoryItem from "./components/InventoryCountHistoryItem";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import { INVENTORY_COUNT_HISTORY_LIMITS } from "./constants/InventoryCountHistory.constants";
import { INVENTORY_COUNT_HISTORY_COPY } from "./constants/InventoryCountHistoryCopy.constants";
import type { InventoryCountsPage } from "./models/InventoryCountsPage.interface";
import type { InventoryCountHistoryProps } from "./models/InventoryCountHistoryProps.interface";
import { listInventoryCounts } from "./services/listInventoryCounts";
import {
  INVENTORY_COUNT_HISTORY_ERROR_CLASS,
  INVENTORY_COUNT_HISTORY_HEADING_CLASS,
  INVENTORY_COUNT_HISTORY_LINK_CLASS,
  INVENTORY_COUNT_HISTORY_LIST_CLASS,
  INVENTORY_COUNT_HISTORY_NOTE_CLASS,
  INVENTORY_COUNT_HISTORY_PAGE_CLASS,
} from "./styles/InventoryCountHistory.styles";

const InventoryCountHistory = async ({
  page,
}: InventoryCountHistoryProps): Promise<React.JSX.Element> => {
  let result: InventoryCountsPage = {
    counts: [],
    totalCount: 0,
  };
  let hasLoadError = false;

  try {
    const { from } = resolveListPageRange(
      page,
      INVENTORY_COUNT_HISTORY_LIMITS.PAGE_SIZE
    );
    result = await listInventoryCounts({
      limit: INVENTORY_COUNT_HISTORY_LIMITS.PAGE_SIZE,
      offset: from,
    });
  } catch {
    hasLoadError = true;
  }

  const { counts } = result;
  const pageCount = resolveListPageCount(
    result.totalCount,
    INVENTORY_COUNT_HISTORY_LIMITS.PAGE_SIZE
  );

  if (!hasLoadError && counts.length === 0 && page > 1) {
    redirect(PATHS.OPERATIONS.INVENTORY_COUNTS);
  }

  return (
    <main className={INVENTORY_COUNT_HISTORY_PAGE_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={INVENTORY_COUNT_HISTORY_COPY.HEADING}
        className={INVENTORY_COUNT_HISTORY_HEADING_CLASS}
      />
      <Text className={INVENTORY_COUNT_HISTORY_NOTE_CLASS}>
        {INVENTORY_COUNT_HISTORY_COPY.INTRO}
      </Text>
      <Link
        href={PATHS.OPERATIONS.INVENTORY_COUNT_NEW}
        className={INVENTORY_COUNT_HISTORY_LINK_CLASS}
      >
        {INVENTORY_COUNT_HISTORY_COPY.NEW_COUNT}
      </Link>
      {hasLoadError ? (
        <Text
          className={INVENTORY_COUNT_HISTORY_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {INVENTORY_COUNT_HISTORY_COPY.ERROR_LOAD}
        </Text>
      ) : counts.length === 0 ? (
        <Text
          className={INVENTORY_COUNT_HISTORY_NOTE_CLASS}
        >
          {INVENTORY_COUNT_HISTORY_COPY.EMPTY}
        </Text>
      ) : (
        <ul className={INVENTORY_COUNT_HISTORY_LIST_CLASS}>
          {counts.map((count) => (
            <InventoryCountHistoryItem
              key={count.id}
              count={count}
            />
          ))}
        </ul>
      )}
      <ListPagination
        basePath={PATHS.OPERATIONS.INVENTORY_COUNTS}
        currentPage={page}
        navLabel={
          INVENTORY_COUNT_HISTORY_COPY.PAGINATION_LABEL
        }
        pageCount={pageCount}
      />
    </main>
  );
};

export default InventoryCountHistory;
