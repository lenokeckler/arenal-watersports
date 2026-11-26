import Text from "@/app/components/text/Text";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import type { TariffListBodyProps } from "../models/TariffListBodyProps.interface";
import {
  TARIFF_LIST_CARDS_CLASS,
  TARIFF_LIST_EMPTY_CLASS,
} from "../styles/TariffList.styles";
import TariffCard from "./TariffCard";
import TariffListErrorState from "./TariffListErrorState";

const TariffListBody = ({
  cards,
  fetchFailed,
  onRetry,
}: TariffListBodyProps): React.JSX.Element => {
  if (fetchFailed) {
    return <TariffListErrorState onRetry={onRetry} />;
  }

  if (cards.length === 0) {
    return (
      <Text className={TARIFF_LIST_EMPTY_CLASS}>
        {TARIFF_CATALOG_COPY.EMPTY_MESSAGE}
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
