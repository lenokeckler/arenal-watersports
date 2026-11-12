import type { ExtraListCardsProps } from "../models/ExtraListCardsProps.interface";
import { EXTRA_LIST_CARDS_CLASS } from "../styles/ExtraList.styles";
import ExtraCard from "./ExtraCard";

const ExtraListCards = ({
  cards,
}: ExtraListCardsProps): React.JSX.Element => (
  <div className={EXTRA_LIST_CARDS_CLASS}>
    {cards.map((card) => (
      <ExtraCard
        key={card.id}
        {...card}
      />
    ))}
  </div>
);

export default ExtraListCards;
