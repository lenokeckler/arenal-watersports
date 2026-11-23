import Link from "@/app/components/link/Link";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_SECTION_ID } from "../constants/CategoryConfigureSectionId.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryConfigureSectionBodyProps } from "../models/CategoryConfigureSectionBodyProps.interface";
import { CATEGORY_CONFIGURE_SECTION_BODY_LINK_CLASS } from "../styles/CategoryConfigureSectionBody.styles";
import { resolveCategoryStockPath } from "../utils/resolveCategoryStockPath";
import { resolveCategoryUnitsPath } from "../utils/resolveCategoryUnitsPath";
import CategoryConfigureAlerts from "./CategoryConfigureAlerts";
import CategoryConfigureDeposit from "./CategoryConfigureDeposit";
import CategoryConfigureReservations from "./CategoryConfigureReservations";
import CategoryConfigureTraits from "./CategoryConfigureTraits";

const CategoryConfigureSectionBody = ({
  sectionId,
  categoryId,
  trackingMode,
  bodies,
}: CategoryConfigureSectionBodyProps): NullableRef<React.JSX.Element> => {
  switch (sectionId) {
    case CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS:
      return (
        <CategoryConfigureReservations
          {...bodies.reservations}
        />
      );
    case CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT:
      return (
        <CategoryConfigureDeposit {...bodies.deposit} />
      );
    case CATEGORY_CONFIGURE_SECTION_ID.ALERTS:
      return <CategoryConfigureAlerts {...bodies.alerts} />;
    case CATEGORY_CONFIGURE_SECTION_ID.TRAITS:
      return <CategoryConfigureTraits {...bodies.traits} />;
    case CATEGORY_CONFIGURE_SECTION_ID.INVENTORY:
      return trackingMode ===
        CATEGORY_TRACKING_MODE.BY_UNIT ? (
        <Link
          href={resolveCategoryUnitsPath(categoryId)}
          className={
            CATEGORY_CONFIGURE_SECTION_BODY_LINK_CLASS
          }
        >
          {CATEGORY_CONFIGURE_COPY.INVENTORY_VIEW_UNITS}
        </Link>
      ) : (
        <Link
          href={resolveCategoryStockPath(categoryId)}
          className={
            CATEGORY_CONFIGURE_SECTION_BODY_LINK_CLASS
          }
        >
          {CATEGORY_CONFIGURE_COPY.INVENTORY_REGISTER_STOCK}
        </Link>
      );
    default:
      return null;
  }
};

export default CategoryConfigureSectionBody;
