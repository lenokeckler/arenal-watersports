import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import {
  INVENTORY_COUNT_HISTORY_COPY,
  INVENTORY_COUNT_HISTORY_QUANTITY_LABEL,
  INVENTORY_COUNT_HISTORY_STATUS_COPY,
} from "../constants/InventoryCountHistoryCopy.constants";
import type { InventoryCountDifferences } from "../models/InventoryCountDifferences.interface";
import {
  INVENTORY_COUNT_HISTORY_DIFFERENCE_CLASS,
  INVENTORY_COUNT_HISTORY_SECTION_CLASS,
  INVENTORY_COUNT_HISTORY_SECTION_TITLE_CLASS,
} from "../styles/InventoryCountHistory.styles";

const statusLabel = (status: string): string =>
  INVENTORY_COUNT_HISTORY_STATUS_COPY[status] ?? status;

const InventoryCountDifferenceSections = ({
  quantityDifferences,
  unitDifferences,
}: InventoryCountDifferences): React.JSX.Element => (
  <>
    {unitDifferences.length > 0 && (
      <section
        className={INVENTORY_COUNT_HISTORY_SECTION_CLASS}
      >
        <Title
          variant={TitleVariant.SECONDARY}
          text={
            INVENTORY_COUNT_HISTORY_COPY.DIFFERENCES_HEADING
          }
          className={
            INVENTORY_COUNT_HISTORY_SECTION_TITLE_CLASS
          }
        />
        {unitDifferences.map((difference) => (
          <Text
            key={difference.code}
            className={
              INVENTORY_COUNT_HISTORY_DIFFERENCE_CLASS
            }
          >
            {INVENTORY_COUNT_HISTORY_COPY.UNIT_DIFFERENCE(
              difference.code,
              difference.categoryName,
              statusLabel(difference.systemStatus),
              statusLabel(difference.countedStatus)
            )}
          </Text>
        ))}
      </section>
    )}
    {quantityDifferences.map((difference) => (
      <section
        key={difference.categoryName}
        className={INVENTORY_COUNT_HISTORY_SECTION_CLASS}
      >
        <Title
          variant={TitleVariant.SECONDARY}
          text={difference.categoryName}
          className={
            INVENTORY_COUNT_HISTORY_SECTION_TITLE_CLASS
          }
        />
        {difference.changes.map((change) => (
          <Text
            key={change.field}
            className={
              INVENTORY_COUNT_HISTORY_DIFFERENCE_CLASS
            }
          >
            {INVENTORY_COUNT_HISTORY_COPY.QUANTITY_DIFFERENCE(
              INVENTORY_COUNT_HISTORY_QUANTITY_LABEL[
                change.field
              ],
              change.system,
              change.counted
            )}
          </Text>
        ))}
      </section>
    ))}
  </>
);

export default InventoryCountDifferenceSections;
