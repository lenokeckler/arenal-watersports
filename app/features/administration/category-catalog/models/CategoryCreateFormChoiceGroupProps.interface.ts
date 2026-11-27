import type { CategoryCreateFormChoice } from "./CategoryCreateFormChoice.interface";

export interface CategoryCreateFormChoiceGroupProps {
  id: string;
  label: string;
  choices: CategoryCreateFormChoice[];
  selectedValue: string;
  isDisabled: boolean;
  onSelect: (value: string) => void;
  note?: string;
  error?: string;
}
