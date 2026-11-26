import type { ComboCardViewModel } from "./ComboCardViewModel.interface";

export interface ComboAudienceSectionProps {
  cards: ComboCardViewModel[];
  emptyMessage: string;
  priceNote: string;
  title: string;
}
