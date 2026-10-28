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
import {
  INVENTORY_COPY,
  INVENTORY_UNIT_STATUS_COPY,
} from "./constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "./constants/InventoryDomId.constants";
import type { InventoryCategoryViewProps } from "./models/InventoryCategoryViewProps.interface";
import {
  INVENTORY_CATEGORY_BACK_LINK_CLASS,
  INVENTORY_CATEGORY_HEADER_CLASS,
  INVENTORY_CATEGORY_HEADER_ROW_CLASS,
  INVENTORY_CATEGORY_SECTION_CLASS,
  INVENTORY_CATEGORY_SECTION_TITLE_CLASS,
  INVENTORY_CATEGORY_TITLE_CLASS,
  INVENTORY_UNIT_CODE_CLASS,
  INVENTORY_UNIT_LIST_CLASS,
  INVENTORY_UNIT_ROW_CLASS,
  INVENTORY_UNIT_STATUS_CLASS,
  INVENTORY_CATEGORY_WRAPPER_CLASS,
} from "./styles/InventoryCategory.styles";
import InventoryRealtimeRefresh from "./InventoryRealtimeRefresh";

const InventoryCategoryView = ({
  categoryDetails,
}: InventoryCategoryViewProps): React.JSX.Element => {
  const { category } = categoryDetails;
  const unitItems =
    "units" in categoryDetails
      ? categoryDetails.units.items.map((unit) => ({
          id: unit.id,
          text: (
            <div className={INVENTORY_UNIT_ROW_CLASS}>
              <InlineText
                className={INVENTORY_UNIT_CODE_CLASS}
              >
                {unit.code}
              </InlineText>
              <InlineText
                className={
                  INVENTORY_UNIT_STATUS_CLASS[unit.status]
                }
              >
                {INVENTORY_UNIT_STATUS_COPY[unit.status]}
              </InlineText>
            </div>
          ),
        }))
      : [];

  return (
    <main className={INVENTORY_CATEGORY_WRAPPER_CLASS}>
      <InventoryRealtimeRefresh />
      <header className={INVENTORY_CATEGORY_HEADER_CLASS}>
        <div
          className={INVENTORY_CATEGORY_HEADER_ROW_CLASS}
        >
          <Title
            variant={TitleVariant.PRIMARY}
            className={INVENTORY_CATEGORY_TITLE_CLASS}
            text={category.name}
          />
          <Link
            href={PATHS.OPERATIONS.INVENTORY}
            className={INVENTORY_CATEGORY_BACK_LINK_CLASS}
          >
            {INVENTORY_COPY.BACK_TO_INVENTORY}
          </Link>
        </div>
        <InventoryCounts category={category} />
      </header>
      {category.trackingMode ===
      INVENTORY_TRACKING_MODE.BY_UNIT ? (
        <Section
          ariaLabel={INVENTORY_DOM_ID.CATEGORY_UNITS(
            category.id
          )}
          className={INVENTORY_CATEGORY_SECTION_CLASS}
        >
          <Title
            id={INVENTORY_DOM_ID.CATEGORY_UNITS(
              category.id
            )}
            variant={TitleVariant.SECONDARY}
            className={
              INVENTORY_CATEGORY_SECTION_TITLE_CLASS
            }
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
          {"units" in categoryDetails ? (
            <InventoryPagination
              pageIndex={categoryDetails.units.pageIndex}
              pageCount={categoryDetails.units.pageCount}
              pagePath={(pageIndex) =>
                PATHS.OPERATIONS.INVENTORY_CATEGORY_PAGE(
                  category.id,
                  pageIndex
                )
              }
            />
          ) : null}
        </Section>
      ) : null}
    </main>
  );
};

export default InventoryCategoryView;
