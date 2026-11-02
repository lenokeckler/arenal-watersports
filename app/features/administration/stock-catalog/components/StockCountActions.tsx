import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import type { StockCountActionsProps } from "../models/StockCountActionsProps.interface";
import {
  STOCK_COUNT_ACTION_BUTTON_CLASS,
  STOCK_COUNT_ACTIONS_CLASS,
} from "../styles/StockCount.styles";

const StockCountActions = ({
  isSubmitting,
}: StockCountActionsProps): React.JSX.Element => (
  <div className={STOCK_COUNT_ACTIONS_CLASS}>
    <Button
      variant={BUTTON.PRIMARY}
      type="submit"
      isLoading={isSubmitting}
      loadingText={STOCK_COUNT_COPY.LOADING_TEXT}
      className={STOCK_COUNT_ACTION_BUTTON_CLASS}
    >
      {STOCK_COUNT_COPY.SAVE_BUTTON}
    </Button>
  </div>
);

export default StockCountActions;
