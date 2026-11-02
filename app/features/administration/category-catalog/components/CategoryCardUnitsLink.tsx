import Link from "@/app/components/link/Link";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardUnitsLinkProps } from "../models/CategoryCardUnitsLinkProps.interface";
import { CATEGORY_CARD_LINK_CLASS } from "../styles/CategoryCardLink.styles";
import { resolveCategoryUnitsPath } from "../utils/resolveCategoryUnitsPath";

const CategoryCardUnitsLink = ({
  categoryId,
}: CategoryCardUnitsLinkProps): React.JSX.Element => (
  <Link
    href={resolveCategoryUnitsPath(categoryId)}
    className={CATEGORY_CARD_LINK_CLASS}
  >
    {CATEGORY_CATALOG_COPY.UNITS_LINK}
  </Link>
);

export default CategoryCardUnitsLink;
