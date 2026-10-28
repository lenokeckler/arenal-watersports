import {
  InlineText,
  Link,
  Section,
  Text,
  Title,
  UnorderedList,
} from "@/app/components";
import {
  INVENTORY_TRACKING_MODE,
  PATHS,
  TitleVariant,
  UNORDERED_LIST,
} from "@/app/constants";
import InventoryCounts from "./InventoryCounts";
import InventoryPagination from "./InventoryPagination";
import { INVENTORY_COPY } from "./constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "./constants/InventoryDomId.constants";
import type { InventoryOverviewViewProps } from "./models/InventoryOverviewViewProps.interface";
import {
  INVENTORY_CATEGORY_CARD_CLASS,
  INVENTORY_CATEGORY_LINK_CLASS,
  INVENTORY_CATEGORY_LIST_CLASS,
  INVENTORY_CATEGORY_META_CLASS,
  INVENTORY_CATEGORY_NAME_CLASS,
  INVENTORY_CATEGORY_TRACKING_CLASS,
  INVENTORY_OVERVIEW_DESCRIPTION_CLASS,
  INVENTORY_OVERVIEW_HEADER_CLASS,
  INVENTORY_OVERVIEW_SECTION_CLASS,
  INVENTORY_OVERVIEW_SECTION_TITLE_CLASS,
  INVENTORY_OVERVIEW_TITLE_CLASS,
  INVENTORY_OVERVIEW_WRAPPER_CLASS,
} from "./styles/InventoryOverview.styles";
import InventoryRealtimeRefresh from "./InventoryRealtimeRefresh";

const InventoryOverviewView = ({
  inventoryPage,
}: InventoryOverviewViewProps): React.JSX.Element => {
  const categoryItems = inventoryPage.items.map(
    (category) => ({
      id: category.id,
      text: (
        <Link
          href={PATHS.OPERATIONS.INVENTORY_CATEGORY(
            category.id
          )}
          className={INVENTORY_CATEGORY_LINK_CLASS}
        >
          <Section
            ariaLabel={category.id}
            className={INVENTORY_CATEGORY_CARD_CLASS}
          >
            <div className={INVENTORY_CATEGORY_META_CLASS}>
              <InlineText
                className={
                  INVENTORY_CATEGORY_TRACKING_CLASS
                }
              >
                {category.trackingMode ===
                INVENTORY_TRACKING_MODE.BY_UNIT
                  ? INVENTORY_COPY.UNIT_TRACKING
                  : INVENTORY_COPY.QUANTITY_TRACKING}
              </InlineText>
            </div>
            <Title
              id={category.id}
              variant={TitleVariant.SECONDARY}
              className={INVENTORY_CATEGORY_NAME_CLASS}
              text={category.name}
            />
            <InventoryCounts category={category} />
          </Section>
        </Link>
      ),
    })
  );

  return (
    <main className={INVENTORY_OVERVIEW_WRAPPER_CLASS}>
      <InventoryRealtimeRefresh />
      <header className={INVENTORY_OVERVIEW_HEADER_CLASS}>
        <Title
          variant={TitleVariant.PRIMARY}
          className={INVENTORY_OVERVIEW_TITLE_CLASS}
          text={INVENTORY_COPY.TITLE}
        />
        <Text
          className={INVENTORY_OVERVIEW_DESCRIPTION_CLASS}
        >
          {INVENTORY_COPY.DESCRIPTION}
        </Text>
      </header>
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
        {inventoryPage.items.length > 0 ? (
          <UnorderedList
            variant={UNORDERED_LIST.VARIANTS.DEFAULT}
            className={INVENTORY_CATEGORY_LIST_CLASS}
            items={categoryItems}
          />
        ) : (
          <Text>{INVENTORY_COPY.INVENTORY_EMPTY}</Text>
        )}
        <InventoryPagination
          pageIndex={inventoryPage.pageIndex}
          pageCount={inventoryPage.pageCount}
          pagePath={PATHS.OPERATIONS.INVENTORY_PAGE}
        />
      </Section>
    </main>
  );
};

export default InventoryOverviewView;
