import type { TariffCardViewModel } from "./TariffCardViewModel.interface";

export interface TariffListBodyProps {
  cards: TariffCardViewModel[];
  fetchFailed: boolean;
  onRetry: () => void;
}
