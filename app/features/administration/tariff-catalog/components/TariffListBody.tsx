import Text from "@/app/components/text/Text";
import type { TariffListBodyProps } from "../models/TariffListBodyProps.interface";
import {
  TARIFF_LIST_CARDS_CLASS,
  TARIFF_LIST_EMPTY_CLASS,
} from "../styles/TariffList.styles";
import TariffCard from "./TariffCard";
import TariffListErrorState from "./TariffListErrorState";

const TariffListBody = ({
  cards,
  emptyMessage,
  fetchFailed,
  onRetry,
}: TariffListBodyProps): React.JSX.Element => {
  if (fetchFailed) {
    return <TariffListErrorState onRetry={onRetry} />;
  }

  if (cards.length === 0) {
    return (
      <Text className={TARIFF_LIST_EMPTY_CLASS}>
        {emptyMessage}
      </Text>
    );
  }

  return (
    <div className={TARIFF_LIST_CARDS_CLASS}>
      {cards.map((card) => (
        <TariffCard
          key={card.id}
          {...card}
        />
      ))}
    </div>
  );
};

export default TariffListBody;
