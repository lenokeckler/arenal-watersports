import { Link, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import InventoryCounts from "../InventoryCounts";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryCategoryHeaderProps } from "../models/InventoryCategoryHeaderProps.interface";
import {
  INVENTORY_CATEGORY_BACK_LINK_CLASS,
  INVENTORY_CATEGORY_HEADER_CLASS,
  INVENTORY_CATEGORY_HEADER_ROW_CLASS,
  INVENTORY_CATEGORY_TITLE_CLASS,
} from "../styles/InventoryCategory.styles";

const InventoryCategoryHeader = ({
  category,
}: InventoryCategoryHeaderProps): React.JSX.Element => (
  <header className={INVENTORY_CATEGORY_HEADER_CLASS}>
    <div className={INVENTORY_CATEGORY_HEADER_ROW_CLASS}>
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
);

export default InventoryCategoryHeader;
