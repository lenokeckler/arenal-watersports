import type { StockCountViewModel } from "./StockCountViewModel.interface";

export interface StockCountSectionProps {
  hasExpiryAlert: boolean;
  viewModel: StockCountViewModel;
}
