import { Link, Text } from "@/app/components";
import {
  INVENTORY_TRACKING_MODE,
  PATHS,
} from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryPage } from "../models/InventoryPage.model";
import type { InventoryCategorySummary } from "../models/InventoryCategorySummary.interface";
import {
  INVENTORY_TABLE_CELL_CLASS,
  INVENTORY_TABLE_CHIP_CLASS,
  INVENTORY_TABLE_CLASS,
  INVENTORY_TABLE_HEAD_CELL_CLASS,
  INVENTORY_TABLE_NAME_LINK_CLASS,
  INVENTORY_TABLE_NUMBER_CELL_CLASS,
  INVENTORY_TABLE_NUMBER_HEAD_CLASS,
  INVENTORY_TABLE_ROW_CLASS,
  INVENTORY_TABLE_WRAPPER_CLASS,
} from "../styles/InventoryOverview.styles";

const Chip = ({
  tone,
  value,
}: {
  tone: keyof typeof INVENTORY_TABLE_CHIP_CLASS;
  value: number;
}): React.JSX.Element => (
  <span className={INVENTORY_TABLE_CHIP_CLASS[tone]}>
    {value}
  </span>
);

const InventoryCategoryTable = ({
  inventoryPage,
}: {
  inventoryPage: InventoryPage<InventoryCategorySummary>;
}): React.JSX.Element => {
  if (inventoryPage.items.length === 0) {
    return <Text>{INVENTORY_COPY.INVENTORY_EMPTY}</Text>;
  }

  return (
    <div className={INVENTORY_TABLE_WRAPPER_CLASS}>
      <table
        aria-label={INVENTORY_COPY.TABLE_LABEL}
        className={INVENTORY_TABLE_CLASS}
      >
        <thead>
          <tr>
            <th
              scope="col"
              className={INVENTORY_TABLE_HEAD_CELL_CLASS}
            >
              {INVENTORY_COPY.COLUMN_CATEGORY}
            </th>
            <th
              scope="col"
              className={INVENTORY_TABLE_HEAD_CELL_CLASS}
            >
              {INVENTORY_COPY.COLUMN_MODE}
            </th>
            <th
              scope="col"
              className={INVENTORY_TABLE_NUMBER_HEAD_CLASS}
            >
              {INVENTORY_COPY.COLUMN_TOTAL}
            </th>
            <th
              scope="col"
              className={INVENTORY_TABLE_NUMBER_HEAD_CLASS}
            >
              {INVENTORY_COPY.COLUMN_AVAILABLE}
            </th>
            <th
              scope="col"
              className={INVENTORY_TABLE_NUMBER_HEAD_CLASS}
            >
              {INVENTORY_COPY.COLUMN_DAMAGED}
            </th>
            <th
              scope="col"
              className={INVENTORY_TABLE_NUMBER_HEAD_CLASS}
            >
              {INVENTORY_COPY.COLUMN_IN_REPAIR}
            </th>
          </tr>
        </thead>
        <tbody>
          {inventoryPage.items.map((category) => (
            <tr
              key={category.id}
              className={INVENTORY_TABLE_ROW_CLASS}
            >
              <th
                scope="row"
                className={INVENTORY_TABLE_CELL_CLASS}
              >
                <Link
                  href={PATHS.OPERATIONS.INVENTORY_CATEGORY(
                    category.id
                  )}
                  className={
                    INVENTORY_TABLE_NAME_LINK_CLASS
                  }
                >
                  {category.name}
                </Link>
              </th>
              <td className={INVENTORY_TABLE_CELL_CLASS}>
                {category.trackingMode ===
                INVENTORY_TRACKING_MODE.BY_UNIT
                  ? INVENTORY_COPY.UNIT_TRACKING
                  : INVENTORY_COPY.QUANTITY_TRACKING}
              </td>
              <td
                className={
                  INVENTORY_TABLE_NUMBER_CELL_CLASS
                }
              >
                {category.total}
              </td>
              <td
                className={
                  INVENTORY_TABLE_NUMBER_CELL_CLASS
                }
              >
                <Chip
                  tone={
                    category.available > 0
                      ? "available"
                      : "neutral"
                  }
                  value={category.available}
                />
              </td>
              <td
                className={
                  INVENTORY_TABLE_NUMBER_CELL_CLASS
                }
              >
                <Chip
                  tone={
                    category.damaged > 0
                      ? "damaged"
                      : "neutral"
                  }
                  value={category.damaged}
                />
              </td>
              <td
                className={
                  INVENTORY_TABLE_NUMBER_CELL_CLASS
                }
              >
                <Chip
                  tone="neutral"
                  value={category.inRepair}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryCategoryTable;
