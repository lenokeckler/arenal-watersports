import {
  InlineText,
  Link,
  Section,
  Title,
} from "@/app/components";
import {
  INVENTORY_TRACKING_MODE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import InventoryCounts from "../InventoryCounts";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryCategoryCardProps } from "../models/InventoryCategoryCardProps.interface";
import {
  INVENTORY_CATEGORY_CARD_CLASS,
  INVENTORY_CATEGORY_LINK_CLASS,
  INVENTORY_CATEGORY_META_CLASS,
  INVENTORY_CATEGORY_NAME_CLASS,
  INVENTORY_CATEGORY_TRACKING_CLASS,
} from "../styles/InventoryOverview.styles";

const InventoryCategoryCard = ({
  category,
}: InventoryCategoryCardProps): React.JSX.Element => (
  <Link
    href={PATHS.OPERATIONS.INVENTORY_CATEGORY(category.id)}
    className={INVENTORY_CATEGORY_LINK_CLASS}
  >
    <Section
      ariaLabel={category.id}
      className={INVENTORY_CATEGORY_CARD_CLASS}
    >
      <div className={INVENTORY_CATEGORY_META_CLASS}>
        <InlineText
          className={INVENTORY_CATEGORY_TRACKING_CLASS}
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
);

export default InventoryCategoryCard;
