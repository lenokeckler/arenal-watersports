import Link from "@/app/components/link/Link";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_SECTION_ID } from "../constants/CategoryConfigureSectionId.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryConfigureSectionBodyProps } from "../models/CategoryConfigureSectionBodyProps.interface";
import { CATEGORY_CONFIGURE_SECTION_BODY_LINK_CLASS } from "../styles/CategoryConfigureSectionBody.styles";
import { resolveCategoryStockPath } from "../utils/resolveCategoryStockPath";
import { resolveCategoryUnitsPath } from "../utils/resolveCategoryUnitsPath";
import CategoryConfigureReservations from "./CategoryConfigureReservations";

const CategoryConfigureSectionBody = ({
  sectionId,
  categoryId,
  trackingMode,
  reservations,
}: CategoryConfigureSectionBodyProps): NullableRef<React.JSX.Element> => {
  if (
    sectionId === CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS
  ) {
    return (
      <CategoryConfigureReservations {...reservations} />
    );
  }
  if (
    sectionId !== CATEGORY_CONFIGURE_SECTION_ID.INVENTORY
  ) {
    return null;
  }

  return trackingMode === CATEGORY_TRACKING_MODE.BY_UNIT ? (
    <Link
      href={resolveCategoryUnitsPath(categoryId)}
      className={CATEGORY_CONFIGURE_SECTION_BODY_LINK_CLASS}
    >
      {CATEGORY_CONFIGURE_COPY.INVENTORY_VIEW_UNITS}
    </Link>
  ) : (
    <Link
      href={resolveCategoryStockPath(categoryId)}
      className={CATEGORY_CONFIGURE_SECTION_BODY_LINK_CLASS}
    >
      {CATEGORY_CONFIGURE_COPY.INVENTORY_REGISTER_STOCK}
    </Link>
  );
};

export default CategoryConfigureSectionBody;
