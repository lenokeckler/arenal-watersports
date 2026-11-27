import Link from "@/app/components/link/Link";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import {
  CATEGORY_CARD_ACTIONS_ROW_CLASS,
  CATEGORY_CARD_LINK_CLASS,
  CATEGORY_CARD_ROW_CLASS,
} from "../styles/CategoryCard.styles";
import { resolveCategoryConfigurePath } from "../utils/resolveCategoryConfigurePath";
import CategoryCardEditLabel from "./CategoryCardEditLabel";
import CategoryCardStatusChip from "./CategoryCardStatusChip";
import CategoryCardSummary from "./CategoryCardSummary";

const CategoryCard = ({
  category,
  isInactive,
  subtitle,
}: CategoryCardViewModel): React.JSX.Element => (
  <Link
    href={resolveCategoryConfigurePath(category.id)}
    className={CATEGORY_CARD_LINK_CLASS}
  >
    <div className={CATEGORY_CARD_ROW_CLASS}>
      <CategoryCardSummary
        name={category.name}
        subtitle={subtitle}
        groupName={category.groupName}
        isInactive={isInactive}
      />
      <div className={CATEGORY_CARD_ACTIONS_ROW_CLASS}>
        <CategoryCardStatusChip status={category.status} />
        <CategoryCardEditLabel />
      </div>
    </div>
  </Link>
);

export default CategoryCard;
