import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import {
  INVENTORY_COUNT_HISTORY_COPY,
  INVENTORY_COUNT_HISTORY_QUANTITY_LABEL,
  INVENTORY_COUNT_HISTORY_STATUS_COPY,
} from "../constants/InventoryCountHistoryCopy.constants";
import type { InventoryCountQuantityFieldKey } from "../constants/InventoryCountHistory.constants";
import type { InventoryCountContentCategory } from "../models/InventoryCountContent.interface";
import {
  INVENTORY_COUNT_HISTORY_CATEGORY_BADGE_CLASS,
  INVENTORY_COUNT_HISTORY_CONTENT_LIST_CLASS,
  INVENTORY_COUNT_HISTORY_DETAILS_CLASS,
  INVENTORY_COUNT_HISTORY_LINE_CLASS,
  INVENTORY_COUNT_HISTORY_LINE_META_CLASS,
  INVENTORY_COUNT_HISTORY_LINES_CLASS,
  INVENTORY_COUNT_HISTORY_SECTION_TITLE_CLASS,
  INVENTORY_COUNT_HISTORY_SUMMARY_ROW_CLASS,
} from "../styles/InventoryCountHistory.styles";

const statusLabel = (status: string): string =>
  INVENTORY_COUNT_HISTORY_STATUS_COPY[status] ?? status;

const InventoryCountContentSection = ({
  categories,
}: {
  categories: InventoryCountContentCategory[];
}): React.JSX.Element | null =>
  categories.length === 0 ? null : (
    <section
      className={INVENTORY_COUNT_HISTORY_CONTENT_LIST_CLASS}
    >
      <Title
        variant={TitleVariant.SECONDARY}
        text={INVENTORY_COUNT_HISTORY_COPY.CONTENT_HEADING}
        className={
          INVENTORY_COUNT_HISTORY_SECTION_TITLE_CLASS
        }
      />
      {categories.map((category) => (
        <details
          key={category.name}
          open={category.differenceCount > 0}
          className={INVENTORY_COUNT_HISTORY_DETAILS_CLASS}
        >
          <summary
            className={
              INVENTORY_COUNT_HISTORY_SUMMARY_ROW_CLASS
            }
          >
            <span>{category.name}</span>
            <span
              className={
                INVENTORY_COUNT_HISTORY_CATEGORY_BADGE_CLASS[
                  category.differenceCount === 0
                    ? "clean"
                    : "different"
                ]
              }
            >
              {INVENTORY_COUNT_HISTORY_COPY.CATEGORY_SUMMARY(
                category.differenceCount
              )}
            </span>
          </summary>
          <ul
            className={INVENTORY_COUNT_HISTORY_LINES_CLASS}
          >
            {category.units.map((unit) => (
              <li
                key={unit.code}
                className={
                  INVENTORY_COUNT_HISTORY_LINE_CLASS[
                    unit.differs ? "different" : "clean"
                  ]
                }
              >
                <span>{unit.code}</span>
                <span>
                  {statusLabel(unit.countedStatus)}
                  {unit.differs && unit.systemStatus ? (
                    <Text
                      className={
                        INVENTORY_COUNT_HISTORY_LINE_META_CLASS
                      }
                    >
                      {INVENTORY_COUNT_HISTORY_COPY.SYSTEM_HAD(
                        statusLabel(unit.systemStatus)
                      )}
                    </Text>
                  ) : null}
                </span>
              </li>
            ))}
            {category.quantities.map((quantity) => (
              <li
                key={quantity.field}
                className={
                  INVENTORY_COUNT_HISTORY_LINE_CLASS[
                    quantity.differs ? "different" : "clean"
                  ]
                }
              >
                <span>
                  {
                    INVENTORY_COUNT_HISTORY_QUANTITY_LABEL[
                      quantity.field as InventoryCountQuantityFieldKey
                    ]
                  }
                </span>
                <span>
                  {quantity.counted}
                  {quantity.differs &&
                  quantity.system !== null ? (
                    <Text
                      className={
                        INVENTORY_COUNT_HISTORY_LINE_META_CLASS
                      }
                    >
                      {INVENTORY_COUNT_HISTORY_COPY.SYSTEM_HAD_QUANTITY(
                        quantity.system
                      )}
                    </Text>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </section>
  );

export default InventoryCountContentSection;
