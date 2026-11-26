import type { TariffCardViewModel } from "./TariffCardViewModel.interface";

export interface TariffListViewModel {
  cards: TariffCardViewModel[];
  onRetry: () => void;
}
