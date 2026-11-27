import type { ChoicePill } from "./ChoicePill.interface";

export interface ChoicePillOptionProps {
  isChecked: boolean;
  name: string;
  onChange: (value: string) => void;
  option: ChoicePill;
}
