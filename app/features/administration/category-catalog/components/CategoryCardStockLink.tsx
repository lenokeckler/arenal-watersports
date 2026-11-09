import Link from "@/app/components/link/Link";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardStockLinkProps } from "../models/CategoryCardStockLinkProps.interface";
import { CATEGORY_CARD_LINK_CLASS } from "../styles/CategoryCardLink.styles";
import { resolveCategoryStockPath } from "../utils/resolveCategoryStockPath";

const CategoryCardStockLink = ({
  categoryId,
}: CategoryCardStockLinkProps): React.JSX.Element => (
  <Link
    href={resolveCategoryStockPath(categoryId)}
    className={CATEGORY_CARD_LINK_CLASS}
  >
    {CATEGORY_CATALOG_COPY.STOCK_LINK}
  </Link>
);

export default CategoryCardStockLink;
