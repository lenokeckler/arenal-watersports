import type { StockCountSummary } from "./StockCountSummary.interface";
import type { StockCountSubmitViewModel } from "./StockCountSubmitViewModel.interface";
import type { StockCountViewState } from "./StockCountViewState.type";
import type { StockFieldHandlers } from "./StockFieldHandlers.interface";
import type { StockFormErrors } from "./StockFormErrors.interface";
import type { StockFormValues } from "./StockFormValues.interface";
import type { StockMovementCard } from "./StockMovementCard.interface";
import type { StockQuantityChanges } from "./StockQuantityChanges.type";

export interface StockCountViewModel extends StockCountSubmitViewModel {
  cards: StockMovementCard[];
  changes: StockQuantityChanges;
  errors: StockFormErrors;
  handlers: StockFieldHandlers;
  onBack: () => void;
  onRetry: () => void;
  summary: StockCountSummary;
  values: StockFormValues;
  viewState: StockCountViewState;
}
