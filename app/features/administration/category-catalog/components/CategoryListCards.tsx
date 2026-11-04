import type { CategoryListCardsProps } from "../models/CategoryListCardsProps.interface";
import { CATEGORY_LIST_CARDS_CLASS } from "../styles/CategoryList.styles";
import CategoryCard from "./CategoryCard";

const CategoryListCards = ({
  cards,
}: CategoryListCardsProps): React.JSX.Element => (
  <div className={CATEGORY_LIST_CARDS_CLASS}>
    {cards.map((card) => (
      <CategoryCard
        key={card.category.id}
        {...card}
      />
    ))}
  </div>
);

export default CategoryListCards;
