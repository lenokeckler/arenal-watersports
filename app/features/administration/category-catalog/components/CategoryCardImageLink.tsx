import Link from "@/app/components/link/Link";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import type { CategoryCardImageLinkProps } from "../models/CategoryCardImageLinkProps.interface";
import { CATEGORY_CARD_LINK_CLASS } from "../styles/CategoryCardLink.styles";
import { resolveCategoryImagePath } from "../utils/resolveCategoryImagePath";

const CategoryCardImageLink = ({
  categoryId,
}: CategoryCardImageLinkProps): React.JSX.Element => (
  <Link
    href={resolveCategoryImagePath(categoryId)}
    className={CATEGORY_CARD_LINK_CLASS}
  >
    {CATEGORY_IMAGE_COPY.IMAGE_LINK}
  </Link>
);

export default CategoryCardImageLink;
