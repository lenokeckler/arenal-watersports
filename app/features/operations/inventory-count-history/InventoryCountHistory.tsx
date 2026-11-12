import { Link, Text, Title } from "@/app/components";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import InventoryCountHistoryItem from "./components/InventoryCountHistoryItem";
import { INVENTORY_COUNT_HISTORY_COPY } from "./constants/InventoryCountHistoryCopy.constants";
import type { InventoryCountSummary } from "./models/InventoryCountSummary.interface";
import { listInventoryCounts } from "./services/listInventoryCounts";
import {
  INVENTORY_COUNT_HISTORY_ERROR_CLASS,
  INVENTORY_COUNT_HISTORY_HEADING_CLASS,
  INVENTORY_COUNT_HISTORY_LINK_CLASS,
  INVENTORY_COUNT_HISTORY_LIST_CLASS,
  INVENTORY_COUNT_HISTORY_NOTE_CLASS,
  INVENTORY_COUNT_HISTORY_PAGE_CLASS,
} from "./styles/InventoryCountHistory.styles";

const InventoryCountHistory =
  async (): Promise<React.JSX.Element> => {
    let counts: InventoryCountSummary[] = [];
    let hasLoadError = false;

    try {
      counts = await listInventoryCounts();
    } catch {
      hasLoadError = true;
    }

    return (
      <main className={INVENTORY_COUNT_HISTORY_PAGE_CLASS}>
        <Title
          variant={TitleVariant.PRIMARY}
          text={INVENTORY_COUNT_HISTORY_COPY.HEADING}
          className={INVENTORY_COUNT_HISTORY_HEADING_CLASS}
        />
        <Text
          className={INVENTORY_COUNT_HISTORY_NOTE_CLASS}
        >
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
          <ul
            className={INVENTORY_COUNT_HISTORY_LIST_CLASS}
          >
            {counts.map((count) => (
              <InventoryCountHistoryItem
                key={count.id}
                count={count}
              />
            ))}
          </ul>
        )}
      </main>
    );
  };

export default InventoryCountHistory;
