import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { CategoryCardSummaryProps } from "../models/CategoryCardSummaryProps.interface";
import {
  CATEGORY_CARD_SUMMARY_CLASS,
  resolveCategoryCardNameClassName,
} from "../styles/CategoryCard.styles";
import CategoryCardGroupRow from "./CategoryCardGroupRow";
import CategoryCardSubtitle from "./CategoryCardSubtitle";

const CategoryCardSummary = ({
  groupName,
  isInactive,
  name,
  subtitle,
}: CategoryCardSummaryProps): React.JSX.Element => (
  <div className={CATEGORY_CARD_SUMMARY_CLASS}>
    <Title
      variant={TitleVariant.AUXILIAR}
      text={name}
      className={resolveCategoryCardNameClassName(
        isInactive
      )}
    />
    <CategoryCardSubtitle
      subtitle={subtitle}
      isInactive={isInactive}
    />
    {groupName && (
      <CategoryCardGroupRow groupName={groupName} />
    )}
  </div>
);

export default CategoryCardSummary;
