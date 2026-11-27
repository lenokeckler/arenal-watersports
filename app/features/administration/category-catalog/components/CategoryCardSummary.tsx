import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { CategoryCardSummaryProps } from "../models/CategoryCardSummaryProps.interface";
import {
  CATEGORY_CARD_SUMMARY_CLASS,
  resolveCategoryCardNameClassName,
} from "../styles/CategoryCard.styles";
import CategoryCardGroupRow from "./CategoryCardGroupRow";
import CategoryCardStatusNotes from "./CategoryCardStatusNotes";
import CategoryCardSubtitle from "./CategoryCardSubtitle";

const CategoryCardSummary = ({
  groupName,
  isInactive,
  name,
  statusNotes,
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
    <CategoryCardStatusNotes statusNotes={statusNotes} />
  </div>
);

export default CategoryCardSummary;
