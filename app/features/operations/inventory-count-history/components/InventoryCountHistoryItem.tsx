import { Link, Text } from "@/app/components";
import { PATHS } from "@/app/constants";
import { INVENTORY_COUNT_HISTORY_COPY } from "../constants/InventoryCountHistoryCopy.constants";
import type { InventoryCountHistoryItemProps } from "../models/InventoryCountHistoryItemProps.interface";
import {
  INVENTORY_COUNT_HISTORY_CARD_SUMMARY_CLASS,
  INVENTORY_COUNT_HISTORY_DIFFERENCES_CLASS,
  INVENTORY_COUNT_HISTORY_ITEM_CLASS,
  INVENTORY_COUNT_HISTORY_ITEM_DATE_CLASS,
  INVENTORY_COUNT_HISTORY_ITEM_META_CLASS,
} from "../styles/InventoryCountHistory.styles";
import { formatInventoryCountDate } from "../utils/formatInventoryCountDate";

const InventoryCountHistoryItem = ({
  count,
}: InventoryCountHistoryItemProps): React.JSX.Element => (
  <li>
    <Link
      href={PATHS.OPERATIONS.INVENTORY_COUNT(count.id)}
      className={INVENTORY_COUNT_HISTORY_ITEM_CLASS}
    >
      <Text
        className={INVENTORY_COUNT_HISTORY_ITEM_DATE_CLASS}
      >
        {formatInventoryCountDate(count.countedAt)}
      </Text>
      <Text
        className={INVENTORY_COUNT_HISTORY_ITEM_META_CLASS}
      >
        {`${INVENTORY_COUNT_HISTORY_COPY.COUNTED_BY} ${count.countedBy}`}
      </Text>
      <Text
        className={
          INVENTORY_COUNT_HISTORY_CARD_SUMMARY_CLASS
        }
      >
        {INVENTORY_COUNT_HISTORY_COPY.CARD_SUMMARY(
          count.categoryCount,
          count.unitCount
        )}
      </Text>
      <Text
        className={
          INVENTORY_COUNT_HISTORY_DIFFERENCES_CLASS[
            count.differenceCount === 0
              ? "clean"
              : "different"
          ]
        }
      >
        {INVENTORY_COUNT_HISTORY_COPY.DIFFERENCES(
          count.differenceCount
        )}
      </Text>
    </Link>
  </li>
);

export default InventoryCountHistoryItem;
