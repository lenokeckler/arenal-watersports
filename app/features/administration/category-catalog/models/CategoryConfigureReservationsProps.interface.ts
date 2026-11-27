import type { CategoryDurationChipsProps } from "./CategoryDurationChipsProps.interface";
import type { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryConfigureReservationsProps {
  isReservable: boolean;
  isGuideOnly: boolean;
  durationText: string;
  durationError?: string;
  durationChips: CategoryDurationChipsProps;
  onToggleReservable: () => void;
  onToggleGuideOnly: () => void;
  onDurationChange: CategoryFormFieldChangeHandler;
}
