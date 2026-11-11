import Link from "@/app/components/link/Link";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardAlertsLinkProps } from "../models/CategoryCardAlertsLinkProps.interface";
import { CATEGORY_CARD_LINK_CLASS } from "../styles/CategoryCardLink.styles";
import { resolveCategoryAlertsPath } from "../utils/resolveCategoryAlertsPath";

const CategoryCardAlertsLink = ({
  categoryId,
}: CategoryCardAlertsLinkProps): React.JSX.Element => (
  <Link
    href={resolveCategoryAlertsPath(categoryId)}
    className={CATEGORY_CARD_LINK_CLASS}
  >
    {CATEGORY_CATALOG_COPY.ALERT_LINK}
  </Link>
);

export default CategoryCardAlertsLink;
