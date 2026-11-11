import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import type { StockHistoryProps } from "../models/StockHistoryProps.interface";
import {
  STOCK_HISTORY_CARDS_CLASS,
  STOCK_HISTORY_CLASS,
  STOCK_HISTORY_TITLE_CLASS,
} from "../styles/StockHistory.styles";
import StockHistoryCard from "./StockHistoryCard";
import StockHistoryEmpty from "./StockHistoryEmpty";

const StockHistory = ({
  cards,
}: StockHistoryProps): React.JSX.Element => (
  <div className={STOCK_HISTORY_CLASS}>
    <Title
      variant={TitleVariant.AUXILIAR}
      text={STOCK_COUNT_COPY.HISTORY_TITLE}
      className={STOCK_HISTORY_TITLE_CLASS}
    />
    {cards.length === 0 ? (
      <StockHistoryEmpty />
    ) : (
      <div className={STOCK_HISTORY_CARDS_CLASS}>
        {cards.map((card) => (
          <StockHistoryCard
            key={card.id}
            {...card}
          />
        ))}
      </div>
    )}
  </div>
);

export default StockHistory;
