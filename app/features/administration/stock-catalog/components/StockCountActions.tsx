import Button from "@/app/components/button/Button";
import Link from "@/app/components/link/Link";
import { BUTTON, PATHS, SIZE } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import type { StockCountActionsProps } from "../models/StockCountActionsProps.interface";
import {
  STOCK_COUNT_ACTION_BUTTON_CLASS,
  STOCK_COUNT_ACTIONS_CLASS,
} from "../styles/StockCount.styles";
import { STOCK_COUNT_LINK_CLASS } from "../styles/StockCountLink.styles";

const StockCountActions = ({
  isSubmitting,
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
    <Link
      href={PATHS.ADMINISTRATION.CATEGORIES}
      className={STOCK_COUNT_LINK_CLASS}
    >
      {STOCK_COUNT_COPY.BACK_TO_CATEGORIES_LINK}
    </Link>
  </div>
);

export default StockCountActions;
