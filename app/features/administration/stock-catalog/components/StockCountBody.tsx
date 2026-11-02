import { STOCK_COUNT_VIEW_STATE } from "../constants/StockCountViewState.constants";
import type { StockCountSectionProps } from "../models/StockCountSectionProps.interface";
import StockCountErrorState from "./StockCountErrorState";
import StockCountForm from "./StockCountForm";
import StockHistory from "./StockHistory";

const StockCountBody = ({
  hasExpiryAlert,
  viewModel,
}: StockCountSectionProps): React.JSX.Element => {
  if (
    viewModel.viewState === STOCK_COUNT_VIEW_STATE.ERROR
  ) {
    return (
      <StockCountErrorState onRetry={viewModel.onRetry} />
    );
  }

  return (
    <>
      <StockCountForm
        hasExpiryAlert={hasExpiryAlert}
        viewModel={viewModel}
      />
      <StockHistory cards={viewModel.cards} />
    </>
  );
};

export default StockCountBody;
