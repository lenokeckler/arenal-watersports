import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";
import type { ExtraListCardsProps } from "../models/ExtraListCardsProps.interface";
import { EXTRA_LIST_CARDS_CLASS } from "../styles/ExtraList.styles";
import ExtraCard from "./ExtraCard";
import ExtraRemovalSheet from "./ExtraRemovalSheet";

const ExtraListCards = ({
  cards,
}: ExtraListCardsProps): React.JSX.Element => {
  const confirmingCard = cards.find(
    (card) =>
      card.actionState ===
      EXTRA_CARD_ACTION_STATE.CONFIRM_REMOVAL
  );

  return (
    <div className={EXTRA_LIST_CARDS_CLASS}>
      {cards.map((card) => (
        <ExtraCard
          key={card.id}
          {...card}
        />
      ))}
      {confirmingCard ? (
        <ExtraRemovalSheet {...confirmingCard} />
      ) : null}
    </div>
  );
};

export default ExtraListCards;
