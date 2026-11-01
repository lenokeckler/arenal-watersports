import Link from "@/app/components/link/Link";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardDepositLinkProps } from "../models/CategoryCardDepositLinkProps.interface";
import { CATEGORY_CARD_LINK_CLASS } from "../styles/CategoryCardLink.styles";
import { resolveCategoryDepositPath } from "../utils/resolveCategoryDepositPath";

const CategoryCardDepositLink = ({
  categoryId,
}: CategoryCardDepositLinkProps): React.JSX.Element => (
  <Link
    href={resolveCategoryDepositPath(categoryId)}
    className={CATEGORY_CARD_LINK_CLASS}
  >
    {CATEGORY_CATALOG_COPY.DEPOSIT_LINK}
  </Link>
);

export default CategoryCardDepositLink;
