import Button from "@/app/components/button/Button";
import { BUTTON, SIZE } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import type { StockCountActionsProps } from "../models/StockCountActionsProps.interface";
import {
  STOCK_COUNT_ACTION_BUTTON_CLASS,
  STOCK_COUNT_ACTIONS_CLASS,
} from "../styles/StockCount.styles";

const StockCountActions = ({
  isSubmitting,
  onBack,
}: StockCountActionsProps): React.JSX.Element => (
  <div className={STOCK_COUNT_ACTIONS_CLASS}>
    <Button
      variant={BUTTON.PRIMARY}
      size={SIZE.LG}
      type="submit"
      isLoading={isSubmitting}
      loadingText={STOCK_COUNT_COPY.LOADING_TEXT}
      className={STOCK_COUNT_ACTION_BUTTON_CLASS}
    >
      {STOCK_COUNT_COPY.SAVE_BUTTON}
    </Button>
    <Button
      variant={BUTTON.SECONDARY}
      size={SIZE.LG}
      type="button"
      disabled={isSubmitting}
      onClick={onBack}
      className={STOCK_COUNT_ACTION_BUTTON_CLASS}
    >
      {STOCK_COUNT_COPY.BACK_TO_CATEGORIES_BUTTON}
    </Button>
  </div>
);

export default StockCountActions;
