import { notFound } from "next/navigation";
import { Link, Text, Title } from "@/app/components";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import InventoryCountDifferenceSections from "./components/InventoryCountDifferenceSections";
import { INVENTORY_COUNT_HISTORY_COPY } from "./constants/InventoryCountHistoryCopy.constants";
import type { InventoryCountDetail } from "./models/InventoryCountDetail.interface";
import { getInventoryCountDetail } from "./services/getInventoryCountDetail";
import {
  INVENTORY_COUNT_HISTORY_ERROR_CLASS,
  INVENTORY_COUNT_HISTORY_HEADING_CLASS,
  INVENTORY_COUNT_HISTORY_LINK_CLASS,
  INVENTORY_COUNT_HISTORY_NOTE_CLASS,
  INVENTORY_COUNT_HISTORY_PAGE_CLASS,
} from "./styles/InventoryCountHistory.styles";
import { formatInventoryCountDate } from "./utils/formatInventoryCountDate";

const InventoryCountDetailView = async ({
  countId,
}: {
  countId: string;
}): Promise<React.JSX.Element> => {
  let detail: InventoryCountDetail | null = null;
  let hasLoadError = false;

  try {
    detail = await getInventoryCountDetail(countId);
  } catch {
    hasLoadError = true;
  }

  if (!hasLoadError && detail === null) {
    notFound();
  }

  return (
    <main className={INVENTORY_COUNT_HISTORY_PAGE_CLASS}>
      <Link
        href={PATHS.OPERATIONS.INVENTORY_COUNTS}
        className={INVENTORY_COUNT_HISTORY_LINK_CLASS}
      >
        {INVENTORY_COUNT_HISTORY_COPY.BACK}
      </Link>
      {detail ? (
        <>
          <Title
            variant={TitleVariant.PRIMARY}
            text={`${INVENTORY_COUNT_HISTORY_COPY.DETAIL_HEADING} ${formatInventoryCountDate(detail.summary.countedAt)}`}
            className={
              INVENTORY_COUNT_HISTORY_HEADING_CLASS
            }
          />
          <Text
            className={INVENTORY_COUNT_HISTORY_NOTE_CLASS}
          >
            {`${INVENTORY_COUNT_HISTORY_COPY.COUNTED_BY} ${detail.summary.countedBy}`}
          </Text>
          <Text
            className={INVENTORY_COUNT_HISTORY_NOTE_CLASS}
          >
            {`${INVENTORY_COUNT_HISTORY_COPY.NOTES}: ${detail.summary.notes ?? INVENTORY_COUNT_HISTORY_COPY.NO_NOTES}`}
          </Text>
          {detail.summary.differenceCount === 0 ? (
            <Text
              className={INVENTORY_COUNT_HISTORY_NOTE_CLASS}
            >
              {
                INVENTORY_COUNT_HISTORY_COPY.DETAIL_EMPTY_DIFFERENCES
              }
            </Text>
          ) : (
            <InventoryCountDifferenceSections
              quantityDifferences={
                detail.quantityDifferences
              }
              unitDifferences={detail.unitDifferences}
            />
          )}
        </>
      ) : (
        <Text
          className={INVENTORY_COUNT_HISTORY_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {INVENTORY_COUNT_HISTORY_COPY.ERROR_LOAD}
        </Text>
      )}
    </main>
  );
};

export default InventoryCountDetailView;
