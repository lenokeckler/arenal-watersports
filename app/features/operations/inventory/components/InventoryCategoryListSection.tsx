import { Section, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import InventoryCategoryList from "./InventoryCategoryList";
import InventoryPagination from "../InventoryPagination";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import type { InventoryOverviewViewProps } from "../models/InventoryOverviewViewProps.interface";
import {
  INVENTORY_OVERVIEW_SECTION_CLASS,
  INVENTORY_OVERVIEW_SECTION_TITLE_CLASS,
} from "../styles/InventoryOverview.styles";

const InventoryCategoryListSection = ({
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
    <InventoryCategoryList inventoryPage={inventoryPage} />
    <InventoryPagination
      pageIndex={inventoryPage.pageIndex}
      pageCount={inventoryPage.pageCount}
      pagePath={PATHS.OPERATIONS.INVENTORY_PAGE}
    />
  </Section>
);

export default InventoryCategoryListSection;
