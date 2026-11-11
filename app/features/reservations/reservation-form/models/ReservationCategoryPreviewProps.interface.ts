import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";

export interface ReservationCategoryPreviewProps {
  category: ReservationCategoryOption;
  isSelected: boolean;
  onSelect: (categoryId: string) => void;
}
