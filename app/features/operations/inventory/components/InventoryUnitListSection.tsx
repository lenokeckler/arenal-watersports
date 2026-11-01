import {
  Section,
  Text,
  Title,
  UnorderedList,
} from "@/app/components";
import {
  PATHS,
  TitleVariant,
  UNORDERED_LIST,
} from "@/app/constants";
import InventoryPagination from "../InventoryPagination";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import type { InventoryUnit } from "../models/InventoryUnit.interface";
import type { InventoryPaginationProps } from "../models/InventoryPaginationProps.interface";
import type { InventoryUnitListSectionProps } from "../models/InventoryUnitListSectionProps.interface";
import {
  INVENTORY_CATEGORY_SECTION_CLASS,
  INVENTORY_CATEGORY_SECTION_TITLE_CLASS,
  INVENTORY_UNIT_LIST_CLASS,
} from "../styles/InventoryCategory.styles";
import InventoryUnitRow from "./InventoryUnitRow";

const createInventoryUnitPagePath =
  (
    categoryId: string
  ): InventoryPaginationProps["pagePath"] =>
  (pageIndex) =>
    PATHS.OPERATIONS.INVENTORY_CATEGORY_PAGE(
      categoryId,
      pageIndex
    );

const createInventoryUnitItems = (units: InventoryUnit[]) =>
  units.map((unit) => ({
    id: unit.id,
    text: <InventoryUnitRow unit={unit} />,
  }));

const InventoryUnitListSection = ({
  category,
  inventoryPage,
}: InventoryUnitListSectionProps): React.JSX.Element => {
  const unitItems = createInventoryUnitItems(
    inventoryPage.items
  );

  return (
    <Section
      ariaLabel={INVENTORY_DOM_ID.CATEGORY_UNITS(
        category.id
      )}
      className={INVENTORY_CATEGORY_SECTION_CLASS}
    >
      <Title
        id={INVENTORY_DOM_ID.CATEGORY_UNITS(category.id)}
        variant={TitleVariant.SECONDARY}
        className={INVENTORY_CATEGORY_SECTION_TITLE_CLASS}
        text={INVENTORY_COPY.UNITS}
      />
      {unitItems.length > 0 ? (
        <UnorderedList
          variant={UNORDERED_LIST.VARIANTS.DEFAULT}
          className={INVENTORY_UNIT_LIST_CLASS}
          items={unitItems}
        />
      ) : (
        <Text>{INVENTORY_COPY.CATEGORY_EMPTY}</Text>
      )}
      <InventoryPagination
        pageIndex={inventoryPage.pageIndex}
        pageCount={inventoryPage.pageCount}
        pagePath={createInventoryUnitPagePath(category.id)}
      />
    </Section>
  );
};

export default InventoryUnitListSection;
