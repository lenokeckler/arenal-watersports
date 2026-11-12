import type { UnitListCardsProps } from "../models/UnitListCardsProps.interface";
import { UNIT_LIST_CARDS_CLASS } from "../styles/UnitList.styles";
import UnitCard from "./UnitCard";

const UnitListCards = ({
  cards,
}: UnitListCardsProps): React.JSX.Element => (
  <div className={UNIT_LIST_CARDS_CLASS}>
    {cards.map((card) => (
      <UnitCard
        key={card.id}
        {...card}
      />
    ))}
  </div>
);

export default UnitListCards;
