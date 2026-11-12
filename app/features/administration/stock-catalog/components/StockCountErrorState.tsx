import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import type { StockCountErrorStateProps } from "../models/StockCountErrorStateProps.interface";
import {
  STOCK_COUNT_STATE_BUTTON_CLASS,
  STOCK_COUNT_STATE_ERROR_BODY_CLASS,
  STOCK_COUNT_STATE_WRAPPER_CLASS,
} from "../styles/StockCountStates.styles";

const StockCountErrorState = ({
  onRetry,
}: StockCountErrorStateProps): React.JSX.Element => (
  <div className={STOCK_COUNT_STATE_WRAPPER_CLASS}>
    <Text className={STOCK_COUNT_STATE_ERROR_BODY_CLASS}>
      {STOCK_COUNT_COPY.FETCH_ERROR_MESSAGE}
    </Text>
    <Button
      variant={BUTTON.SECONDARY}
      onClick={onRetry}
      className={STOCK_COUNT_STATE_BUTTON_CLASS}
    >
      {STOCK_COUNT_COPY.RETRY_BUTTON}
    </Button>
  </div>
);

export default StockCountErrorState;
