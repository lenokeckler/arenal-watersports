import type { StockCountSubmitViewModel } from "./StockCountSubmitViewModel.interface";
import type { StockCountViewState } from "./StockCountViewState.type";
import type { StockFieldHandlers } from "./StockFieldHandlers.interface";
import type { StockFormErrors } from "./StockFormErrors.interface";
import type { StockFormValues } from "./StockFormValues.interface";
import type { StockMovementCard } from "./StockMovementCard.interface";

export interface StockCountViewModel extends StockCountSubmitViewModel {
  cards: StockMovementCard[];
  errors: StockFormErrors;
  handlers: StockFieldHandlers;
  onRetry: () => void;
  total: number;
  values: StockFormValues;
  viewState: StockCountViewState;
}
