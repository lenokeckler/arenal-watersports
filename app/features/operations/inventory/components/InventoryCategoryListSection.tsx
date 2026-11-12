import { Section, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import InventoryPagination from "../InventoryPagination";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import type { InventoryFilters } from "../models/InventoryFilters.interface";
import type { InventoryOverviewViewProps } from "../models/InventoryOverviewViewProps.interface";
import {
  INVENTORY_OVERVIEW_SECTION_CLASS,
  INVENTORY_OVERVIEW_SECTION_TITLE_CLASS,
} from "../styles/InventoryOverview.styles";
import { buildInventoryPagePath } from "../utils/buildInventoryPagePath";
import InventoryCategoryTable from "./InventoryCategoryTable";
import InventoryFiltersForm from "./InventoryFiltersForm";

const NO_FILTERS: InventoryFilters = {
  mode: "",
  query: "",
};

const InventoryCategoryListSection = ({
  filters = NO_FILTERS,
  inventoryPage,
}: InventoryOverviewViewProps): React.JSX.Element => (
  <Section
    ariaLabel={INVENTORY_DOM_ID.CATEGORIES}
    className={INVENTORY_OVERVIEW_SECTION_CLASS}
  >
    <Title
      id={INVENTORY_DOM_ID.CATEGORIES}
      variant={TitleVariant.SECONDARY}
      className={INVENTORY_OVERVIEW_SECTION_TITLE_CLASS}
      text={INVENTORY_COPY.CATEGORIES}
    />
    <InventoryFiltersForm filters={filters} />
    <InventoryCategoryTable inventoryPage={inventoryPage} />
    <InventoryPagination
      pageIndex={inventoryPage.pageIndex}
      pageCount={inventoryPage.pageCount}
      pagePath={buildInventoryPagePath(filters)}
    />
  </Section>
);

export default InventoryCategoryListSection;
