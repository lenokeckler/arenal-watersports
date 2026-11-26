import type { TariffCardViewModel } from "./TariffCardViewModel.interface";

export interface TariffListBodyProps {
  cards: TariffCardViewModel[];
  emptyMessage: string;
  fetchFailed: boolean;
  onRetry: () => void;
}
