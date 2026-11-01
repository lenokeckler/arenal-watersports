import Link from "@/app/components/link/Link";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardBehaviorLinkProps } from "../models/CategoryCardBehaviorLinkProps.interface";
import { CATEGORY_CARD_BEHAVIOR_LINK_CLASS } from "../styles/CategoryCardBehaviorLink.styles";
import { resolveCategoryBehaviorPath } from "../utils/resolveCategoryBehaviorPath";

const CategoryCardBehaviorLink = ({
  categoryId,
}: CategoryCardBehaviorLinkProps): React.JSX.Element => (
  <Link
    href={resolveCategoryBehaviorPath(categoryId)}
    className={CATEGORY_CARD_BEHAVIOR_LINK_CLASS}
  >
    {CATEGORY_CATALOG_COPY.BEHAVIOR_LINK}
  </Link>
);

export default CategoryCardBehaviorLink;
