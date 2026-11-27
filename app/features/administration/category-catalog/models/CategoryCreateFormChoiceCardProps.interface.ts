import type { CategoryCreateFormChoice } from "./CategoryCreateFormChoice.interface";

export interface CategoryCreateFormChoiceCardProps {
  choice: CategoryCreateFormChoice;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (value: string) => void;
}
