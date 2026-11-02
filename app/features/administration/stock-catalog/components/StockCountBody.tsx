import { STOCK_COUNT_VIEW_STATE } from "../constants/StockCountViewState.constants";
import type { StockCountBodyProps } from "../models/StockCountBodyProps.interface";
import {
  STOCK_COUNT_COLUMNS_CLASS,
  STOCK_COUNT_HISTORY_COLUMN_CLASS,
} from "../styles/StockCount.styles";
import StockCountErrorState from "./StockCountErrorState";
import StockCountForm from "./StockCountForm";
import StockHistory from "./StockHistory";

const StockCountBody = ({
  children,
  hasExpiryAlert,
  viewModel,
}: StockCountBodyProps): React.JSX.Element => {
  if (
    viewModel.viewState === STOCK_COUNT_VIEW_STATE.ERROR
  ) {
    return (
      <StockCountErrorState onRetry={viewModel.onRetry} />
    );
  }

  return (
    <div className={STOCK_COUNT_COLUMNS_CLASS}>
      <StockCountForm
        hasExpiryAlert={hasExpiryAlert}
        viewModel={viewModel}
      />
      <div className={STOCK_COUNT_HISTORY_COLUMN_CLASS}>
        <StockHistory cards={viewModel.cards} />
        {children}
      </div>
    </div>
  );
};

export default StockCountBody;
