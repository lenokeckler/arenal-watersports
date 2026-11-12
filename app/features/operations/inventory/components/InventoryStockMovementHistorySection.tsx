import { Section, Text, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import InventoryPagination from "../InventoryPagination";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import type { InventoryStockMovementHistorySectionProps } from "../models/InventoryStockMovementHistorySectionProps.interface";
import type { InventoryPaginationProps } from "../models/InventoryPaginationProps.interface";
import {
  INVENTORY_CATEGORY_SECTION_CLASS,
  INVENTORY_CATEGORY_SECTION_TITLE_CLASS,
} from "../styles/InventoryCategory.styles";
import InventoryStockMovementList from "./InventoryStockMovementList";

const createMovementPagePath =
  (
    categoryId: string
  ): InventoryPaginationProps["pagePath"] =>
  (pageIndex) =>
    PATHS.OPERATIONS.INVENTORY_CATEGORY_PAGE(
      categoryId,
      pageIndex
    );

const InventoryStockMovementHistorySection = ({
  categoryId,
  movementPage,
}: InventoryStockMovementHistorySectionProps): React.JSX.Element => (
  <Section
    ariaLabel={INVENTORY_DOM_ID.STOCK_MOVEMENTS}
    className={INVENTORY_CATEGORY_SECTION_CLASS}
  >
    <Title
      id={INVENTORY_DOM_ID.STOCK_MOVEMENTS}
      variant={TitleVariant.SECONDARY}
      className={INVENTORY_CATEGORY_SECTION_TITLE_CLASS}
      text={INVENTORY_COPY.MOVEMENT_HISTORY_TITLE}
    />
    {movementPage.items.length ? (
      <InventoryStockMovementList
        movements={movementPage.items}
      />
    ) : (
      <Text>{INVENTORY_COPY.MOVEMENT_HISTORY_EMPTY}</Text>
    )}
    <InventoryPagination
      pageIndex={movementPage.pageIndex}
      pageCount={movementPage.pageCount}
      pagePath={createMovementPagePath(categoryId)}
    />
  </Section>
);

export default InventoryStockMovementHistorySection;
