import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import {
  STOCK_COUNT_STATE_BODY_CLASS,
  STOCK_COUNT_STATE_TITLE_CLASS,
  STOCK_COUNT_STATE_WRAPPER_CLASS,
} from "../styles/StockCountStates.styles";

const StockHistoryEmpty = (): React.JSX.Element => (
  <div className={STOCK_COUNT_STATE_WRAPPER_CLASS}>
    <Title
      variant={TitleVariant.AUXILIAR}
      text={STOCK_COUNT_COPY.HISTORY_EMPTY_TITLE}
      className={STOCK_COUNT_STATE_TITLE_CLASS}
    />
    <Text className={STOCK_COUNT_STATE_BODY_CLASS}>
      {STOCK_COUNT_COPY.HISTORY_EMPTY_BODY}
    </Text>
  </div>
);

export default StockHistoryEmpty;
